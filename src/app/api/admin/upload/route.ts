import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('video') as File;
    if (!file) {
      return NextResponse.json({ success: false, error: 'Vui lòng chọn file video' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Làm sạch tên file tuyệt đối (chỉ giữ lại chữ, số và dấu _)
    const originalExt = path.extname(file.name);
    let nameWithoutExt = path.basename(file.name, originalExt);
    nameWithoutExt = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_'); // Xoá ký tự đặc biệt, gộp nhiều _ thành 1
    const filename = `${nameWithoutExt}${originalExt}`;
    
    // Lưu file vào public/videos
    const videoDir = path.join(process.cwd(), 'public', 'videos');
    if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });
    
    const filePath = path.join(videoDir, filename);
    fs.writeFileSync(filePath, buffer);

    const hlsUrl = `/videos/hls/${nameWithoutExt}/index.m3u8`;

    let videoRecordId = null;

    // Lưu vào Database
    const existing = await prisma.video.findFirst({ where: { videoUrl: hlsUrl } });
    if (!existing) {
      const newVideo = await prisma.video.create({
        data: {
          title: nameWithoutExt.replace(/_/g, ' '),
          videoUrl: hlsUrl,
          thumbnail: `https://picsum.photos/seed/${nameWithoutExt}/400/600`, // mockup
          views: `${Math.floor(Math.random() * 900) + 100}N`,
          authorName: 'Admin',
          authorAvatar: 'A',
        }
      });
      videoRecordId = newVideo.id;
    } else {
      videoRecordId = existing.id;
    }

    // Tạo thư mục HLS
    const hlsOutDir = path.join(videoDir, 'hls', nameWithoutExt);
    if (!fs.existsSync(hlsOutDir)) fs.mkdirSync(hlsOutDir, { recursive: true });

    // Lệnh convert HLS
    let cmd = '';
    // Nếu chạy trực tiếp trên VPS có ffmpeg
    if (process.env.NODE_ENV === 'production' || process.env.HAS_FFMPEG === 'true' || fs.existsSync('/usr/bin/ffmpeg')) {
      // Dùng -c:v libx264 để đảm bảo tương thích mọi định dạng, tránh lỗi đen màn hình do khác Codec (AV1, HEVC, v.v)
      // Dùng -sn để bỏ qua Subtitles, tránh lỗi convert
      cmd = `ffmpeg -y -i "${filePath}" -c:v libx264 -preset fast -crf 26 -c:a aac -sn -start_number 0 -hls_time 4 -hls_list_size 0 -f hls "${path.join(hlsOutDir, 'index.m3u8')}"`;
    } else {
      // Chạy qua Docker ở local
      cmd = `docker run --rm -v "${process.cwd()}/public/videos:/videos" linuxserver/ffmpeg -y -i "/videos/${filename}" -c:v libx264 -preset fast -crf 26 -c:a aac -sn -start_number 0 -hls_time 4 -hls_list_size 0 -f hls "/videos/hls/${nameWithoutExt}/index.m3u8"`;
    }

    try {
      await execPromise(cmd);
    } catch (ffmpegError) {
      // Rollback: xoá record trong DB nếu quá trình convert lỗi
      if (videoRecordId && !existing) {
        await prisma.video.delete({ where: { id: videoRecordId } });
      }
      throw new Error("Lỗi khi xử lý video (FFMPEG error): " + String(ffmpegError));
    }

    return NextResponse.json({ success: true, message: `Upload và chuyển đổi HLS thành công video: ${nameWithoutExt}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

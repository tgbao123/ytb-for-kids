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
    // Thay thế khoảng trắng bằng dấu gạch dưới để ffmpeg dễ xử lý
    const filename = file.name.replace(/\s+/g, '_');
    const nameWithoutExt = filename.replace(/\.mp4$/i, '');
    
    // Lưu file vào public/videos
    const videoDir = path.join(process.cwd(), 'public', 'videos');
    if (!fs.existsSync(videoDir)) fs.mkdirSync(videoDir, { recursive: true });
    
    const filePath = path.join(videoDir, filename);
    fs.writeFileSync(filePath, buffer);

    const hlsUrl = `/videos/hls/${nameWithoutExt}/index.m3u8`;

    // Lưu vào Database
    const existing = await prisma.video.findFirst({ where: { videoUrl: hlsUrl } });
    if (!existing) {
      await prisma.video.create({
        data: {
          title: nameWithoutExt.replace(/_/g, ' '),
          videoUrl: hlsUrl,
          thumbnail: `https://picsum.photos/seed/${nameWithoutExt}/400/600`, // mockup
          views: `${Math.floor(Math.random() * 900) + 100}N`,
          authorName: 'Admin',
          authorAvatar: 'A',
        }
      });
    }

    // Tạo thư mục HLS
    const hlsOutDir = path.join(videoDir, 'hls', nameWithoutExt);
    if (!fs.existsSync(hlsOutDir)) fs.mkdirSync(hlsOutDir, { recursive: true });

    // Lệnh convert HLS
    let cmd = '';
    // Nếu chạy trực tiếp trên VPS có ffmpeg
    if (process.env.NODE_ENV === 'production' || process.env.HAS_FFMPEG === 'true' || fs.existsSync('/usr/bin/ffmpeg')) {
      cmd = `ffmpeg -y -i "${filePath}" -c:v copy -c:a copy -start_number 0 -hls_time 4 -hls_list_size 0 -f hls "${path.join(hlsOutDir, 'index.m3u8')}"`;
    } else {
      // Chạy qua Docker ở local
      cmd = `docker run --rm -v "${process.cwd()}/public/videos:/videos" linuxserver/ffmpeg -y -i "/videos/${filename}" -c:v copy -c:a copy -start_number 0 -hls_time 4 -hls_list_size 0 -f hls "/videos/hls/${nameWithoutExt}/index.m3u8"`;
    }

    await execPromise(cmd);

    return NextResponse.json({ success: true, message: `Upload và chuyển đổi HLS thành công video: ${nameWithoutExt}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

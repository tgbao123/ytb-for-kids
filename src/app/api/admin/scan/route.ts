import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    const videoDir = path.join(process.cwd(), 'public', 'videos');
    if (!fs.existsSync(videoDir)) {
      fs.mkdirSync(videoDir, { recursive: true });
    }
    
    const files = fs.readdirSync(videoDir);
    const mp4Files = files.filter(f => f.toLowerCase().endsWith('.mp4'));

    const existingVideos = await prisma.video.findMany();
    const existingHlsUrls = existingVideos.map(v => v.videoUrl);
    // Also check raw mp4 urls just in case
    const existingRawUrls = existingVideos.map(v => v.videoUrl.replace('/hls/', '/').replace('/index.m3u8', '.mp4'));

    let addedCount = 0;

    for (const file of mp4Files) {
      const name = file.replace(/\.mp4$/i, '');
      const hlsUrl = `/videos/hls/${name}/index.m3u8`;
      const rawUrl = `/videos/${file}`;
      
      // Check if this video already exists in DB
      if (!existingHlsUrls.includes(hlsUrl) && !existingRawUrls.includes(rawUrl)) {
        // Add to DB with HLS url assuming it will be converted
        await prisma.video.create({
          data: {
            title: name.replace(/_/g, ' '),
            videoUrl: hlsUrl,
            thumbnail: `https://picsum.photos/seed/${name}/400/600`, // mock thumbnail
            views: `${Math.floor(Math.random() * 900) + 100}N`,
            authorName: 'Admin',
            authorAvatar: 'A',
          }
        });
        addedCount++;
      }
    }

    return NextResponse.json({ success: true, added: addedCount, message: `Đã phát hiện và import ${addedCount} video mới.` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

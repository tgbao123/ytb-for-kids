import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const videos = await prisma.video.findMany();
  let updated = 0;

  for (const video of videos) {
    if (video.videoUrl.endsWith('.mp4')) {
      // Ví dụ: /videos/something.mp4
      const filename = video.videoUrl.split('/').pop() || '';
      const name = filename.replace('.mp4', '');
      
      const newUrl = `/videos/hls/${name}/index.m3u8`;

      await prisma.video.update({
        where: { id: video.id },
        data: { videoUrl: newUrl }
      });
      updated++;
    }
  }

  console.log(`✅ Đã cập nhật url HLS cho ${updated} videos.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const videos = await prisma.video.findMany();
  for (const v of videos) {
    await prisma.video.update({
      where: { id: v.id },
      data: { videoUrl: `/videos/${v.id}.mp4` }
    });
  }
  console.log("Database updated to point to physical files!");
}
main().catch(console.error).finally(() => prisma.$disconnect());

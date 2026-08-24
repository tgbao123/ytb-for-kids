import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const mockShorts = [
  { id: 'lfhvt2d2Ekw', title: 'Máy xúc DOOSAN', views: '266', author: 'DOOSAN 140W', avatar: 'D', thumbnail: 'https://i.ytimg.com/vi/lfhvt2d2Ekw/hqdefault.jpg' },
  { id: 'xnihTQpdAM0', title: 'Máy múc làm việc', views: '1K', author: 'Kênh Máy múc', avatar: 'K', thumbnail: 'https://i.ytimg.com/vi/xnihTQpdAM0/hqdefault.jpg' },
  { id: 'RarBn46bSDg', title: 'Máy xúc mini', views: '500', author: 'Mini Excavator', avatar: 'M', thumbnail: 'https://i.ytimg.com/vi/RarBn46bSDg/hqdefault.jpg' }
];

async function main() {
  await prisma.video.deleteMany();
  for (const short of mockShorts) {
    await prisma.video.create({
      data: {
        id: short.id,
        title: short.title,
        videoUrl: '/videos/sample.mp4',
        thumbnail: short.thumbnail,
        views: short.views,
        authorName: short.author,
        authorAvatar: short.avatar,
        likes: Math.floor(Math.random() * 100)
      }
    });
  }
  console.log("Database seeded successfully!");
}
main().catch(console.error).finally(() => prisma.$disconnect());

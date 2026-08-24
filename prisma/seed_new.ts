import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const files = [
  '10877-226635355_medium.mp4',
  '149810-797189152_medium.mp4',
  '21233-316116300_medium.mp4',
  '213450_medium.mp4',
  '3741-174188012_medium.mp4',
  '41501-429661287_medium.mp4'
];

const titles = [
  'Máy múc khổng lồ làm việc tại công trường',
  'Siêu máy xúc đào đất đá siêu nhanh',
  'Cận cảnh máy múc phá dỡ công trình',
  'Máy xúc mini làm việc trong không gian hẹp',
  'Máy múc đổ đất lên xe tải',
  'Kỹ năng điều khiển máy xúc đỉnh cao'
];

const authors = ['Kênh Máy Múc', 'Excavator VN', 'Đồ Chơi Thi Công', 'Máy Xúc Channel', 'Bé Yêu Xe Cẩu', 'Thi Công Thực Tế'];
const avatars = ['K', 'E', 'Đ', 'M', 'B', 'T'];

async function main() {
  await prisma.video.deleteMany();
  
  for (let i = 0; i < files.length; i++) {
    await prisma.video.create({
      data: {
        title: titles[i],
        videoUrl: `/videos/${files[i]}`,
        thumbnail: `https://picsum.photos/seed/${files[i]}/480/360`,
        views: `${Math.floor(Math.random() * 900) + 100}K`,
        authorName: authors[i],
        authorAvatar: avatars[i],
        likes: Math.floor(Math.random() * 10000)
      }
    });
  }
  console.log("Database seeded with the newly downloaded videos!");
}
main().catch(console.error).finally(() => prisma.$disconnect());

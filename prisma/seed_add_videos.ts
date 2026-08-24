import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const sourceDir = '/Users/tgbao/Downloads/videos';
const destDir = path.join(process.cwd(), 'public', 'videos');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function main() {
  // KHÔNG xoá video cũ:
  // await prisma.video.deleteMany();

  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.mp4'));
  let addedCount = 0;
  
  for (const file of files) {
    const originalTitle = file.replace('.mp4', '');
    
    // Create safe filename
    const safeFilename = file
      .replace(/[^a-zA-Z0-9.\-_]/g, '_')
      .replace(/_+/g, '_')
      .toLowerCase();
      
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, safeFilename);
    
    // Copy file
    fs.copyFileSync(sourcePath, destPath);
    
    // Generate pseudo channel name
    const authorName = originalTitle.includes('#') 
      ? originalTitle.split('#')[1].split(' ')[0] 
      : 'Bé Yêu Xe Cẩu';
      
    // Kiểm tra xem video đã tồn tại chưa
    const existing = await prisma.video.findFirst({
      where: { videoUrl: `/videos/${safeFilename}` }
    });
    
    if (!existing) {
      await prisma.video.create({
        data: {
          title: originalTitle.replace(/#/g, '').trim(),
          videoUrl: `/videos/${safeFilename}`,
          thumbnail: `https://picsum.photos/seed/${safeFilename}/480/360`,
          views: `${Math.floor(Math.random() * 900) + 100}K`,
          authorName: authorName.substring(0, 15) || 'Kids Channel',
          authorAvatar: (authorName.charAt(0).toUpperCase()) || 'K',
          likes: Math.floor(Math.random() * 100000)
        }
      });
      addedCount++;
    }
  }
  
  console.log(`Đã thêm thành công ${addedCount} video mới (bỏ qua các video đã có).`);
}

main().catch(console.error).finally(() => prisma.$disconnect());

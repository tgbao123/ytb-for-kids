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
  await prisma.video.deleteMany();

  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.mp4'));
  
  for (const file of files) {
    const originalTitle = file.replace('.mp4', '');
    
    // Create safe filename (alphanumeric and dashes/underscores)
    const safeFilename = file
      .replace(/[^a-zA-Z0-9.\-_]/g, '_')
      .replace(/_+/g, '_')
      .toLowerCase();
      
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, safeFilename);
    
    // Copy file
    fs.copyFileSync(sourcePath, destPath);
    
    // Generate pseudo channel name from hashtags or first word
    const authorName = originalTitle.includes('#') 
      ? originalTitle.split('#')[1].split(' ')[0] 
      : 'Bé Yêu Xe Cẩu';
      
    await prisma.video.create({
      data: {
        title: originalTitle.replace(/#/g, '').trim(),
        videoUrl: `/videos/${safeFilename}`,
        thumbnail: `https://picsum.photos/seed/${safeFilename}/480/360`, // Or random placeholder
        views: `${Math.floor(Math.random() * 900) + 100}K`,
        authorName: authorName.substring(0, 15) || 'Kids Channel',
        authorAvatar: (authorName.charAt(0).toUpperCase()) || 'K',
        likes: Math.floor(Math.random() * 100000)
      }
    });
  }
  
  console.log(`Successfully moved and seeded ${files.length} videos!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());

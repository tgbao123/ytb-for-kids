export const dynamic = 'force-dynamic';

import { PrismaClient } from '@prisma/client';
import ShortsClient from './ShortsClient';

const prisma = new PrismaClient();

export default async function ShortsPage() {
  // Lấy video mới nhất lên đầu
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  const setting = await prisma.setting.findUnique({ where: { key: 'PRIORITIZE_NEWEST' } });
  const prioritizeNewest = setting ? setting.value === 'true' : false; // Mặc định là false (Tắt)
  
  return <ShortsClient initialShorts={videos} prioritizeNewest={prioritizeNewest} />;
}

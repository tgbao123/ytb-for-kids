export const dynamic = 'force-dynamic';

import { PrismaClient } from '@prisma/client';
import ShortsClient from './ShortsClient';

const prisma = new PrismaClient();

export default async function ShortsPage() {
  // Lấy video mới nhất lên đầu
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  return <ShortsClient initialShorts={videos} />;
}

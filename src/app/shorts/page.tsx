export const dynamic = 'force-dynamic';

import { PrismaClient } from '@prisma/client';
import ShortsClient from './ShortsClient';

const prisma = new PrismaClient();

export default async function ShortsPage() {
  const videos = await prisma.video.findMany();
  
  // Shuffle the videos randomly
  const shuffledVideos = [...videos].sort(() => Math.random() - 0.5);
  
  return <ShortsClient initialShorts={shuffledVideos} />;
}

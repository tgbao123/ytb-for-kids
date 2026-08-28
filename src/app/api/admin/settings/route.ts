import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const setting = await prisma.setting.findUnique({ where: { key: 'PRIORITIZE_NEWEST' } });
  return NextResponse.json({ success: true, value: setting ? setting.value === 'true' : false });
}

export async function POST(req: Request) {
  const { value } = await req.json();
  await prisma.setting.upsert({
    where: { key: 'PRIORITIZE_NEWEST' },
    update: { value: String(value) },
    create: { key: 'PRIORITIZE_NEWEST', value: String(value) }
  });
  return NextResponse.json({ success: true });
}

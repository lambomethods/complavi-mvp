import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const probationerId = "marcus-t-mock-id"; // MVP Target Subject
    
    // Check if there is a successful compliance log from today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const log = await prisma.complianceLog.findFirst({
      where: {
        probationerId,
        status: 'SUCCESS',
        timestamp: {
          gte: today,
        }
      }
    });

    return NextResponse.json({ isComplete: !!log });
  } catch (error) {
    return NextResponse.json({ isComplete: false }, { status: 500 });
  }
}

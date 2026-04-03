import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Wipe today's compliance logs for the demo target to allow repeat pitches
    const result = await prisma.complianceLog.deleteMany({
      where: {
        probationerId: "marcus-t-mock-id",
        timestamp: {
          gte: today,
        }
      }
    });

    return NextResponse.json({ success: true, count: result.count });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

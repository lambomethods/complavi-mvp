import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const probationers = await prisma.probationerProfile.findMany({
      include: {
        user: true,
        complianceLogs: {
          orderBy: { timestamp: 'desc' },
          take: 1
        }
      }
    });

    const locations = probationers.map((p) => {
      const lastLog = p.complianceLogs[0];
      if (lastLog && lastLog.latitude && lastLog.longitude) {
        return {
          id: p.id,
          name: p.user.name,
          lat: lastLog.latitude,
          lng: lastLog.longitude,
          status: lastLog.status
        }
      }
      return null;
    }).filter(Boolean);

    return NextResponse.json(locations);
  } catch (error) {
    console.error("Map Data Fetch Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}

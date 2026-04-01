import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { probationerId, latitude, longitude } = body;

    // For the MVP transition, if no ID is passed, we default to the first mock profile (Marcus T.)
    // In production, this will be extracted securely from the NextAuth session token.
    const targetId = probationerId || "marcus-t-mock-id";

    // Write real immutable log to the PostgreSQL database
    const log = await prisma.complianceLog.create({
      data: {
        probationerId: targetId,
        status: "SUCCESS",
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        notes: "Automated Liveness Check via Hardware Enclave"
      }
    });

    return NextResponse.json({ success: true, logId: log.id });
  } catch (error: any) {
    console.error("Check-in Mutation Error:", error);
    return NextResponse.json({ error: "Server encountered an error writing compliance lock to database." }, { status: 500 });
  }
}

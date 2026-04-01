import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Create Mock Officer
    const officer = await prisma.user.upsert({
      where: { email: 'officer@complavi.com' },
      update: {},
      create: {
        email: 'officer@complavi.com',
        name: 'Officer Davis',
        passwordHash: 'mock-hash',
        role: 'OFFICER',
      },
    });

    // Create Mock User for Marcus
    const marcusUser = await prisma.user.upsert({
      where: { email: 'marcus@mock.com' },
      update: {},
      create: {
        email: 'marcus@mock.com',
        name: 'Marcus T.',
        passwordHash: 'mock-hash',
        role: 'PROBATIONER',
      },
    });

    // Create ProbationerProfile for Marcus
    const marcusProfile = await prisma.probationerProfile.upsert({
      where: { userId: marcusUser.id },
      update: {},
      create: {
        id: 'marcus-t-mock-id',
        userId: marcusUser.id,
        officerId: officer.id,
        caseNumber: 'CR-2026-8942',
        probationEnd: new Date('2028-05-14T00:00:00.000Z'),
        riskLevel: 'LOW',
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Database seeded successfully", 
      marcusId: marcusProfile.id 
    });
  } catch (error: any) {
    console.error("Seed Error:", error);
    return NextResponse.json({ error: "Failed to seed database.", details: error.message }, { status: 500 });
  }
}

import { PrismaClient, ComplianceStatus, RiskLevel } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log("Wiping current database for fresh pilot seed...")
  await prisma.complianceLog.deleteMany({})
  await prisma.probationerProfile.deleteMany({})
  await prisma.user.deleteMany({})

  console.log("Seeding realistic database numbers...")
  
  // Create Mock Officer
  const officer = await prisma.user.create({
    data: {
      email: 'officer@complavi.com',
      name: 'Officer Davis',
      passwordHash: 'mock-hash',
      role: 'OFFICER',
    },
  })
  
  // Create the primary active demo participant (Replacing "Marcus T.")
  // We use the same ID "marcus-t-mock-id" because the check-in hardware simulator expects it
  const mainUser = await prisma.user.create({
    data: {
      email: 'm.thomas@mock.com',
      name: 'M. Thomas', // Professional initialization
      passwordHash: 'mock-hash',
      role: 'PROBATIONER',
    },
  })

  await prisma.probationerProfile.create({
    data: {
      id: 'marcus-t-mock-id',
      userId: mainUser.id,
      officerId: officer.id,
      caseNumber: 'CR-2026-8942',
      probationEnd: new Date('2028-05-14T00:00:00.000Z'),
      riskLevel: 'LOW',
    },
  })

  // Create 11 more professional mock participants to inflate numbers
  const mockNames = ['J. Rodriguez', 'A. Smith', 'K. Washington', 'L. Chen', 'T. Baker', 'S. Jackson', 'R. Patel', 'D. Kim', 'W. Wright', 'E. Foster', 'C. Hughes']
  
  for (let i = 0; i < mockNames.length; i++) {
    const user = await prisma.user.create({
      data: {
        email: `mock${i}@complavi.com`,
        name: mockNames[i],
        passwordHash: 'mock-hash',
        role: 'PROBATIONER',
      }
    })

    const profile = await prisma.probationerProfile.create({
      data: {
        userId: user.id,
        officerId: officer.id,
        caseNumber: `CR-2026-${1000 + i}`,
        probationEnd: new Date('2027-01-01T00:00:00.000Z'),
        riskLevel: i % 3 === 0 ? 'HIGH' : i % 2 === 0 ? 'MEDIUM' : 'LOW',
      }
    });

    // Add a random log to make the overview matrix look completely alive
    const rInt = Math.random();
    const status: ComplianceStatus = rInt > 0.8 ? 'VIOLATION' : rInt > 0.7 ? 'MISSED' : 'SUCCESS';
    
    await prisma.complianceLog.create({
      data: {
        probationerId: profile.id,
        status: status,
        notes: status === 'SUCCESS' ? 'Automated Log' : 'Review Required',
        latitude: status === 'SUCCESS' ? 34.05 + (Math.random() * 0.05) : null,
        longitude: status === 'SUCCESS' ? -118.25 - (Math.random() * 0.05) : null,
      }
    });
  }
  
  console.log("Seeding complete. Matrix is fully populated.")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

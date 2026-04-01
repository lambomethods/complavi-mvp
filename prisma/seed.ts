import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")
  
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
  })
  console.log("Officer seeded:", officer.id)

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
  })
  console.log("Marcus User seeded:", marcusUser.id)

  // Create ProbationerProfile for Marcus with specific ID
  const marcusProfile = await prisma.probationerProfile.upsert({
    where: { userId: marcusUser.id }, // changed to userId since caseNumber or userId might be the unique constraint 
    update: {},
    create: {
      id: 'marcus-t-mock-id',
      userId: marcusUser.id,
      officerId: officer.id,
      caseNumber: 'CR-2026-8942',
      probationEnd: new Date('2028-05-14T00:00:00.000Z'),
      riskLevel: 'LOW',
    },
  })
  console.log("Marcus Profile seeded:", marcusProfile.id)
  
  console.log("Seeding complete.")
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

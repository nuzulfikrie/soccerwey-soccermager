import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Clear existing data - ONLY include models that actually exist in schema
  await prisma.$transaction([
    prisma.matchStatistic.deleteMany(),
    prisma.matchLineup.deleteMany(),
    prisma.match.deleteMany(),
    prisma.player.deleteMany(),
    // Verify these models exist in your Prisma schema before uncommenting
    // prisma.lineup.deleteMany(),  // Check if this exists
    // prisma.kit.deleteMany(),     // Check if this exists
    prisma.team.deleteMany(),
    prisma.league.deleteMany(),
    prisma.session.deleteMany(),
    prisma.account.deleteMany(),
    prisma.verificationToken.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log('Database cleared successfully');

  // Rest of your seeding logic...
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
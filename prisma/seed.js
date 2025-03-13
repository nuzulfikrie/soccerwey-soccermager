import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Clear existing data
  await prisma.$transaction([
    prisma.matchStatistic.deleteMany(),
    prisma.matchLineup.deleteMany(),
    prisma.match.deleteMany(),
    prisma.player.deleteMany(),
    prisma.lineup.deleteMany(),
    prisma.kit.deleteMany(),
    prisma.team.deleteMany(),
    prisma.league.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log('Database cleared successfully');

  // Seed Users
  const admin = await prisma.user.create({
    data: {
      id: 'clh1234567890admin',
      name: 'Admin User',
      email: 'admin@soccerwey.com',
      hashedPassword: '$2a$12$k8Y6JG3pGXQrw.9Ry0P8h.NR4kN0PjLFcqKKPYt.OYXssOH.xYBIy',
      role: 'ADMIN',
    },
  });

  const john = await prisma.user.create({
    data: {
      id: 'clh1234567890john',
      name: 'John Doe',
      email: 'john.doe@soccerwey.com',
      hashedPassword: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpfQS.PVZYZGcK',
      role: 'USER',
    },
  });

  const jane = await prisma.user.create({
    data: {
      id: 'clh1234567890jane',
      name: 'Jane Smith',
      email: 'jane.smith@soccerwey.com',
      hashedPassword: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewYpfQS.PVZYZGcK',
      role: 'USER',
    },
  });

  console.log('Users seeded successfully');

  // Seed Leagues
  const premierLeague = await prisma.league.create({
    data: {
      id: 'clh1234567890pl',
      name: 'Premier League',
      logoUrl: 'https://example.com/logos/premier-league.png',
    },
  });

  const laLiga = await prisma.league.create({
    data: {
      id: 'clh1234567890ll',
      name: 'La Liga',
      logoUrl: 'https://example.com/logos/la-liga.png',
    },
  });

  const bundesliga = await prisma.league.create({
    data: {
      id: 'clh1234567890bl',
      name: 'Bundesliga',
      logoUrl: 'https://example.com/logos/bundesliga.png',
    },
  });

  console.log('Leagues seeded successfully');

  // Seed Teams - IMPORTANT: removed the kit-related fields
  const manchesterUnited = await prisma.team.create({
    data: {
      id: 'clh1234567890mu',
      name: 'Manchester United',
      logoUrl: 'https://example.com/logos/manchester-united.png',
      leagueId: premierLeague.id,
      userId: john.id,
    },
  });

  const liverpool = await prisma.team.create({
    data: {
      id: 'clh1234567890lp',
      name: 'Liverpool',
      logoUrl: 'https://example.com/logos/liverpool.png',
      leagueId: premierLeague.id,
      userId: jane.id,
    },
  });

  console.log('Teams seeded successfully');

  // Seed Kits - Add kit information in the separate Kit table
  const muMainKit = await prisma.kit.create({
    data: {
      id: 'clh1234567890muk1',
      type: 'MAIN',
      teamId: manchesterUnited.id,
      jersey: '#DA291C',
      pants: '#FFFFFF',
      socks: '#000000',
    },
  });

  const muSecondKit = await prisma.kit.create({
    data: {
      id: 'clh1234567890muk2',
      type: 'SECOND',
      teamId: manchesterUnited.id,
      jersey: '#000000',
      pants: '#000000',
      socks: '#DA291C',
    },
  });

  const lpMainKit = await prisma.kit.create({
    data: {
      id: 'clh1234567890lpk1',
      type: 'MAIN',
      teamId: liverpool.id,
      jersey: '#C8102E',
      pants: '#C8102E',
      socks: '#C8102E',
    },
  });

  const lpSecondKit = await prisma.kit.create({
    data: {
      id: 'clh1234567890lpk2',
      type: 'SECOND',
      teamId: liverpool.id,
      jersey: '#FFFFFF',
      pants: '#FFFFFF',
      socks: '#FFFFFF',
    },
  });

  console.log('Kits seeded successfully');

  // Seed Lineups
  const muLineup = await prisma.lineup.create({
    data: {
      id: 'clh1234567890mul1',
      name: 'Main Formation',
      teamId: manchesterUnited.id,
      kitId: muMainKit.id,
      formation: '4-3-3',
    },
  });

  const lpLineup = await prisma.lineup.create({
    data: {
      id: 'clh1234567890lpl1',
      name: 'Main Formation',
      teamId: liverpool.id,
      kitId: lpMainKit.id,
      formation: '4-3-3',
    },
  });

  console.log('Lineups seeded successfully');

  // Seed Players
  await prisma.player.createMany({
    data: [
      {
        id: 'clh1234567890mr',
        name: 'Marcus Rashford',
        number: 10,
        position: 'FWD',
        lineupId: muLineup.id,
        isSubstitute: false,
        x: 75,
        y: 80,
      },
      {
        id: 'clh1234567890bf',
        name: 'Bruno Fernandes',
        number: 8,
        position: 'MID',
        lineupId: muLineup.id,
        isSubstitute: false,
        x: 50,
        y: 60,
      },
      {
        id: 'clh1234567890ms',
        name: 'Mohamed Salah',
        number: 11,
        position: 'FWD',
        lineupId: lpLineup.id,
        isSubstitute: false,
        x: 75,
        y: 80,
      },
      {
        id: 'clh1234567890vd',
        name: 'Virgil van Dijk',
        number: 4,
        position: 'DEF',
        lineupId: lpLineup.id,
        isSubstitute: false,
        x: 25,
        y: 30,
      },
    ],
  });

  console.log('Players seeded successfully');

  // Seed Match
  const match = await prisma.match.create({
    data: {
      id: 'clh1234567890m1',
      homeTeamId: manchesterUnited.id,
      awayTeamId: liverpool.id,
      matchDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      venue: 'Old Trafford',
      status: 'SCHEDULED',
      homeScore: 0,
      awayScore: 0,
    },
  });

  console.log('Match seeded successfully');

  // Seed Match Lineups
  await prisma.matchLineup.createMany({
    data: [
      {
        id: 'clh1234567890ml1',
        matchId: match.id,
        teamId: manchesterUnited.id,
        playerId: 'clh1234567890mr',
        position: 'FWD',
        isStarter: true,
      },
      {
        id: 'clh1234567890ml2',
        matchId: match.id,
        teamId: manchesterUnited.id,
        playerId: 'clh1234567890bf',
        position: 'MID',
        isStarter: true,
      },
      {
        id: 'clh1234567890ml3',
        matchId: match.id,
        teamId: liverpool.id,
        playerId: 'clh1234567890ms',
        position: 'FWD',
        isStarter: true,
      },
      {
        id: 'clh1234567890ml4',
        matchId: match.id,
        teamId: liverpool.id,
        playerId: 'clh1234567890vd',
        position: 'DEF',
        isStarter: true,
      },
    ],
  });

  console.log('Match Lineups seeded successfully');

  // Seed Match Statistics
  await prisma.matchStatistic.createMany({
    data: [
      {
        id: 'clh1234567890s1',
        matchId: match.id,
        teamId: manchesterUnited.id,
        possession: 0,
        shotsOnTarget: 0,
        shotsOffTarget: 0,
        corners: 0,
        fouls: 0,
        yellowCards: 0,
        redCards: 0,
      },
      {
        id: 'clh1234567890s2',
        matchId: match.id,
        teamId: liverpool.id,
        possession: 0,
        shotsOnTarget: 0,
        shotsOffTarget: 0,
        corners: 0,
        fouls: 0,
        yellowCards: 0,
        redCards: 0,
      },
    ],
  });

  console.log('Match Statistics seeded successfully');
  console.log('Database seeding completed successfully');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
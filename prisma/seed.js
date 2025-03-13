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

  // Seed Teams
  const manchesterUnited = await prisma.team.create({
    data: {
      id: 'clh1234567890mu',
      name: 'Manchester United',
      logoUrl: 'https://example.com/logos/manchester-united.png',
      leagueId: premierLeague.id,
      teamKitColor: '#DA291C',
      teamKitColorSecondary: '#000000',
      teamKitColorThird: '#FFFFFF',
      teamPantsColor: '#FFFFFF',
      teamPantsColorSecondary: '#000000',
      teamPantsColorThird: '#DA291C',
      teamSocksColor: '#000000',
      teamSocksColorSecondary: '#DA291C',
      teamSocksColorThird: '#FFFFFF',
    },
  });

  const liverpool = await prisma.team.create({
    data: {
      id: 'clh1234567890lp',
      name: 'Liverpool',
      logoUrl: 'https://example.com/logos/liverpool.png',
      leagueId: premierLeague.id,
      teamKitColor: '#C8102E',
      teamKitColorSecondary: '#FFFFFF',
      teamKitColorThird: '#2D3238',
      teamPantsColor: '#C8102E',
      teamPantsColorSecondary: '#FFFFFF',
      teamPantsColorThird: '#2D3238',
      teamSocksColor: '#C8102E',
      teamSocksColorSecondary: '#FFFFFF',
      teamSocksColorThird: '#2D3238',
    },
  });

  console.log('Teams seeded successfully');

  // Seed Players
  const rashford = await prisma.player.create({
    data: {
      id: 'clh1234567890mr',
      firstName: 'Marcus',
      lastName: 'Rashford',
      jerseyNumber: 10,
      position: 'Forward',
      dateOfBirth: new Date('1997-10-31'),
      teamId: manchesterUnited.id,
    },
  });

  const bruno = await prisma.player.create({
    data: {
      id: 'clh1234567890bf',
      firstName: 'Bruno',
      lastName: 'Fernandes',
      jerseyNumber: 8,
      position: 'Midfielder',
      dateOfBirth: new Date('1994-09-08'),
      teamId: manchesterUnited.id,
    },
  });

  const salah = await prisma.player.create({
    data: {
      id: 'clh1234567890ms',
      firstName: 'Mohamed',
      lastName: 'Salah',
      jerseyNumber: 11,
      position: 'Forward',
      dateOfBirth: new Date('1992-06-15'),
      teamId: liverpool.id,
    },
  });

  const vanDijk = await prisma.player.create({
    data: {
      id: 'clh1234567890vd',
      firstName: 'Virgil',
      lastName: 'van Dijk',
      jerseyNumber: 4,
      position: 'Defender',
      dateOfBirth: new Date('1991-07-08'),
      teamId: liverpool.id,
    },
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
        playerId: rashford.id,
        position: 'Forward',
        isStarter: true,
      },
      {
        id: 'clh1234567890ml2',
        matchId: match.id,
        teamId: manchesterUnited.id,
        playerId: bruno.id,
        position: 'Midfielder',
        isStarter: true,
      },
      {
        id: 'clh1234567890ml3',
        matchId: match.id,
        teamId: liverpool.id,
        playerId: salah.id,
        position: 'Forward',
        isStarter: true,
      },
      {
        id: 'clh1234567890ml4',
        matchId: match.id,
        teamId: liverpool.id,
        playerId: vanDijk.id,
        position: 'Defender',
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
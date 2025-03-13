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
    prisma.session.deleteMany(),
    prisma.account.deleteMany(),
    prisma.verificationToken.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log('Database cleared successfully');

  // Create 10 Users (5 admins, 5 regular users)
  const users = await Promise.all(
    Array(10).fill(null).map((_, index) => {
      return prisma.user.create({
        data: {
          email: `user${index + 1}@soccerwey.com`,
          name: `User ${index + 1}`,
          role: index < 5 ? 'ADMIN' : 'USER',
          hashedPassword: 'password123', // In production, use proper password hashing
        }
      });
    })
  );

  // Create 10 Leagues
  const leagues = await Promise.all(
    [
      'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1',
      'Eredivisie', 'Primeira Liga', 'Super Lig', 'Pro League', 'Superliga'
    ].map(name => {
      return prisma.league.create({
        data: {
          name,
          logoUrl: `/images/leagues/${name.toLowerCase().replace(' ', '-')}.png`,
        }
      });
    })
  );

  // Create 10 Teams (2 for each of the first 5 leagues)
  const teamNames = [
    ['Manchester United', 'Liverpool'],
    ['Real Madrid', 'Barcelona'],
    ['Bayern Munich', 'Borussia Dortmund'],
    ['Juventus', 'AC Milan'],
    ['PSG', 'Lyon']
  ];

  const teams = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 2; j++) {
      const team = await prisma.team.create({
        data: {
          name: teamNames[i][j],
          logoUrl: `/images/teams/${teamNames[i][j].toLowerCase().replace(' ', '-')}.png`,
          leagueId: leagues[i].id,
          userId: users[i].id,
          Kit: {
            create: [
              {
                id: `${teamNames[i][j].toLowerCase().replace(' ', '-')}-main`,
                type: 'MAIN',
                jersey: 'RED',
                pants: 'WHITE',
                socks: 'BLACK',
                updatedAt: new Date()
              },
              {
                id: `${teamNames[i][j].toLowerCase().replace(' ', '-')}-away`,
                type: 'SECOND',
                jersey: 'WHITE',
                pants: 'BLACK',
                socks: 'WHITE',
                updatedAt: new Date()
              }
            ]
          }
        }
      });
      teams.push(team);
    }
  }

  // Create 10 Players for each team
  const positions = ['GK', 'DEF', 'MID', 'FWD'];
  for (const team of teams) {
    const lineup = await prisma.lineup.create({
      data: {
        id: `lineup-${team.id}`,
        name: `${team.name} Main Lineup`,
        teamId: team.id,
        kitId: `${team.name.toLowerCase().replace(' ', '-')}-main`,
        formation: '4-3-3',
        updatedAt: new Date()
      }
    });

    await Promise.all(
      Array(10).fill(null).map((_, index) => {
        return prisma.player.create({
          data: {
            name: `Player ${index + 1} - ${team.name}`,
            number: index + 1,
            position: positions[Math.floor(index / 3)],
            isSubstitute: index > 6,
            lineupId: lineup.id
          }
        });
      })
    );
  }

  // Create 10 Matches
  for (let i = 0; i < 5; i++) {
    const homeTeam = teams[i * 2];
    const awayTeam = teams[i * 2 + 1];

    const match = await prisma.match.create({
      data: {
        matchDate: new Date(2024, 3, i + 1), // April 1-5, 2024
        venue: `${homeTeam.name} Stadium`,
        status: 'SCHEDULED',
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id
      }
    });

    // Create match statistics
    await prisma.matchStatistic.create({
      data: {
        matchId: match.id,
        teamId: homeTeam.id,
        possession: 55,
        shotsOnTarget: 5,
        shotsOffTarget: 7,
        corners: 6,
        fouls: 12
      }
    });

    await prisma.matchStatistic.create({
      data: {
        matchId: match.id,
        teamId: awayTeam.id,
        possession: 45,
        shotsOnTarget: 3,
        shotsOffTarget: 4,
        corners: 4,
        fouls: 10
      }
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
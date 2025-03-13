import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getMatch(id: string) {
  const match = await prisma.match.findUnique({
    where: { id },
    include: {
      homeTeam: true,
      awayTeam: true,
      statistics: true,
      lineups: {
        include: {
          player: true,
        },
      },
    },
  });

  if (!match) {
    notFound();
  }

  return match;
}

export default async function MatchPage({ params }: { params: { id: string } }) {
  const match = await getMatch(params.id);

  const homeStats = match.statistics.find((stat) => stat.teamId === match.homeTeamId);
  const awayStats = match.statistics.find((stat) => stat.teamId === match.awayTeamId);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Match Details</h1>
        <div className="flex gap-4">
          {match.status === 'SCHEDULED' && (
            <Link href={`/matches/${match.id}/setup`}>
              <Button>Setup Match</Button>
            </Link>
          )}
          {match.status === 'IN_PROGRESS' && (
            <Link href={`/matches/${match.id}/live`}>
              <Button variant="destructive">Live Match</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex-1 text-center">
              <h2 className="text-xl font-semibold">{match.homeTeam.name}</h2>
              <p className="text-2xl font-bold mt-2">{match.homeScore}</p>
            </div>

            <div className="px-8 text-center">
              <p className="text-sm text-gray-500">
                {new Date(match.matchDate).toLocaleDateString()}
              </p>
              <p className="text-sm font-semibold mt-1">{match.status}</p>
              <p className="text-sm text-gray-500 mt-1">{match.venue}</p>
            </div>

            <div className="flex-1 text-center">
              <h2 className="text-xl font-semibold">{match.awayTeam.name}</h2>
              <p className="text-2xl font-bold mt-2">{match.awayScore}</p>
            </div>
          </div>
        </Card>

        {match.statistics.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Match Statistics</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Possession</p>
                <p className="text-2xl font-bold">{homeStats?.possession}%</p>
                <p className="text-sm text-gray-500">{awayStats?.possession}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Shots on Target</p>
                <p className="text-2xl font-bold">{homeStats?.shotsOnTarget}</p>
                <p className="text-sm text-gray-500">{awayStats?.shotsOnTarget}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Corners</p>
                <p className="text-2xl font-bold">{homeStats?.corners}</p>
                <p className="text-sm text-gray-500">{awayStats?.corners}</p>
              </div>
            </div>
          </Card>
        )}

        {match.lineups.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Lineups</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">{match.homeTeam.name}</h3>
                <div className="space-y-2">
                  {match.lineups
                    .filter((lineup) => lineup.teamId === match.homeTeamId)
                    .map((lineup) => (
                      <div key={lineup.id} className="flex items-center gap-2">
                        <span className="font-mono">{lineup.player.number}</span>
                        <span>{lineup.player.name}</span>
                        <span className="text-sm text-gray-500">{lineup.player.position}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{match.awayTeam.name}</h3>
                <div className="space-y-2">
                  {match.lineups
                    .filter((lineup) => lineup.teamId === match.awayTeamId)
                    .map((lineup) => (
                      <div key={lineup.id} className="flex items-center gap-2">
                        <span className="font-mono">{lineup.player.number}</span>
                        <span>{lineup.player.name}</span>
                        <span className="text-sm text-gray-500">{lineup.player.position}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
} 
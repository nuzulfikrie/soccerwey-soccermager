import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getMatches() {
  const matches = await prisma.match.findMany({
    include: {
      homeTeam: true,
      awayTeam: true,
      statistics: true,
    },
    orderBy: {
      matchDate: 'desc',
    },
  });
  return matches;
}

export default async function MatchesPage() {
  const matches = await getMatches();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Matches</h1>
        <Link href="/matches/new">
          <Button>New Match</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {matches.map((match) => (
          <Card key={match.id} className="p-6">
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

            <div className="mt-4 flex justify-center gap-4">
              <Link href={`/matches/${match.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
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
          </Card>
        ))}
      </div>
    </div>
  );
}
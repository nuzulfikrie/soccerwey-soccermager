'use client';

import { MatchSetup } from '@/components/match-setup';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MatchSetupPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatch() {
      const response = await fetch(`/api/matches/${params.id}`);
      const data = await response.json();
      setMatch(data);
      setLoading(false);
    }

    fetchMatch();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!match) {
    return <div>Match not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Match Setup</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Match Information</h2>
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h3 className="text-lg font-semibold">{match.homeTeam.name}</h3>
            </div>
            <div className="px-8 text-center">
              <p className="text-sm text-gray-500">
                {new Date(match.matchDate).toLocaleDateString()}
              </p>
              <p className="text-sm font-semibold mt-1">{match.status}</p>
              <p className="text-sm text-gray-500 mt-1">{match.venue}</p>
            </div>
            <div className="text-center flex-1">
              <h3 className="text-lg font-semibold">{match.awayTeam.name}</h3>
            </div>
          </div>
        </div>

        <MatchSetup matchId={match.id} />
      </Card>
    </div>
  );
} 
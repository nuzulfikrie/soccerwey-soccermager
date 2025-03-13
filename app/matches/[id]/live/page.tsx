'use client';

import { LiveMatch } from '@/components/live-match';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LiveMatchPage({ params }: { params: { id: string } }) {
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

  if (match.status !== 'IN_PROGRESS') {
    return (
      <div className="container mx-auto py-8">
        <Card className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Match Not Started</h1>
            <p className="text-gray-500 mb-4">
              This match is not currently in progress. Please set up the match first.
            </p>
            <Button onClick={() => router.push(`/matches/${params.id}/setup`)}>
              Go to Match Setup
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Live Match</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <LiveMatch matchId={match.id} />
    </div>
  );
} 
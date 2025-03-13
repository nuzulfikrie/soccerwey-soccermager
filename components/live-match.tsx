'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import useMatchStore from '@/lib/store';
import { pusherClient } from '@/lib/pusher';
import { PlayField } from '@/components/play-field';

export function LiveMatch() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const { teamA, teamB, updateScore } = useMatchStore();

  useEffect(() => {
    const channel = pusherClient.subscribe('match-updates');
    
    channel.bind('score-update', (data: { teamId: string; score: number }) => {
      updateScore(data.teamId, data.score);
    });

    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      clearInterval(timer);
    };
  }, [updateScore]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleScoreUpdate = async (teamId: string, increment: boolean) => {
    const team = teamId === 'team-a' ? teamA : teamB;
    const newScore = increment ? team.score + 1 : Math.max(0, team.score - 1);
    
    try {
      await fetch('/api/update-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamId,
          score: newScore,
        }),
      });
    } catch (error) {
      console.error('Failed to update score:', error);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="flex justify-between items-center">
          <div className="text-center flex-1">
            <h2 className="text-2xl font-bold">{teamA.name}</h2>
            <div className="flex items-center justify-center gap-4 mt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleScoreUpdate('team-a', false)}
              >
                -
              </Button>
              <span className="text-4xl font-bold">{teamA.score}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleScoreUpdate('team-a', true)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="text-center px-8">
            <div className="text-3xl font-mono">{formatTime(elapsedTime)}</div>
          </div>

          <div className="text-center flex-1">
            <h2 className="text-2xl font-bold">{teamB.name}</h2>
            <div className="flex items-center justify-center gap-4 mt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleScoreUpdate('team-b', false)}
              >
                -
              </Button>
              <span className="text-4xl font-bold">{teamB.score}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleScoreUpdate('team-b', true)}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <PlayField />
    </div>
  );
}
import { prisma } from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { teamId, score } = await request.json();

    // Update the match score based on which team scored
    const match = await prisma.match.update({
      where: {
        id: teamId.split('-')[1], // Extract match ID from teamId (e.g., "team-a-123")
      },
      data: {
        [teamId.startsWith('team-a') ? 'homeScore' : 'awayScore']: score,
      },
    });

    // Broadcast the score update to all connected clients
    await pusherServer.trigger('match-updates', 'score-update', {
      teamId,
      score,
    });

    return NextResponse.json(match);
  } catch (error) {
    console.error('Error updating score:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { pusher } from '@/lib/pusher';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { teamId, score } = body;

    await pusher.trigger('match-updates', 'score-update', {
      teamId,
      score,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating score:', error);
    return NextResponse.json(
      { error: 'Failed to update score' },
      { status: 500 }
    );
  }
}
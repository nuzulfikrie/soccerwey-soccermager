'use client';

import { useMemo } from 'react';
import useMatchStore, { Player } from '@/lib/store';

export function PlayField() {
  const { matchType, teamA, teamB } = useMatchStore();

  const getPlayerPositions = (players: Player[], isTeamA: boolean) => {
    const positions = {
      GK: [] as Player[],
      DEF: [] as Player[],
      MID: [] as Player[],
      FWD: [] as Player[],
    };

    players.forEach((player) => {
      if (!player.isSubstitute) {
        positions[player.position as keyof typeof positions].push(player);
      }
    });

    return positions;
  };

  const teamAPositions = useMemo(() => getPlayerPositions(teamA.players, true), [teamA.players]);
  const teamBPositions = useMemo(() => getPlayerPositions(teamB.players, false), [teamB.players]);

  const PlayerMarker = ({ player }: { player: Player }) => (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
        <span className="text-sm font-bold">{player.number}</span>
      </div>
      <div className="text-white text-xs mt-1 text-center font-semibold">
        {player.name}
      </div>
    </div>
  );

  return (
    <div className="relative w-full aspect-[2/1] bg-green-600 rounded-lg overflow-hidden">
      {/* Field markings */}
      <div className="absolute inset-0 border-2 border-white opacity-50" />
      <div className="absolute left-1/2 top-0 bottom-0 w-0 border-l-2 border-white opacity-50" />
      <div className="absolute w-48 h-48 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full opacity-50" />
      
      {/* Team A Players */}
      <div className="absolute inset-0 left-0 right-1/2">
        {teamAPositions.GK.map((player) => (
          <div key={player.id} className="absolute left-[10%] top-1/2">
            <PlayerMarker player={player} />
          </div>
        ))}
        {teamAPositions.DEF.map((player, idx) => (
          <div
            key={player.id}
            className="absolute left-[25%]"
            style={{
              top: `${(idx + 1) * (100 / (teamAPositions.DEF.length + 1))}%`,
            }}
          >
            <PlayerMarker player={player} />
          </div>
        ))}
        {teamAPositions.MID.map((player, idx) => (
          <div
            key={player.id}
            className="absolute left-[40%]"
            style={{
              top: `${(idx + 1) * (100 / (teamAPositions.MID.length + 1))}%`,
            }}
          >
            <PlayerMarker player={player} />
          </div>
        ))}
        {teamAPositions.FWD.map((player, idx) => (
          <div
            key={player.id}
            className="absolute left-[55%]"
            style={{
              top: `${(idx + 1) * (100 / (teamAPositions.FWD.length + 1))}%`,
            }}
          >
            <PlayerMarker player={player} />
          </div>
        ))}
      </div>

      {/* Team B Players */}
      <div className="absolute inset-0 left-1/2 right-0">
        {teamBPositions.GK.map((player) => (
          <div key={player.id} className="absolute right-[10%] top-1/2">
            <PlayerMarker player={player} />
          </div>
        ))}
        {teamBPositions.DEF.map((player, idx) => (
          <div
            key={player.id}
            className="absolute right-[25%]"
            style={{
              top: `${(idx + 1) * (100 / (teamBPositions.DEF.length + 1))}%`,
            }}
          >
            <PlayerMarker player={player} />
          </div>
        ))}
        {teamBPositions.MID.map((player, idx) => (
          <div
            key={player.id}
            className="absolute right-[40%]"
            style={{
              top: `${(idx + 1) * (100 / (teamBPositions.MID.length + 1))}%`,
            }}
          >
            <PlayerMarker player={player} />
          </div>
        ))}
        {teamBPositions.FWD.map((player, idx) => (
          <div
            key={player.id}
            className="absolute right-[55%]"
            style={{
              top: `${(idx + 1) * (100 / (teamBPositions.FWD.length + 1))}%`,
            }}
          >
            <PlayerMarker player={player} />
          </div>
        ))}
      </div>
    </div>
  );
}
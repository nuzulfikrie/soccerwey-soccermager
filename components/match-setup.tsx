'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import useMatchStore, { Player, MatchType } from '@/lib/store';

export function MatchSetup() {
  const [teamAPlayers, setTeamAPlayers] = useState<Player[]>([]);
  const [teamBPlayers, setTeamBPlayers] = useState<Player[]>([]);
  const { matchType, setMatchType, updateTeam, startMatch } = useMatchStore();

  const handleAddPlayer = (team: 'A' | 'B') => {
    const newPlayer: Player = {
      id: `player-${Date.now()}`,
      name: '',
      number: 0,
      position: '',
      isSubstitute: false,
    };

    if (team === 'A') {
      setTeamAPlayers([...teamAPlayers, newPlayer]);
    } else {
      setTeamBPlayers([...teamBPlayers, newPlayer]);
    }
  };

  const handleStartMatch = () => {
    updateTeam('team-a', { players: teamAPlayers });
    updateTeam('team-b', { players: teamBPlayers });
    startMatch();
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Match Setup</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label>Match Type</Label>
            <Select
              value={matchType}
              onValueChange={(value) => setMatchType(value as MatchType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select match type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5v5">5-a-side</SelectItem>
                <SelectItem value="11v11">11-a-side</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Team A Setup */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Team A</h3>
            <div>
              <Label>Team Name</Label>
              <Input
                placeholder="Enter team name"
                onChange={(e) =>
                  updateTeam('team-a', { name: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Players</Label>
              {teamAPlayers.map((player, index) => (
                <div key={player.id} className="grid grid-cols-3 gap-2 mb-2">
                  <Input
                    placeholder="Name"
                    value={player.name}
                    onChange={(e) => {
                      const newPlayers = [...teamAPlayers];
                      newPlayers[index].name = e.target.value;
                      setTeamAPlayers(newPlayers);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Number"
                    value={player.number || ''}
                    onChange={(e) => {
                      const newPlayers = [...teamAPlayers];
                      newPlayers[index].number = parseInt(e.target.value);
                      setTeamAPlayers(newPlayers);
                    }}
                  />
                  <Select
                    value={player.position}
                    onValueChange={(value) => {
                      const newPlayers = [...teamAPlayers];
                      newPlayers[index].position = value;
                      setTeamAPlayers(newPlayers);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GK">Goalkeeper</SelectItem>
                      <SelectItem value="DEF">Defender</SelectItem>
                      <SelectItem value="MID">Midfielder</SelectItem>
                      <SelectItem value="FWD">Forward</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => handleAddPlayer('A')}
                className="mt-2"
              >
                Add Player
              </Button>
            </div>
          </div>

          {/* Team B Setup */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Team B</h3>
            <div>
              <Label>Team Name</Label>
              <Input
                placeholder="Enter team name"
                onChange={(e) =>
                  updateTeam('team-b', { name: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Players</Label>
              {teamBPlayers.map((player, index) => (
                <div key={player.id} className="grid grid-cols-3 gap-2 mb-2">
                  <Input
                    placeholder="Name"
                    value={player.name}
                    onChange={(e) => {
                      const newPlayers = [...teamBPlayers];
                      newPlayers[index].name = e.target.value;
                      setTeamBPlayers(newPlayers);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Number"
                    value={player.number || ''}
                    onChange={(e) => {
                      const newPlayers = [...teamBPlayers];
                      newPlayers[index].number = parseInt(e.target.value);
                      setTeamBPlayers(newPlayers);
                    }}
                  />
                  <Select
                    value={player.position}
                    onValueChange={(value) => {
                      const newPlayers = [...teamBPlayers];
                      newPlayers[index].position = value;
                      setTeamBPlayers(newPlayers);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GK">Goalkeeper</SelectItem>
                      <SelectItem value="DEF">Defender</SelectItem>
                      <SelectItem value="MID">Midfielder</SelectItem>
                      <SelectItem value="FWD">Forward</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => handleAddPlayer('B')}
                className="mt-2"
              >
                Add Player
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            onClick={handleStartMatch}
            disabled={
              teamAPlayers.length === 0 ||
              teamBPlayers.length === 0 ||
              teamAPlayers.some((p) => !p.name || !p.number || !p.position) ||
              teamBPlayers.some((p) => !p.name || !p.number || !p.position)
            }
          >
            Start Match
          </Button>
        </div>
      </Card>
    </div>
  );
}
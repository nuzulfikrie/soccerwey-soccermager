import { create } from 'zustand';

export type Player = {
  id: string;
  name: string;
  number: number;
  position: string;
  isSubstitute: boolean;
};

export type Team = {
  id: string;
  name: string;
  score: number;
  players: Player[];
};

export type MatchType = '5v5' | '11v11';

interface MatchState {
  matchType: MatchType;
  teamA: Team;
  teamB: Team;
  timer: number;
  isMatchStarted: boolean;
  setMatchType: (type: MatchType) => void;
  updateTeam: (teamId: string, updates: Partial<Team>) => void;
  updateScore: (teamId: string, newScore: number) => void;
  updateTimer: (time: number) => void;
  startMatch: () => void;
  resetMatch: () => void;
}

const useMatchStore = create<MatchState>((set) => ({
  matchType: '11v11',
  teamA: {
    id: 'team-a',
    name: 'Team A',
    score: 0,
    players: [],
  },
  teamB: {
    id: 'team-b',
    name: 'Team B',
    score: 0,
    players: [],
  },
  timer: 0,
  isMatchStarted: false,
  setMatchType: (type) => set({ matchType: type }),
  updateTeam: (teamId, updates) =>
    set((state) => ({
      ...(teamId === 'team-a'
        ? { teamA: { ...state.teamA, ...updates } }
        : { teamB: { ...state.teamB, ...updates } }),
    })),
  updateScore: (teamId, newScore) =>
    set((state) => ({
      ...(teamId === 'team-a'
        ? { teamA: { ...state.teamA, score: newScore } }
        : { teamB: { ...state.teamB, score: newScore } }),
    })),
  updateTimer: (time) => set({ timer: time }),
  startMatch: () => set({ isMatchStarted: true }),
  resetMatch: () =>
    set({
      teamA: { id: 'team-a', name: 'Team A', score: 0, players: [] },
      teamB: { id: 'team-b', name: 'Team B', score: 0, players: [] },
      timer: 0,
      isMatchStarted: false,
    }),
}));

export default useMatchStore;
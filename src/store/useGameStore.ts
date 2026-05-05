import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, LevelResult } from '../types';

const XP_PER_LEVEL = 150;

interface GameStore extends GameState {
  setPlayerName: (name: string) => void;
  addXP: (amount: number) => void;
  saveLevelResult: (result: LevelResult) => void;
  updateStreak: (correct: boolean) => void;
  resetProgress: () => void;
  loadFromFirestore: (state: Partial<GameState>) => void;
  getPlayerLevel: () => number;
  getXPProgress: () => { current: number; needed: number; percent: number };
  getLevelResult: (topicId: string, levelId: string) => LevelResult | undefined;
  getTopicStars: (topicId: string, levelCount: number) => number;
}

const initialState: GameState = {
  playerName: '',
  xp: 0,
  level: 1,
  levelResults: {},
  totalCorrect: 0,
  totalAttempted: 0,
  streak: 0,
  bestStreak: 0,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPlayerName: (name) => set({ playerName: name }),

      addXP: (amount) =>
        set((state) => {
          const newXP = state.xp + amount;
          const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
          return { xp: newXP, level: newLevel };
        }),

      saveLevelResult: (result) =>
        set((state) => {
          const key = `${result.topicId}-${result.levelId}`;
          const existing = state.levelResults[key];
          if (existing && existing.stars >= result.stars) return state;
          return {
            levelResults: { ...state.levelResults, [key]: result },
          };
        }),

      updateStreak: (correct) =>
        set((state) => {
          if (correct) {
            const newStreak = state.streak + 1;
            return {
              streak: newStreak,
              bestStreak: Math.max(newStreak, state.bestStreak),
              totalCorrect: state.totalCorrect + 1,
              totalAttempted: state.totalAttempted + 1,
            };
          }
          return { streak: 0, totalAttempted: state.totalAttempted + 1 };
        }),

      resetProgress: () => set(initialState),

      loadFromFirestore: (remote) =>
        set((local) => ({
          playerName: remote.playerName || local.playerName,
          xp: Math.max(remote.xp ?? 0, local.xp),
          level: Math.max(remote.level ?? 1, local.level),
          totalCorrect: Math.max(remote.totalCorrect ?? 0, local.totalCorrect),
          totalAttempted: Math.max(remote.totalAttempted ?? 0, local.totalAttempted),
          bestStreak: Math.max(remote.bestStreak ?? 0, local.bestStreak),
          streak: local.streak,
          levelResults: { ...local.levelResults, ...remote.levelResults },
        })),

      getPlayerLevel: () => {
        const { xp } = get();
        return Math.floor(xp / XP_PER_LEVEL) + 1;
      },

      getXPProgress: () => {
        const { xp } = get();
        const current = xp % XP_PER_LEVEL;
        const needed = XP_PER_LEVEL;
        const percent = Math.round((current / needed) * 100);
        return { current, needed, percent };
      },

      getLevelResult: (topicId, levelId) => {
        const key = `${topicId}-${levelId}`;
        return get().levelResults[key];
      },

      getTopicStars: (topicId, levelCount) => {
        const { levelResults } = get();
        let total = 0;
        for (let i = 0; i < levelCount; i++) {
          const key = `${topicId}-level-${i + 1}`;
          const result = levelResults[key];
          if (result) total += result.stars;
        }
        return total;
      },
    }),
    { name: 'matteapp-game-state' }
  )
);

export { XP_PER_LEVEL };

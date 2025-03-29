import { create } from 'zustand';

interface Actions {
  startGame: () => void;
  endGame: () => void;
}

interface Store {
  gameState: boolean;
  actions: Actions;
}

export const gameStore = create<Store>((set, get) => ({
  gameState: false,
  actions: {
    startGame: () => {
      set({ gameState: true });
    },
    endGame: () => {
      set({ gameState: false });
    },
  },
}));

export const useGameState = () => gameStore(({ gameState }) => gameState);
export const useGameActions = () => gameStore(({ actions }) => actions);

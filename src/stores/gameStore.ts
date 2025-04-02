import { createStore } from 'zustand/vanilla';

export type GameStoreState = {
  gameState: boolean;
};

export type GameStoreActions = {
  startGame: () => void;
  endGame: () => void;
};

export type GameStore = GameStoreState & {
  actions: GameStoreActions;
};

const defaultInitState: GameStoreState = {
  gameState: false,
};

export const createGameStore = (initState: GameStoreState = defaultInitState) => {
  return createStore<GameStore>((set, get) => ({
    ...initState,
    actions: {
      startGame: () => {
        set({ gameState: true });
      },
      endGame: () => {
        set({ gameState: false });
      },
    },
  }));
};

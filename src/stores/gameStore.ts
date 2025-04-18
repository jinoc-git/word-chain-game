import { createStore } from 'zustand/vanilla';

export type GameStoreState = {
  isWaitingTurn: boolean;
  gameState: boolean;
};

export type GameStoreActions = {
  startGame: () => void;
  endGame: () => void;
  setIsWaitingTurn: (waiting: boolean) => void;
};

export type GameStore = {
  state: GameStoreState;
  actions: GameStoreActions;
};

const defaultInitState: GameStoreState = {
  isWaitingTurn: true,
  gameState: false,
};

export const createGameStore = (initState: GameStoreState = defaultInitState) => {
  return createStore<GameStore>()((set, get) => ({
    state: initState,
    actions: {
      startGame: () => {
        set((store) => ({ state: { ...store.state, gameState: true } }));
      },
      endGame: () => {
        set((store) => ({ state: { ...store.state, gameState: false } }));
      },
      setIsWaitingTurn: (waiting: boolean) => {
        set((store) => ({ state: { ...store.state, isWaitingTurn: waiting } }));
      },
    },
  }));
};

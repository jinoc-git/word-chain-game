'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import { createGameStore } from '@/stores/gameStore';

import type { GameStore, GameStoreActions, GameStoreState } from '@/stores/gameStore';

type StoreProps = {
  children: ReactNode;
};

export type GameStoreApi = ReturnType<typeof createGameStore>;
export const GameStoreContext = createContext<GameStoreApi | undefined>(undefined);
export const GameStoreProvider = ({ children }: StoreProps) => {
  const storeRef = useRef<GameStoreApi | null>(null);
  if (storeRef.current === null) storeRef.current = createGameStore();

  return <GameStoreContext.Provider value={storeRef.current}>{children}</GameStoreContext.Provider>;
};

const useGameStore = <T,>(selector: (state: GameStore) => T): T => {
  const gameStoreContext = useContext(GameStoreContext);
  if (!gameStoreContext) throw new Error('useGameStore must be used within GameStoreProvider');

  return useStore(gameStoreContext, selector);
};

export const useGameState = <T,>(selector: (state: GameStoreState) => T): T => {
  return useGameStore(({ state }) => selector(state));
};

export const useGameActions = <T,>(selector: (state: GameStoreActions) => T): T => {
  return useGameStore(({ actions }) => selector(actions));
};

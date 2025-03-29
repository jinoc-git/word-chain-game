'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import { createGameStore } from '@/stores/gameStore';

import type { GameStoreActions, GameStoreState } from '@/stores/gameStore';

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

export const useGameState = <T,>(selector: (state: GameStoreState) => T): T => {
  const gameStoreContext = useContext(GameStoreContext);
  if (!gameStoreContext) throw new Error('useGameState must be used within GameStoreProvider');

  return useStore(gameStoreContext, ({ gameState }) => selector({ gameState }));
};

export const useGameActions = <T,>(selector: (state: GameStoreActions) => T): T => {
  const gameStoreContext = useContext(GameStoreContext);
  if (!gameStoreContext) throw new Error('useGameActions must be used within GameStoreProvider');

  return useStore(gameStoreContext, ({ actions }) => selector(actions));
};

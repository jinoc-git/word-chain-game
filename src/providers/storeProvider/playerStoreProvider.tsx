'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import { createPlayerStore } from '@/stores/playerStore';

import type { PlayerStoreActions, PlayerStoreState } from '@/stores/playerStore';

type StoreProps = {
  children: ReactNode;
};

export type PlayerStoreApi = ReturnType<typeof createPlayerStore>;
export const PlayerStoreContext = createContext<PlayerStoreApi | undefined>(undefined);
export const PlayerStoreProvider = ({ children }: StoreProps) => {
  const storeRef = useRef<PlayerStoreApi | null>(null);
  if (storeRef.current === null) storeRef.current = createPlayerStore();

  return (
    <PlayerStoreContext.Provider value={storeRef.current}>{children}</PlayerStoreContext.Provider>
  );
};

export const usePlayerState = <T,>(selector: (state: PlayerStoreState) => T): T => {
  const playerStoreContext = useContext(PlayerStoreContext);
  if (!playerStoreContext)
    throw new Error('usePlayerState must be used within PlayerStoreProvider');

  return useStore(playerStoreContext, ({ curPlayers }) => selector({ curPlayers }));
};

export const usePlayerActions = <T,>(selector: (state: PlayerStoreActions) => T): T => {
  const playerStoreContext = useContext(PlayerStoreContext);
  if (!playerStoreContext)
    throw new Error('usePlayerActions must be used within GameStoreProvider');

  return useStore(playerStoreContext, ({ actions }) => selector(actions));
};

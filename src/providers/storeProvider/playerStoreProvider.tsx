'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import { createPlayerStore } from '@/stores/playerStore';

import type { PlayerStore, PlayerStoreActions, PlayerStoreState } from '@/stores/playerStore';

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

const usePlayerStore = <T,>(selector: (state: PlayerStore) => T): T => {
  const playerStoreContext = useContext(PlayerStoreContext);
  if (!playerStoreContext)
    throw new Error('usePlayerStore must be used within PlayerStoreProvider');

  return useStore(playerStoreContext, selector);
};

export const usePlayerState = <T,>(selector: (state: PlayerStoreState) => T): T => {
  return usePlayerStore(({ state }) => selector(state));
};

export const usePlayerActions = <T,>(selector: (state: PlayerStoreActions) => T): T => {
  return usePlayerStore(({ actions }) => selector(actions));
};

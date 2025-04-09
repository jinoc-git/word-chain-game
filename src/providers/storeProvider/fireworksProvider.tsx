'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import { createFireworksStore } from '@/stores/fireworksStore';

import type {
  FireworksStore,
  FireworksStoreActions,
  FireworksStoreState,
} from '@/stores/fireworksStore';

type StoreProps = {
  children: ReactNode;
};

export type FireworksStoreApi = ReturnType<typeof createFireworksStore>;
export const FireworksStoreContext = createContext<FireworksStoreApi | undefined>(undefined);
export const FireworksStoreProvider = ({ children }: StoreProps) => {
  const storeRef = useRef<FireworksStoreApi | null>(null);
  if (storeRef.current === null) storeRef.current = createFireworksStore();

  return (
    <FireworksStoreContext.Provider value={storeRef.current}>
      {children}
    </FireworksStoreContext.Provider>
  );
};

const useFireworksStore = <T,>(selector: (state: FireworksStore) => T): T => {
  const fireworksStoreContext = useContext(FireworksStoreContext);
  if (!fireworksStoreContext)
    throw new Error('usePlayerStore must be used within PlayerStoreProvider');

  return useStore(fireworksStoreContext, selector);
};

export const useFireworksState = <T,>(selector: (state: FireworksStoreState) => T): T => {
  return useFireworksStore(selector);
};

export const useFireworksActions = <T,>(selector: (state: FireworksStoreActions) => T): T => {
  return useFireworksStore(({ actions }) => selector(actions));
};

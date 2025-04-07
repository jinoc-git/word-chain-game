'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import { createCountStore } from '@/stores/countStore';

import type { CountStore, CountStoreActions, CountStoreState } from '@/stores/countStore';

type StoreProps = {
  children: ReactNode;
};

export type CountStoreApi = ReturnType<typeof createCountStore>;
export const CountStoreContext = createContext<CountStoreApi | undefined>(undefined);
export const CountStoreProvider = ({ children }: StoreProps) => {
  const storeRef = useRef<CountStoreApi | null>(null);
  if (storeRef.current === null) storeRef.current = createCountStore();

  return (
    <CountStoreContext.Provider value={storeRef.current}>{children}</CountStoreContext.Provider>
  );
};

const useCountStore = <T,>(selector: (state: CountStore) => T): T => {
  const countStoreContext = useContext(CountStoreContext);
  if (!countStoreContext) throw new Error('useCountStore must be used within CountStoreProvider');

  return useStore(countStoreContext, selector);
};

type CountStoreStateWithoutTimeoutId = Omit<CountStoreState, '_timeoutId'>;
export const useCountState = <T,>(selector: (state: CountStoreStateWithoutTimeoutId) => T): T => {
  return useCountStore(({ state }) => selector(state));
};

type CountStoreActionsWithoutClearTimeout = Omit<CountStoreActions, '_clearTimeout'>;
export const useCountActions = <T,>(
  selector: (state: CountStoreActionsWithoutClearTimeout) => T,
): T => {
  return useCountStore(({ actions }) => selector(actions));
};

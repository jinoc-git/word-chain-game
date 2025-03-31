'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import { createWordStore } from '@/stores/wordStore';

import type { WordStoreActions, WordStoreState } from '@/stores/wordStore';

type StoreProps = {
  children: ReactNode;
};

export type WordStoreApi = ReturnType<typeof createWordStore>;
export const WordStoreContext = createContext<WordStoreApi | undefined>(undefined);
export const WordStoreProvider = ({ children }: StoreProps) => {
  const storeRef = useRef<WordStoreApi | null>(null);
  if (!storeRef.current) storeRef.current = createWordStore();

  return <WordStoreContext.Provider value={storeRef.current}>{children}</WordStoreContext.Provider>;
};

export const useWordState = <T,>(selector: (state: WordStoreState) => T): T => {
  const wordStoreContext = useContext(WordStoreContext);
  if (!wordStoreContext) throw new Error('useWordState must be used within WordStoreContext');

  return useStore(wordStoreContext, ({ words }) => selector({ words }));
};

export const useWordActions = <T,>(selector: (state: WordStoreActions) => T): T => {
  const wordStoreContext = useContext(WordStoreContext);
  if (!wordStoreContext) throw new Error('useWordActions must be used within WordStoreContext');

  return useStore(wordStoreContext, ({ actions }) => selector(actions));
};

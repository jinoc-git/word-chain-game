'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import { createWordStore } from '@/stores/wordStore';

import type { WordStore, WordStoreActions, WordStoreState } from '@/stores/wordStore';

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

const useWordStore = <T,>(selector: (state: WordStore) => T): T => {
  const wordStoreContext = useContext(WordStoreContext);
  if (!wordStoreContext) throw new Error('useWordStore must be used within WordStoreContext');

  return useStore(wordStoreContext, selector);
};

export const useWordState = <T,>(selector: (state: WordStoreState) => T): T => {
  return useWordStore(selector);
};

export const useWordActions = <T,>(selector: (state: WordStoreActions) => T): T => {
  return useWordStore(({ actions }) => selector(actions));
};

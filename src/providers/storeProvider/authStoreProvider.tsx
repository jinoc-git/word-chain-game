'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import { createAuthStore } from '@/stores/authStore';

import type { AuthStore, AuthStoreActions, AuthStoreState } from '@/stores/authStore';

type StoreProps = {
  children: ReactNode;
};

export type AuthStoreApi = ReturnType<typeof createAuthStore>;
export const AuthStoreContext = createContext<AuthStoreApi | undefined>(undefined);
export const AuthStoreProvider = ({ children }: StoreProps) => {
  const storeRef = useRef<AuthStoreApi | null>(null);
  if (storeRef.current === null) storeRef.current = createAuthStore();

  return <AuthStoreContext.Provider value={storeRef.current}>{children}</AuthStoreContext.Provider>;
};

const useAuthStore = <T,>(selector: (state: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);
  if (!authStoreContext) throw new Error('useAuthStore must be used within AuthStoreProvider');

  return useStore(authStoreContext, selector);
};

export const useAuthState = <T,>(selector: (state: AuthStoreState) => T): T => {
  return useAuthStore(selector);
};

export const useAuthActions = <T,>(selector: (state: AuthStoreActions) => T): T => {
  return useAuthStore(({ actions }) => selector(actions));
};

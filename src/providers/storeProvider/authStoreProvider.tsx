'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import { createAuthStore } from '@/stores/authStore';

import type { AuthStoreActions, AuthStoreState } from '@/stores/authStore';

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

export const useAuthState = <T,>(selector: (state: AuthStoreState) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);
  if (!authStoreContext) throw new Error('useAuthState must be used within AuthStoreProvider');

  return useStore(authStoreContext, ({ user }) => selector({ user }));
};

export const useAuthActions = <T,>(selector: (state: AuthStoreActions) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);
  if (!authStoreContext) throw new Error('useAuthActions must be used within AuthStoreProvider');

  return useStore(authStoreContext, ({ actions }) => selector(actions));
};

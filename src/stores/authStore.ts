import { createStore } from 'zustand/vanilla';

import { isUserType } from '@/utils/isUserType';

import type { UserType } from '@/types/auth.type';

export type AuthStoreState = {
  user: UserType | null;
};

export type AuthStoreActions = {
  login: (user: UserType) => void;
  logout: () => void;
  checkLogin: () => boolean;
  syncAuth: () => void;
};

export type AuthStore = AuthStoreState & {
  actions: AuthStoreActions;
};

const defaultInitState: AuthStoreState = {
  user: null,
};

export const createAuthStore = (initState: AuthStoreState = defaultInitState) => {
  return createStore<AuthStore>()((set, get) => ({
    ...initState,
    actions: {
      login: (user: UserType) => {
        sessionStorage.setItem('word-chain', JSON.stringify(user));
        set({ user });
      },
      logout: () => {
        sessionStorage.removeItem('word-chain');
        set({ user: null });
      },
      checkLogin: () => {
        const data = sessionStorage.getItem('word-chain');
        if (!data) return false;

        const parsedData = JSON.parse(data);
        if (isUserType(parsedData)) {
          set({ user: parsedData });
          return true;
        }

        if (get().user) {
          sessionStorage.setItem('word-chain', JSON.stringify(get().user));
          return true;
        }

        return false;
      },
      syncAuth: () => {
        const data = sessionStorage.getItem('word-chain');
        if (data) {
          const user = JSON.parse(data);
          if (isUserType(user)) set({ user });
          else set({ user: null });
        } else {
          set({ user: null });
        }
      },
    },
  }));
};

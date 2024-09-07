import { create } from 'zustand';

import type { UserType } from '@/types/auth.type';

interface Actions {
  login: (user: UserType) => void;
  logout: () => void;
  checkLogin: () => boolean;
  syncAuth: () => void;
}

interface Store {
  user: UserType | null;
  actions: Actions;
}

export const authStore = create<Store>((set, get) => ({
  user: null,
  actions: {
    login: (user: UserType) => {
      sessionStorage.setItem('word-chain', JSON.stringify(user));
      set({ user });
    },
    logout: () => {
      sessionStorage.removeItem('word-chain');
      set({ user: null });
    },
    checkLogin: () => !!get().user,
    syncAuth: () => {
      const data = sessionStorage.getItem('word-chain');
      if (data) {
        const user = JSON.parse(data);
        set({ user });
      } else {
        set({ user: null });
      }
    },
  },
}));

export const useAuthState = () => authStore(({ user }) => user);
export const useAuthActions = () => authStore(({ actions }) => actions);

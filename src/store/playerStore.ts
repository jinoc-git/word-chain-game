import { create } from 'zustand';

import { socket } from '@/socket/socket';

import type { PlayerType } from '@/hooks/usePlayer';

interface Actions {
  initPlayer: (users: PlayerType[]) => void;
  playerObserver: () => void;
  resetPlayerAndOffObserver: () => void;
}

interface Store {
  curPlayer: PlayerType[];
  actions: Actions;
}

export const playerStore = create<Store>((set, get) => ({
  curPlayer: [],
  actions: {
    initPlayer: (users: PlayerType[]) => {
      set({ curPlayer: users });
    },
    playerObserver: () => {
      console.log('observer start');
      socket.on('newUser', (users: PlayerType[]) => {
        console.log('observer', users);
        set({ curPlayer: users });
      });
    },
    resetPlayerAndOffObserver: () => {
      console.log('reset observer');
      socket.off('newUser');
      set({ curPlayer: [] });
    },
  },
}));

export const usePlayerState = () => playerStore(({ curPlayer }) => curPlayer);
export const usePlayerActions = () => playerStore(({ actions }) => actions);

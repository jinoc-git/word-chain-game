import { create } from 'zustand';

import { socket } from '@/socket/socket';

import type { PlayerType } from '@/hooks/usePlayer';

export interface QuitGameArgs {
  roomId: string;
  userId: string;
}

interface Actions {
  initPlayer: (users: PlayerType[]) => void;
  playerObserver: () => void;
  quitGameAndOffObserver: (args: QuitGameArgs) => void;
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
      socket.on('updateUser', (users: PlayerType[]) => {
        set({ curPlayer: users });
      });
    },
    quitGameAndOffObserver: (args: QuitGameArgs) => {
      socket.emit('quitGame', args);
      socket.off('updateUser');
      set({ curPlayer: [] });
    },
  },
}));

export const usePlayerState = () => playerStore(({ curPlayer }) => curPlayer);
export const usePlayerActions = () => playerStore(({ actions }) => actions);

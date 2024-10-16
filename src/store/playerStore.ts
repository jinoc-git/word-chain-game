import { create } from 'zustand';

import { socket } from '@/socket/socket';

import type { UserType } from '@/types/auth.type';

export interface PlayerType {
  socketId: string;
  userId: string;
  nickname: string;
  isRoomChief: boolean;
}

export interface QuitGameArgs {
  roomId: string;
  userId: string;
}

interface Actions {
  initPlayer: (users: PlayerType[]) => void;
  playerObserver: () => void;
  quitGameAndOffObserver: (args: QuitGameArgs) => void;
  isRoomChief: (user: UserType) => boolean;
}

interface Store {
  curPlayers: PlayerType[];
  actions: Actions;
}

export const playerStore = create<Store>((set, get) => ({
  curPlayers: [],
  actions: {
    initPlayer: (users) => {
      set({ curPlayers: users });
    },
    playerObserver: () => {
      socket.on('updateUser', (users) => {
        set({ curPlayers: users });
      });
    },
    quitGameAndOffObserver: (args) => {
      socket.emit('quitGame', args);
      socket.off('updateUser');
      set({ curPlayers: [] });
    },
    isRoomChief: (user) => {
      const curPlayers = get().curPlayers;
      const roomChief = curPlayers.find(({ isRoomChief }) => isRoomChief === true);

      return roomChief?.userId === user.id;
    },
  },
}));

export const usePlayerState = () => playerStore(({ curPlayers }) => curPlayers);
export const usePlayerActions = () => playerStore(({ actions }) => actions);

import { create } from 'zustand';

import { socket } from '@/socket/socket';

import type { UserType } from '@/types/auth.type';
import type { Room } from '@/types/server.type';

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
  initPlayer: (players: PlayerType[]) => void;
  playerObserver: () => void;
  quitGameAndOffObserver: (args: QuitGameArgs) => void;
  isRoomChief: (player: UserType) => boolean;
}

interface Store {
  curPlayers: PlayerType[];
  actions: Actions;
}

export const playerStore = create<Store>((set, get) => ({
  curPlayers: [],
  actions: {
    initPlayer: (players) => {
      set({ curPlayers: players });
    },
    playerObserver: () => {
      socket.on('updateUser', (room: Room) => {
        set({ curPlayers: room.players });
      });
    },
    quitGameAndOffObserver: (args) => {
      socket.emit('quitGame', args);
      socket.off('updateUser');
      set({ curPlayers: [] });
    },
    isRoomChief: (player) => {
      const curPlayers = get().curPlayers;
      const roomChief = curPlayers.find(({ isRoomChief }) => isRoomChief === true);

      return roomChief?.userId === player.id;
    },
  },
}));

export const usePlayerState = () => playerStore(({ curPlayers }) => curPlayers);
export const usePlayerActions = () => playerStore(({ actions }) => actions);

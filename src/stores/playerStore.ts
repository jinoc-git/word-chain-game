import { createStore } from 'zustand/vanilla';

import { socket } from '@/socket/socket';

import type { UserType } from '@/types/auth.type';
import type { Room } from '@/types/server.type';

export type PlayerType = {
  socketId: string;
  userId: string;
  nickname: string;
  isRoomChief: boolean;
};

export type PlayerStoreState = {
  curPlayers: PlayerType[];
};

export type QuitGameArgs = {
  roomId: string;
  userId: string;
};

export type PlayerStoreActions = {
  initPlayer: (players: PlayerType[]) => void;
  playerObserver: () => void;
  quitGameAndOffObserver: (args: QuitGameArgs) => void;
  isRoomChief: (player: UserType) => boolean;
};

export type PlayerStore = PlayerStoreState & {
  actions: PlayerStoreActions;
};

const defaultInitState: PlayerStoreState = {
  curPlayers: [],
};

export const createPlayerStore = (initState: PlayerStoreState = defaultInitState) => {
  return createStore<PlayerStore>()((set, get) => ({
    ...initState,
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
};

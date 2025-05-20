import { createStore } from 'zustand/vanilla';

import { createClient } from '@/utils/supabase/client';

import type { UserType } from '@/types/auth.type';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export type PlayerType = {
  socketId: string;
  userId: string;
  nickname: string;
  isRoomChief: boolean;
};

type ObserverCallbackArgs = RealtimePostgresChangesPayload<{}>;

export type PlayerStoreState = {
  curPlayers: PlayerType[];
};

export type QuitGameArgs = {
  roomId: string;
  userId: string;
};

export type PlayerStoreActions = {
  initPlayer: (players: PlayerType[]) => void;
  playerObserver: (roomId: string) => void;
  quitGameAndOffObserver: (args: QuitGameArgs) => void;
  isRoomChief: (player: UserType) => boolean;
  observerCallback: (payload: ObserverCallbackArgs) => void;
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
      observerCallback: (payload) => {
        console.log(payload);
      },
      playerObserver: (roomId: string) => {
        const supabase = createClient();
        const channel = supabase
          .channel('room_participants')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'room_participants',
              filter: `room_id=eq.${roomId}`,
            },
            get().actions.observerCallback,
          )
          .subscribe();
      },
      quitGameAndOffObserver: (args) => {
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

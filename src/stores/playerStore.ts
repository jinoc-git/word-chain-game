import { createStore } from 'zustand/vanilla';

import { createClient } from '@/utils/supabase/client';

import type { UserType } from '@/types/auth.type';
import type { RoomParticipant } from '@/types/supabase';
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type ObserverCallbackArgs = RealtimePostgresChangesPayload<RoomParticipant>;
//  {
//   commit_timestamp: '2025-06-04T10:41:09.434Z',
//   errors: null,
//   eventType: 'UPDATE',
//   new: {
//     id: '4de4b4c2-1607-415c-a9df-f7fbe8d91ae7',
//     is_room_chief: false,
//     joined_at: '2025-06-03T16:34:41.207248+00:00',
//     nickname: '몰랑',
//     player_id: '961aef8c-cd55-42db-92d3-4880ae4f1606',
//     room_id: 'NVTUJY',
//     turn_order: 1,
//     updated_at: '2025-06-03T16:34:41.207248+00:00',
//   },
//   old: { id: '4de4b4c2-1607-415c-a9df-f7fbe8d91ae7' },
//   schema: 'public',
//   table: 'room_participants',
// };

export type PlayerStoreState = {
  curPlayers: RoomParticipant[];
};

export type QuitRoomArgs = {
  userId: string;
};

export type PlayerStoreActions = {
  initPlayer: (roomCode: string) => Promise<void>;
  playerObserver: (roomCode: string) => Promise<RealtimeChannel>;
  quitRoom: (args: QuitRoomArgs) => Promise<void>;
  isRoomChief: (player: UserType) => boolean;
  observerCallback: (payload: ObserverCallbackArgs) => void;
};

export type PlayerStore = {
  state: PlayerStoreState;
  actions: PlayerStoreActions;
};

const defaultInitState: PlayerStoreState = {
  curPlayers: [],
};

export const createPlayerStore = (initState: PlayerStoreState = defaultInitState) => {
  return createStore<PlayerStore>()((set, get) => ({
    state: initState,
    actions: {
      initPlayer: async (roomCode: string) => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('room_participants')
          .select('*')
          .eq('room_code', roomCode);

        if (error) {
          set(({ state }) => ({ state: { ...state, curPlayers: [] } }));
        } else {
          console.log('result', data);
          set(({ state }) => ({ state: { ...state, curPlayers: data } }));
        }
      },
      observerCallback: (payload) => {
        console.log(payload);
        // 게임 나갔을 때 연결 끊고 row 삭제해야함
        const players = get().state.curPlayers;
        const newPlayer = payload?.new;
        if (newPlayer && 'id' in newPlayer) players.push(newPlayer);

        set(({ state }) => ({ state: { ...state, curPlayers: players } }));
      },
      playerObserver: async (roomCode: string) => {
        const initPlayer = get().actions.initPlayer;
        await initPlayer(roomCode);

        const supabase = createClient();
        const channel = supabase
          .channel('room_participants')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'room_participants',
              filter: `room_id=eq.${roomCode}`,
            },
            get().actions.observerCallback,
          )
          .subscribe();

        return channel;
      },
      quitRoom: async ({ userId }) => {
        const supabase = createClient();
        const { error } = await supabase.from('room_participants').delete().eq('player_id', userId);

        set({ state: { curPlayers: [] } });
      },
      isRoomChief: (player) => {
        const curPlayers = get().state.curPlayers;
        const roomChief = curPlayers.find(({ is_room_chief }) => is_room_chief === true);

        return roomChief?.player_id === player.id;
      },
    },
  }));
};

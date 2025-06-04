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

export type QuitGameArgs = {
  roomId: string;
  userId: string;
};

export type PlayerStoreActions = {
  initPlayer: (players: RoomParticipant[]) => void;
  playerObserver: (roomId: string) => RealtimeChannel;
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
        // 변경사항 감지하여 추가해야함, 게임 나갔을 때 연결 끊고 row 삭제해야함
        console.log(payload);
        const newPlayer = payload.new;
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

        return channel;
      },
      quitGameAndOffObserver: (args) => {
        set({ curPlayers: [] });
      },
      isRoomChief: (player) => {
        const curPlayers = get().curPlayers;
        const roomChief = curPlayers.find(({ is_room_chief }) => is_room_chief === true);

        return roomChief?.player_id === player.id;
      },
    },
  }));
};

'use client';

import React from 'react';

import { Chip } from '@nextui-org/react';

import { useAuthState } from '@/providers/storeProvider/authStoreProvider';
import { usePlayerActions, usePlayerState } from '@/providers/storeProvider/playerStoreProvider';

import type { RealtimeChannel } from '@supabase/supabase-js';

interface Props {
  roomCode: string;
}
// NVTUJY
const Players = ({ roomCode }: Props) => {
  const user = useAuthState((state) => state.user);
  const curPlayers = usePlayerState((state) => state.curPlayers);
  const playerObserver = usePlayerActions((actions) => actions.playerObserver);
  const quitRoom = usePlayerActions((actions) => actions.quitRoom);

  const channelRef = React.useRef<null | RealtimeChannel>(null);

  React.useEffect(() => {
    playerObserver(roomCode).then((channel) => (channelRef.current = channel));
  }, []);

  React.useEffect(() => {
    return () => {
      if (!user || !channelRef.current) return;

      channelRef.current.unsubscribe();
      quitRoom({ userId: user.id });
    };
  }, []);

  return (
    <section className="w-full flex flex-wrap gap-2">
      {curPlayers.map(({ nickname, player_id }, idx) => {
        return (
          <Chip
            key={`${idx + 1}player`}
            size="sm"
            radius="sm"
            color="primary"
            data-testid={player_id}
          >
            {nickname}
          </Chip>
        );
      })}
    </section>
  );
};

export default Players;

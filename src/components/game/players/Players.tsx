'use client';

import React from 'react';

import { Chip } from '@nextui-org/react';

import { usePlayerActions, usePlayerState } from '@/providers/storeProvider/playerStoreProvider';

import type { RealtimeChannel } from '@supabase/supabase-js';

interface Props {
  roomId: string;
}

const Players = ({ roomId }: Props) => {
  const curPlayers = usePlayerState((state) => state.curPlayers);
  const playerObserver = usePlayerActions((actions) => actions.playerObserver);

  React.useEffect(() => {
    let channel: RealtimeChannel | null = null;
    playerObserver(roomId).then((newChannel) => (channel = newChannel));

    return () => {
      if (channel) channel.unsubscribe();
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

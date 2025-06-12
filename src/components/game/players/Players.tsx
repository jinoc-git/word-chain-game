'use client';

import React from 'react';

import { Chip } from '@nextui-org/react';

import { useAuthState } from '@/providers/storeProvider/authStoreProvider';
import { usePlayerActions, usePlayerState } from '@/providers/storeProvider/playerStoreProvider';

interface Props {
  roomCode: string;
}
// NVTUJY
const Players = ({ roomCode }: Props) => {
  const user = useAuthState((state) => state.user);
  const curPlayers = usePlayerState((state) => state.curPlayers);
  const channel = usePlayerState((state) => state.channel);
  const playerObserver = usePlayerActions((actions) => actions.playerObserver);
  const quitRoom = usePlayerActions((actions) => actions.quitRoom);

  React.useEffect(() => {
    playerObserver(roomCode);
  }, []);

  // 개선 필요
  const [flag, setFlag] = React.useState(false);
  React.useEffect(() => {
    return () => {
      if (!user) return;
      if (!flag) {
        if (channel) setFlag(true);
        return;
      }
      if (channel) {
        console.log('un');
        channel.unsubscribe();
        quitRoom({ userId: user.id });
      }
    };
  }, [flag, channel]);
  console.log('all', curPlayers, flag, channel);

  return (
    <section className="w-full flex flex-wrap gap-2">
      {curPlayers?.map(({ nickname, player_id }, idx) => {
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

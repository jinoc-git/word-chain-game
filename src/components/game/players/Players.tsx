'use client';

import React from 'react';

import { Chip } from '@nextui-org/react';

import { usePlayerActions, usePlayerState } from '@/stores/playerStore';

const Players = () => {
  const curPlayers = usePlayerState();
  const { playerObserver } = usePlayerActions();

  React.useEffect(() => {
    playerObserver();
  }, []);

  return (
    <section className="w-full flex flex-wrap gap-2">
      {curPlayers.map(({ nickname, userId }, idx) => {
        return (
          <Chip key={`${idx + 1}player`} size="sm" radius="sm" color="primary" data-testid={userId}>
            {nickname}
          </Chip>
        );
      })}
    </section>
  );
};

export default Players;

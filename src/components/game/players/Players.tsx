'use client';

import React from 'react';

import { Chip } from '@nextui-org/react';

import { usePlayerActions, usePlayerState } from '@/store/playerStore';

export const mockPlayers = [
  { nickname: 'abcdef', id: '1' },
  { nickname: 'fedcba', id: '2' },
  { nickname: 'bcdefa', id: '3' },
  { nickname: 'cdefab', id: '4' },
  { nickname: 'defabc', id: '5' },
  { nickname: 'efabcd', id: '6' },
  { nickname: 'fabcde', id: '7' },
  { nickname: 'fabcde', id: '8' },
  { nickname: 'fabcde', id: '9' },
  { nickname: 'fabcde', id: '10' },
  { nickname: 'fabcde', id: '11' },
];

const Players = () => {
  const curPlayers = usePlayerState();
  const { playerObserver } = usePlayerActions();
  console.log('players', curPlayers);
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

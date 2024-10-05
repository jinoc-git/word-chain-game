'use client';

import React from 'react';

import { Chip } from '@nextui-org/react';

import useScoket from '@/hooks/useSocket';

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
  const { isConnected, transport } = useScoket();
  console.log(isConnected, transport);
  return (
    <section className="w-full flex flex-wrap gap-2">
      {mockPlayers.map(({ nickname, id }, idx) => {
        return (
          <Chip key={`${idx + 1}player`} size="sm" radius="sm" color="primary" data-testid={id}>
            {nickname}
          </Chip>
        );
      })}
    </section>
  );
};

export default Players;

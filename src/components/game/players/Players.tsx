'use client';

import React from 'react';

import { Avatar } from '@nextui-org/react';

const mockPlayers = [
  'abcdef',
  'fedcba',
  'bcdefa',
  'cdefab',
  'defabc',
  'efabcd',
  'fabcde',
  'fabcde',
  'fabcde',
  'fabcde',
  'fabcde',
  'fabcde',
  'fabcde',
];

const Players = () => {
  return (
    <section className="w-full flex flex-wrap gap-2">
      {mockPlayers.map((name, idx) => {
        return (
          <Avatar key={`${idx + 1}player`} name={name} size="sm" radius="md" color="primary" />
        );
      })}
    </section>
  );
};

export default Players;

'use client';

import React from 'react';

import { Chip } from '@nextui-org/react';

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
];

const Players = () => {
  return (
    <section className="w-full flex flex-wrap gap-2">
      {mockPlayers.map((name, idx) => {
        return (
          <Chip key={`${idx + 1}player`} size="sm" radius="sm" color="primary">
            {name}
          </Chip>
        );
      })}
    </section>
  );
};

export default Players;

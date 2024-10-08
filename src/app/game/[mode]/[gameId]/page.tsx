'use client';

import React from 'react';

import Players from '@/components/game/players/Players';
import PlayZone from '@/components/game/playZone/PlayZone';
import useSocket from '@/hooks/useSocket';

const Game = () => {
  const { isConnected, transport } = useSocket();
  console.log(isConnected, transport);

  return (
    <div className="main-layout h-full pt-[72px] flexCol gap-4">
      <Players />
      <PlayZone />
    </div>
  );
};

export default Game;

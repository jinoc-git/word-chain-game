'use client';

import React from 'react';

import { GAME_PLAYING_TEXT, GAME_WAITING_TEXT } from '@/constants/gameStateText';
import { useCountState } from '@/providers/storeProvider/countStoreProvider';
import { useGameState } from '@/providers/storeProvider/gameStoreProvider';

const GameStateArea = () => {
  const isGameStarted = useGameState((state) => state.gameState);
  const count = useCountState((state) => state.count);

  return (
    <div className="w-full flex-box py-6 flex-col gap-2">
      <p className="font-bold text-xl text-yellow-600">
        {isGameStarted ? GAME_PLAYING_TEXT : GAME_WAITING_TEXT}
      </p>
      <p className="font-bold text-xl">{count}</p>
    </div>
  );
};

export default GameStateArea;

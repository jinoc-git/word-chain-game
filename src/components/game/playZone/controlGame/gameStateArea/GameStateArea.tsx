'use client';

import React from 'react';

import { GAME_PLAYING_TEXT, GAME_WAITING_TEXT } from '@/constants/gameStateText';
import useCountDown from '@/hooks/useCountDown';
import { useGameState } from '@/providers/storeProvider/gameStoreProvider';

const GameStateArea = () => {
  const isGameStarted = useGameState((state) => state.gameState);
  const { count } = useCountDown();

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

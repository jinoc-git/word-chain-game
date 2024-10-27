'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { useParams } from 'next/navigation';

import useGame from '@/hooks/useGame';

const ControlGame = () => {
  const { isGameStarted, handleGameState } = useGame();
  const { gameId } = useParams<{ mode: string; gameId: string }>();

  return (
    <div className="flex justify-around w-full mt-[100px]">
      <Button
        color="primary"
        isDisabled={isGameStarted}
        onClick={() => handleGameState(true, gameId)}
      >
        게임 시작
      </Button>
      <Button
        color="primary"
        isDisabled={!isGameStarted}
        onClick={() => handleGameState(false, gameId)}
      >
        게임 중단
      </Button>
    </div>
  );
};

export default ControlGame;

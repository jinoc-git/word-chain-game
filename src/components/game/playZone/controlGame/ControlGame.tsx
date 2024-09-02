'use client';

import React from 'react';

import { Button } from '@nextui-org/button';

import useGame from '@/hooks/useGame';

const ControlGame = () => {
  const { isGameStarted, handleGameState } = useGame();

  return (
    <div className="flex justify-around w-full mt-[100px]">
      <Button color="primary" isDisabled={isGameStarted} onClick={() => handleGameState('start')}>
        게임 시작
      </Button>
      <Button color="primary" isDisabled={!isGameStarted} onClick={() => handleGameState('stop')}>
        게임 중단
      </Button>
    </div>
  );
};

export default ControlGame;

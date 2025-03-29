'use client';

import React from 'react';

import { Button } from '@nextui-org/button';

interface Props {
  isGameStarted: boolean;
  handleGameStateButton: (state: boolean) => Promise<void>;
}

const GameStateButtonArea = ({ isGameStarted, handleGameStateButton }: Props) => {
  return (
    <div className="flex justify-around w-full mt-[100px]">
      <Button
        color="primary"
        isDisabled={isGameStarted}
        onClick={() => handleGameStateButton(true)}
      >
        게임 시작
      </Button>
      <Button
        color="primary"
        isDisabled={!isGameStarted}
        onClick={() => handleGameStateButton(false)}
      >
        게임 중단
      </Button>
    </div>
  );
};

export default React.memo(GameStateButtonArea);

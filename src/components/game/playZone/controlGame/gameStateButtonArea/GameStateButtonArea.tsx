'use client';

import React from 'react';

import { Button } from '@nextui-org/button';

import { useGameState } from '@/providers/storeProvider/gameStoreProvider';

interface Props {
  handleGameStateButton: (state: boolean) => void | Promise<void>;
}

const GameStateButtonArea = ({ handleGameStateButton }: Props) => {
  const isGameStarted = useGameState((state) => state.gameState);

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
        게임 종료
      </Button>
    </div>
  );
};

export default React.memo(GameStateButtonArea);

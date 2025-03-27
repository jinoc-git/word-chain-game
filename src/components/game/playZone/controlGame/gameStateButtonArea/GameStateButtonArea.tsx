import React from 'react';

import { Button } from '@nextui-org/button';
import { useParams } from 'next/navigation';

import useGame from '@/hooks/useGame';

interface Props {
  startCount: () => void;
}

const GameStateButtonArea = ({ startCount }: Props) => {
  const { mode, gameId } = useParams<{ mode: string; gameId: string }>();
  const { isGameStarted, handleGameState } = useGame();

  const startGame = async () => {
    if (mode === 'multi') {
      await handleGameState(true, gameId);
    }

    startCount();
  };

  return (
    <div className="flex justify-around w-full mt-[100px]">
      <Button color="primary" isDisabled={isGameStarted} onClick={startGame}>
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

export default React.memo(GameStateButtonArea);

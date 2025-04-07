import React from 'react';

import { useCountActions, useCountState } from '@/providers/storeProvider/countStoreProvider';
import { useGameActions, useGameState } from '@/providers/storeProvider/gameStoreProvider';

const useCountDown = () => {
  const { count, isActiveCount } = useCountState((state) => state);
  const { gameState, isWaitingTurn } = useGameState((state) => state);

  const { endGame, setIsWaitingTurn } = useGameActions((actions) => actions);
  const { endCount, resetCount, startCount } = useCountActions((actions) => actions);

  React.useEffect(() => {
    if (count <= 0) {
      endGame();
      setIsWaitingTurn(true);
      endCount();
    }
  }, [count]);

  React.useEffect(() => {
    if (gameState) {
      resetCount();
      startCount();
    }
  }, [gameState, isWaitingTurn]);

  return { count, isActiveCount };
};

export default useCountDown;

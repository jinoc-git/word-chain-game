import { useEffect } from 'react';

import { useCountActions, useCountState } from '@/providers/storeProvider/countStoreProvider';
import { useGameActions, useGameState } from '@/providers/storeProvider/gameStoreProvider';

const useCountDown = () => {
  const count = useCountState((state) => state.count);
  const { gameState, isWaitingTurn } = useGameState((state) => state);

  const { endGame, setIsWaitingTurn } = useGameActions((actions) => actions);
  const { endCount, resetCount, startCount } = useCountActions((actions) => actions);

  useEffect(() => {
    if (count <= 0) {
      endGame();
      setIsWaitingTurn(true);
      endCount();
    }
  }, [count]);

  useEffect(() => {
    if (gameState) {
      resetCount();
      startCount();
    } else {
      endCount();
    }
  }, [gameState, isWaitingTurn]);

  return { count };
};

export default useCountDown;

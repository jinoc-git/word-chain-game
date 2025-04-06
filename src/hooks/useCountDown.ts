import React from 'react';

import { useCountActions, useCountState } from '@/providers/storeProvider/countStoreProvider';
import { useGameActions } from '@/providers/storeProvider/gameStoreProvider';

const useCountDown = () => {
  const { count, isActiveCount } = useCountState((state) => state);

  const { endGame, setIsWaitingTurn } = useGameActions((actions) => actions);
  const endCount = useCountActions((actions) => actions.endCount);

  React.useEffect(() => {
    if (count <= 0) {
      endGame();
      setIsWaitingTurn(true);
      endCount();
    }
  }, [count]);

  return { count, isActiveCount };
};

export default useCountDown;

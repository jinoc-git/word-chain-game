import React from 'react';

import { useGameActions } from '@/providers/storeProvider/gameStoreProvider';

const useCountDown = (initialCount: number) => {
  const [count, setCount] = React.useState(initialCount);
  const [isActive, setIsActive] = React.useState(false);

  const { endGame, setIsWaitingTurn } = useGameActions((actions) => actions);

  React.useEffect(() => {
    if (!isActive || count <= 0) return;
    const timeoutId = setTimeout(() => setCount((prev) => prev - 1), 1000);

    return () => clearTimeout(timeoutId);
  }, [isActive, count]);

  React.useEffect(() => {
    if (count <= 0) {
      setIsActive(false);
      setCount(initialCount);
      endGame();
      setIsWaitingTurn(true);
    }
  }, [count]);

  const startCount = React.useCallback(() => setIsActive(true), []);

  const resetAndStartCount = React.useCallback(() => {
    if (isActive) setCount(initialCount);
    else {
      setIsActive(true);
      setCount(initialCount);
    }
  }, [isActive]);

  const stopCount = React.useCallback(() => {
    setCount(initialCount);
    setIsActive(false);
    endGame();
  }, []);

  return { count, startCount, resetAndStartCount, stopCount };
};

export default useCountDown;

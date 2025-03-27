import React from 'react';

const useCountDown = (initialCount: number) => {
  const [count, setCount] = React.useState(initialCount);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    if (!isActive || count <= 0) return;
    const timeoutId = setTimeout(() => setCount((prev) => prev - 1), 1000);

    return () => clearTimeout(timeoutId);
  }, [isActive, count]);

  React.useEffect(() => {
    if (count <= 0) setIsActive(false);
  }, [count]);

  const startCount = () => setIsActive(true);

  const resetAndStartCount = () => {
    if (isActive) setCount(initialCount);
    else {
      setIsActive(true);
      setCount(initialCount);
    }
  };

  const stopCount = React.useCallback(() => {
    setCount(initialCount);
    setIsActive(false);
  }, []);

  return { count, startCount, resetAndStartCount, stopCount };
};

export default useCountDown;

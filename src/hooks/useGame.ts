import React from 'react';

const useGame = () => {
  const [isGameStarted, setIsGameStarted] = React.useState(false);

  const handleGameState = async (state: 'start' | 'stop') => {
    if (state === 'start') {
      setIsGameStarted(true);
    } else {
      setIsGameStarted(false);
    }
  };

  return { isGameStarted, handleGameState };
};

export default useGame;

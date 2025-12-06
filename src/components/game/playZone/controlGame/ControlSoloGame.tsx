'use client';

import React from 'react';

import useGame from '@/hooks/useGame';

import GameStateArea from './gameStateArea/GameStateArea';
import GameStateButtonArea from './gameStateButtonArea/GameStateButtonArea';

const ControlSoloGame = () => {
  const { handleGameState } = useGame();

  const handleGameStateButton = React.useCallback((state: boolean) => {
    handleGameState(state);
  }, []);

  return (
    <>
      <GameStateArea />
      <GameStateButtonArea handleGameStateButton={handleGameStateButton} />
    </>
  );
};

export default ControlSoloGame;

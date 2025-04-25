'use client';

import React from 'react';

import useSoloGame from '@/hooks/useSoloGame';

import GameStateArea from './gameStateArea/GameStateArea';
import GameStateButtonArea from './gameStateButtonArea/GameStateButtonArea';

const ControlSoloGame = () => {
  const { handleGameState } = useSoloGame();

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

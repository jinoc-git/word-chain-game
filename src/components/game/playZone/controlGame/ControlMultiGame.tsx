'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import { useAuthState } from '@/providers/storeProvider/authStoreProvider';
import { useCountState } from '@/providers/storeProvider/countStoreProvider';
import { useGameState } from '@/providers/storeProvider/gameStoreProvider';
import { usePlayerActions } from '@/providers/storeProvider/playerStoreProvider';

import GameStateArea from './gameStateArea/GameStateArea';
import GameStateButtonArea from './gameStateButtonArea/GameStateButtonArea';

const ControlMultiGame = () => {
  const { mode, gameId } = useParams<{ mode: string; gameId: string }>();

  const user = useAuthState((state) => state.user);
  const isGameStarted = useGameState((state) => state.gameState);
  const { isActiveCount } = useCountState((state) => state);
  const isRoomChief = usePlayerActions((actions) => actions.isRoomChief);

  const handleGameStateButton = React.useCallback(async (state: boolean) => {
    // await handleGameState(state);
  }, []);

  const playerIsRoomChief = user !== null && isRoomChief(user);
  const shouldRenderButtonArea = mode === 'solo' || playerIsRoomChief;

  return (
    <>
      <GameStateArea />
      {shouldRenderButtonArea && (
        <GameStateButtonArea handleGameStateButton={handleGameStateButton} />
      )}
    </>
  );
};

export default ControlMultiGame;

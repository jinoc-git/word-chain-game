'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import useMultiGame from '@/hooks/useMultiGame';
import { useAuthState } from '@/providers/storeProvider/authStoreProvider';
import { usePlayerActions } from '@/providers/storeProvider/playerStoreProvider';

import GameStateArea from './gameStateArea/GameStateArea';
import GameStateButtonArea from './gameStateButtonArea/GameStateButtonArea';

const ControlMultiGame = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const user = useAuthState((state) => state.user);
  const isRoomChief = usePlayerActions((actions) => actions.isRoomChief);
  const { handleMultiGameState } = useMultiGame(gameId);

  const handleGameStateButton = async (state: boolean) => {
    if (!user) return;
    await handleMultiGameState(state);
  };

  const playerIsRoomChief = user !== null && isRoomChief(user);

  return (
    <>
      <GameStateArea />
      {playerIsRoomChief && <GameStateButtonArea handleGameStateButton={handleGameStateButton} />}
    </>
  );
};

export default ControlMultiGame;

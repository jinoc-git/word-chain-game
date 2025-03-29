'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import useCountDown from '@/hooks/useCountDown';
import useGame from '@/hooks/useGame';
import { useAuthState } from '@/providers/storeProvider/authStoreProvider';
import { usePlayerActions } from '@/stores/playerStore';

import GameStateButtonArea from './gameStateButtonArea/GameStateButtonArea';

const ControlGame = () => {
  const { mode, gameId } = useParams<{ mode: string; gameId: string }>();

  const user = useAuthState((store) => store.user);
  const { isGameStarted, handleGameState } = useGame(mode);
  const { isRoomChief } = usePlayerActions();

  const { count, startCount, stopCount } = useCountDown(10);

  const handleGameStateButton = async (state: boolean) => {
    await handleGameState(state, gameId);

    if (state) startCount();
    else stopCount();
  };

  const playerIsRoomChief = user !== null && isRoomChief(user);
  const shouldRenderButtonArea = mode === 'solo' || playerIsRoomChief;

  return (
    <>
      <div className="w-full flex-box py-6">
        <p className="font-bold text-xl">{count}</p>
      </div>
      {shouldRenderButtonArea && (
        <GameStateButtonArea
          isGameStarted={isGameStarted}
          handleGameStateButton={handleGameStateButton}
        />
      )}
    </>
  );
};

export default ControlGame;

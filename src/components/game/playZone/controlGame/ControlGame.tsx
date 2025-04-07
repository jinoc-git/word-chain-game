'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import { GAME_PLAYING_TEXT, GAME_WAITING_TEXT } from '@/constants/gameStateText';
import useCountDown from '@/hooks/useCountDown';
import useGame from '@/hooks/useGame';
import { useAuthState } from '@/providers/storeProvider/authStoreProvider';
import { useGameState } from '@/providers/storeProvider/gameStoreProvider';
import { usePlayerActions } from '@/providers/storeProvider/playerStoreProvider';

import GameStateButtonArea from './gameStateButtonArea/GameStateButtonArea';

const ControlGame = () => {
  const { mode, gameId } = useParams<{ mode: string; gameId: string }>();

  const user = useAuthState((state) => state.user);
  const isGameStarted = useGameState((state) => state.gameState);
  const { handleGameState } = useGame(mode, gameId);
  const isRoomChief = usePlayerActions((actions) => actions.isRoomChief);

  const { count, isActiveCount } = useCountDown();

  const handleGameStateButton = React.useCallback(async (state: boolean) => {
    await handleGameState(state, mode);
  }, []);

  const playerIsRoomChief = user !== null && isRoomChief(user);
  const shouldRenderButtonArea = mode === 'solo' || playerIsRoomChief;

  return (
    <>
      <div className="w-full flex-box py-6 flex-col gap-2">
        <p className="font-bold text-xl text-yellow-600">
          {isGameStarted ? GAME_PLAYING_TEXT : GAME_WAITING_TEXT}
        </p>
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

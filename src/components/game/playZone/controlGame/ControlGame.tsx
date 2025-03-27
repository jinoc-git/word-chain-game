'use client';

import React from 'react';

import useCountDown from '@/hooks/useCountDown';
import { useAuthState } from '@/store/authStore';
import { usePlayerActions } from '@/store/playerStore';

import GameStateButtonArea from './gameStateButtonArea/GameStateButtonArea';

const ControlGame = () => {
  const user = useAuthState();
  const { isRoomChief } = usePlayerActions();

  const { count, startCount } = useCountDown(10);

  const playerIsRoomChief = user !== null && isRoomChief(user);

  return (
    <>
      <div className="w-full flex-box py-6">
        <p className="font-bold text-xl">{count}</p>
      </div>
      <GameStateButtonArea startCount={startCount} />
    </>
  );
};

export default ControlGame;

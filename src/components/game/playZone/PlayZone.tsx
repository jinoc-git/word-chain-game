'use client';

import React from 'react';

import { useAuthState } from '@/store/authStore';
import { usePlayerActions } from '@/store/playerStore';

import ControlGame from './controlGame/ControlGame';
import EnterWord from './enterWord/EnterWord';
import WordList from './wordList/WordList';

const PlayZone = () => {
  const user = useAuthState();
  const { isRoomChief } = usePlayerActions();

  const playerIsRoomChief = user !== null && isRoomChief(user);

  return (
    <section className="">
      <WordList />
      <EnterWord />
      {playerIsRoomChief && <ControlGame />}
    </section>
  );
};

export default PlayZone;

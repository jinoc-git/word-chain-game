'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import ControlMultiGame from './controlGame/ControlMultiGame';
import ControlSoloGame from './controlGame/ControlSoloGame';
import EnterWord from './enterWord/EnterWord';
import WordList from './wordList/WordList';

const PlayZone = () => {
  const pathname = usePathname();
  const isSoloGame = pathname.split('/')[2] === 'solo';

  return (
    <section>
      <WordList />
      <EnterWord />
      {isSoloGame ? <ControlSoloGame /> : <ControlMultiGame />}
    </section>
  );
};

export default PlayZone;

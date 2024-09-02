'use client';

import React from 'react';

import ControlGame from './controlGame/ControlGame';
import EnterWord from './enterWord/EnterWord';
import WordList from './wordList/WordList';

const PlayZone = () => {
  return (
    <section className="">
      <WordList />
      <EnterWord />
      <ControlGame />
    </section>
  );
};

export default PlayZone;

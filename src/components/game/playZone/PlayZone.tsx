'use client';

import React from 'react';

import EnterWord from './enterWord/EnterWord';
import WordList from './wordList/WordList';

const PlayZone = () => {
  return (
    <section className=" space-y-3">
      <WordList />
      <EnterWord />
    </section>
  );
};

export default PlayZone;

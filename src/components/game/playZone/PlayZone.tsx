'use client';

import React from 'react';

import { Input } from '@nextui-org/react';

import WordList from './wordList/WordList';

const PlayZone = () => {
  return (
    <section className=" space-y-3">
      <WordList />
      <Input />
    </section>
  );
};

export default PlayZone;

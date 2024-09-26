'use client';

import React from 'react';

import { Card, CardHeader, Chip } from '@nextui-org/react';
import { uuid } from 'short-uuid';

import { useWordState } from '@/store/wordStore';

export const mockWords = ['인사동', '동생', '생필품'];

const WordList = () => {
  const words = useWordState();
  console.log('output', words);
  return (
    <Card isBlurred>
      <CardHeader className="flex items-center gap-2 h-[50px]">
        {words.map((word, idx) => {
          const isLast = mockWords.length === idx + 1;

          return (
            <Chip
              key={uuid()}
              size={isLast ? 'lg' : 'md'}
              color={isLast ? 'secondary' : 'default'}
              role="listitem"
              className={`${isLast ? 'text-lg font-semibold' : ''}`}
            >
              {word}
            </Chip>
          );
        })}
      </CardHeader>
    </Card>
  );
};

export default WordList;

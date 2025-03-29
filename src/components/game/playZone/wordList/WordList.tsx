'use client';

import React from 'react';

import { Card, CardHeader, Chip } from '@nextui-org/react';
import { uuid } from 'short-uuid';

import { useWordState } from '@/stores/wordStore';

const WordList = () => {
  const words = useWordState();

  return (
    <Card className="border">
      <CardHeader className="flex items-center gap-2 h-[50px]  ">
        {words.map((word, idx) => {
          const isLast = words.length === idx + 1;

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

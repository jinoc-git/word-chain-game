'use client';

import React from 'react';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
import type { TDecorateOptionsFn } from 'react-canvas-confetti/dist/types';

import { useFireworksActions } from '../storeProvider/fireworksStoreProvider';

const FireworksConfetti = () => {
  const onInitHandler = useFireworksActions((actions) => actions.onInitHandler);
  const decorateOptions: TDecorateOptionsFn = (originOptions) => {
    return { ...originOptions, particleCount: 100 };
  };

  return (
    <Fireworks
      onInit={({ conductor }) => onInitHandler(conductor)}
      decorateOptions={decorateOptions}
    />
  );
};

export default FireworksConfetti;

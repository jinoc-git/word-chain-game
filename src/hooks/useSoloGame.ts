import React from 'react';

import useOpenAI from './useOpenAI';

const useSoloGame = () => {
  const { handleOpenAIResponse } = useOpenAI();

  React.useEffect(() => {}, []);

  return {};
};

export default useSoloGame;

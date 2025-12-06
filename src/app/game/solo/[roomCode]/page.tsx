import React from 'react';

import ControlSoloGame from '@/components/game/playZone/controlGame/ControlSoloGame';
import SoloEnterWord from '@/components/game/playZone/enterWord/soloEnterWord';
import WordList from '@/components/game/playZone/wordList/WordList';

const SoloGame = () => {
  return (
    <section>
      <WordList />
      <SoloEnterWord />
      <ControlSoloGame />
    </section>
  );
};

export default SoloGame;

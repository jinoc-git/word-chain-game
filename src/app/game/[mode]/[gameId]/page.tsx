import React from 'react';

import Players from '@/components/game/players/Players';
import PlayZone from '@/components/game/playZone/PlayZone';

const Game = () => {
  return (
    <div className="main-layout h-full pt-[72px] flexCol gap-4">
      <Players />
      <PlayZone />
    </div>
  );
};

export default Game;

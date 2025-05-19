import React from 'react';

import { redirect } from 'next/navigation';

import Players from '@/components/game/players/Players';
import PlayZone from '@/components/game/playZone/PlayZone';
import { checkRoomCode } from '@/utils/room/room';

interface Props {
  params: Promise<{ gameId: string }>;
}

const MultiGame = async ({ params }: Props) => {
  const { gameId } = await params;
  if (!checkRoomCode(gameId)) redirect('/loby');

  return (
    <>
      <Players gameId={gameId} />
      <PlayZone />
    </>
  );
};

export default MultiGame;

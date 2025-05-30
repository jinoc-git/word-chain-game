import React from 'react';

import { redirect } from 'next/navigation';

import Players from '@/components/game/players/Players';
import PlayZone from '@/components/game/playZone/PlayZone';
import { joinRoom } from '@/lib/joinRoom';
import { checkRoomCode } from '@/utils/room/room';

interface Props {
  params: Promise<{ gameId: string }>;
}

const MultiGame = async ({ params }: Props) => {
  const { gameId } = await params;
  if (!checkRoomCode(gameId)) redirect('/loby');

  const res = await joinRoom({ roomCode: gameId });
  console.log(res);

  return (
    <>
      <Players gameId={gameId} res={res} />
      <PlayZone />
    </>
  );
};

export default MultiGame;

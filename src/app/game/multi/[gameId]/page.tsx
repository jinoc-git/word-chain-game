import React from 'react';

import { redirect } from 'next/navigation';

import Players from '@/components/game/players/Players';
import PlayZone from '@/components/game/playZone/PlayZone';
import { joinRoom } from '@/lib/apiRoute/joinRoom';
import { getCurrentPlayerId } from '@/utils/auth/aboutCookies';
import { checkRoomCode } from '@/utils/room/room';

interface Props {
  params: Promise<{ gameId: string }>;
}

const MultiGame = async ({ params }: Props) => {
  const { gameId } = await params;
  if (!checkRoomCode(gameId)) redirect('/loby');

  const playerId = await getCurrentPlayerId();
  if (!playerId) redirect('/');

  const res = await joinRoom({ roomCode: gameId, playerId });

  return (
    <>
      <Players gameId={gameId} res={res} />
      <PlayZone />
    </>
  );
};

export default MultiGame;

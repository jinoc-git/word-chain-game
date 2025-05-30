import React from 'react';

import { redirect } from 'next/navigation';

import Players from '@/components/game/players/Players';
import PlayZone from '@/components/game/playZone/PlayZone';
import { joinRoom } from '@/lib/apiRoute/joinRoom';
import { getCurrentPlayerId } from '@/utils/auth/aboutCookies';
import { checkRoomCode } from '@/utils/room/room';

interface Props {
  params: Promise<{ roomId: string }>;
}

const MultiGame = async ({ params }: Props) => {
  const { roomId } = await params;
  if (!checkRoomCode(roomId)) redirect('/loby');

  const playerId = await getCurrentPlayerId();
  if (!playerId) redirect('/');

  const res = await joinRoom({ roomId, playerId });

  return (
    <>
      <Players roomId={roomId} res={res} />
      <PlayZone />
    </>
  );
};

export default MultiGame;

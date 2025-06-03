import React from 'react';

import { redirect } from 'next/navigation';

import Players from '@/components/game/players/Players';
import PlayZone from '@/components/game/playZone/PlayZone';
import { getCurrentPlayerId } from '@/utils/auth/aboutCookies';
import { checkValidRoomIdChar } from '@/utils/room/room';

interface Props {
  params: Promise<{ roomId: string }>;
}

const MultiGame = async ({ params }: Props) => {
  const { roomId } = await params;
  if (!checkValidRoomIdChar(roomId)) redirect('/loby');

  const playerId = await getCurrentPlayerId();
  if (!playerId) redirect('/');

  return (
    <>
      <Players roomId={roomId} />
      <PlayZone />
    </>
  );
};

export default MultiGame;

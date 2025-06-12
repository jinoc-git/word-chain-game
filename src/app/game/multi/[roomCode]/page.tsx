import React from 'react';

import { redirect } from 'next/navigation';

import Players from '@/components/game/players/Players';
import PlayZone from '@/components/game/playZone/PlayZone';
import { addRoomParticipants } from '@/lib/serverActions/addRoomParticipants';
import { getCurrentPlayerId } from '@/utils/auth/aboutCookies';
import { checkValidRoomCodeChar } from '@/utils/room/room';

interface Props {
  params: Promise<{ roomCode: string }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const MultiGame = async ({ params }: Props) => {
  const { roomCode } = await params;
  if (!checkValidRoomCodeChar(roomCode)) redirect('/loby');

  const playerId = await getCurrentPlayerId();
  if (!playerId) redirect('/');

  const { data, error } = await addRoomParticipants({ playerId, roomCode });
  if (error) redirect('/loby');

  return (
    <>
      <Players roomCode={roomCode} />
      <PlayZone />
    </>
  );
};

export default MultiGame;

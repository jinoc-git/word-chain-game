import React from 'react';

import { redirect } from 'next/navigation';

import Players from '@/components/game/players/Players';
import PlayZone from '@/components/game/playZone/PlayZone';
import { addRoomParticipants } from '@/lib/serverActions/addRoomParticipants';
import { getCurrentPlayerId } from '@/utils/auth/aboutCookies';
import { checkValidRoomIdChar } from '@/utils/room/room';

interface Props {
  params: Promise<{ roomId: string }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const MultiGame = async ({ params }: Props) => {
  const { roomId } = await params;
  if (!checkValidRoomIdChar(roomId)) redirect('/loby');

  const playerId = await getCurrentPlayerId();
  if (!playerId) redirect('/');

  const { data, error } = await addRoomParticipants({ playerId, roomId });
  if (error) redirect('/loby');
  // home 버튼으로 방을 나간 후 같은 방 들어왔을 때 정상적으로 players 정보를 불러오지 못함
  console.log(data);
  return (
    <>
      <Players roomId={roomId} />
      <PlayZone />
    </>
  );
};

export default MultiGame;

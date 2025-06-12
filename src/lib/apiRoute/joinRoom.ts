import ky from 'ky';

import { JOIN_ROOM_ROUTE } from '@/constants/apiRoute';

import type { JoinRoomResponse } from '@/app/api/join/route';

export type JoinRoomArgs = {
  roomCode: string;
  playerId: string;
};

export const joinRoom = async (args: JoinRoomArgs) => {
  const res = await ky
    .post(JOIN_ROOM_ROUTE, {
      json: args,
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-store',
      },
    })
    .json<JoinRoomResponse>();

  return res;
};

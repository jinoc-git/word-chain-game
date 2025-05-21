import ky from 'ky';

import { JOIN_ROOM_ROUTE } from '@/constants/apiRoute';

import type { JoinRoomResponse } from '@/app/api/join/route';

export type JoinRoomArgs = {
  roomCode: string;
};

export const joinRoom = async (args: JoinRoomArgs) => {
  const res = await ky.post<JoinRoomResponse>(JOIN_ROOM_ROUTE, { json: args }).json();

  return res;
};

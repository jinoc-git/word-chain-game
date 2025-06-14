import ky from 'ky';

import { CREATE_ROOM_ROUTE } from '@/constants/apiRoute';

import type { CreateRoomResponse } from '@/app/api/create/route';

export type CreateRoomArgs = {
  nickname: string;
  hostId: string;
  roomCode: string;
};

export const createRoom = async (args: CreateRoomArgs) => {
  const res = await ky.post(CREATE_ROOM_ROUTE, { json: args }).json<CreateRoomResponse>();

  return res;
};

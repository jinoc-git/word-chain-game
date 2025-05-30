import ky from 'ky';

import { CREATE_ROOM_ROUTE } from '@/constants/apiRoute';

import type { CreateRoomResponse } from '@/app/api/create/route';

export type CreateRoomArgs = {
  nickname: string;
  hostId: string;
  roomId: string;
};

export const createRoom = async (args: CreateRoomArgs) => {
  const res = await ky.post<CreateRoomResponse>(CREATE_ROOM_ROUTE, { json: args }).json();

  return res;
};

import { NextResponse } from 'next/server';

import { getRoomInfo } from '@/lib/serverActions/getRoomInfo';
import { checkEnterRoom } from '@/utils/room/room';

import type { JoinRoomArgs } from '@/lib/apiRoute/joinRoom';
import type { NextRequest } from 'next/server';

export type JoinRoomResponse =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export const POST = async (request: NextRequest) => {
  const { roomId, playerId }: JoinRoomArgs = await request.json();

  // 방 코드 확인
  const room = await getRoomInfo({ roomId });
  const { success, message } = checkEnterRoom(room);
  if (success) {
    return NextResponse.json(
      {
        success: true,
        message,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      },
    );
  }

  return NextResponse.json(
    {
      success: false,
      message,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    },
  );
};

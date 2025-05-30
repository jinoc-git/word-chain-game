import { NextResponse } from 'next/server';

import type { JoinRoomArgs } from '@/lib/apiRoute/joinRoom';
import type { NextRequest } from 'next/server';

export type JoinRoomResponse =
  | {
      success: true;
      playerId: string;
    }
  | {
      success: false;
      playerId: undefined;
    };

export const POST = async (request: NextRequest) => {
  const { roomCode, playerId }: JoinRoomArgs = await request.json();

  if (playerId) {
    return NextResponse.json({
      success: true,
      playerId,
    });
  }
  return NextResponse.json({
    success: false,
    playerId,
  });
};

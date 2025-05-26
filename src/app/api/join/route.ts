import { NextResponse } from 'next/server';

import { getCurrentPlayerId } from '@/utils/auth/aboutCookies';

import type { JoinRoomArgs } from '@/lib/joinRoom';
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
  const { roomCode }: JoinRoomArgs = await request.json();

  const playerId = await getCurrentPlayerId();
  console.log(playerId);
  return NextResponse.json({
    success: true,
    playerId,
  });
};

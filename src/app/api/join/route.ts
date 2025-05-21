import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { JoinRoomArgs } from '@/lib/joinRoom';
import type { NextRequest } from 'next/server';

export type JoinRoomResponse =
  | {
      success: true;
      userId: string;
    }
  | {
      success: false;
      userId: undefined;
    };

export const POST = async (request: NextRequest) => {
  const { roomCode }: JoinRoomArgs = await request.json();

  const userId = await getCurrentUserId();

  return NextResponse.json({
    success: true,
    userId: userId,
  });
};

const getCurrentUserId = async () => {
  const cookieStore = cookies();
  const userId = cookieStore.get('wcg-user')?.value;

  return userId;
};

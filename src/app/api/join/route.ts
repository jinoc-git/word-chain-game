import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

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
  const { roomCode, playerId }: JoinRoomArgs = await request.json();

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc('join_room_atomic', {
      p_room_code: roomCode,
      p_player_id: playerId,
    });

    if (error) {
      console.error('Supabase RPC 에러:', error);
      throw new Error(error.message);
    }

    return NextResponse.json(data, {
      status: data.success ? 200 : 400,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    console.error('방 입장 실패:', error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : '방 입장에 실패했습니다.',
      },
      {
        // status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      },
    );
  }
};

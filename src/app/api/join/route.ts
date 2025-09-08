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
  const { roomCode, playerId, nickname }: JoinRoomArgs = await request.json();

  const supabase = await createClient();

  const { data: room, error: roomError } = await supabase
    .from('rooms')
    .select('*')
    .eq('room_code', roomCode)
    .single();

  if (roomError) {
    return NextResponse.json({ success: false, message: '존재하지 않는 방입니다.' });
  }
  if (room.participants.length >= room.max_players) {
    return NextResponse.json({ success: false, message: '방 인원 초과입니다.' });
  }

  const newParticipants = [...room.participants, { nickname, id: playerId }];
  const { data, error } = await supabase
    .from('rooms')
    .update({ participants: newParticipants })
    .eq('room_code', roomCode);

  if (error) {
    return NextResponse.json({ success: false, message: '방 입장 실패' });
  }

  return NextResponse.json({ success: true, message: '입장에 성공했습니다' });
};

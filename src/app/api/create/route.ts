import { NextResponse } from 'next/server';

import { type CreateRoomArgs } from '@/lib/createRoom';
import { createClient } from '@/utils/supabase/server';

import type { InsertRoom, Room } from '@/types/supabase';
import type { NextRequest } from 'next/server';

const MAX_PLAYERS = 6;

export type CreateRoomResponse =
  | {
      success: true;
      room: Room;
    }
  | {
      success: false;
      room: null;
    };

export const POST = async (request: NextRequest) => {
  const { nickname, hostId, roomId }: CreateRoomArgs = await request.json();

  const newRoom: InsertRoom = {
    host_player_id: hostId,
    room_code: roomId,
    room_name: nickname,
    max_players: MAX_PLAYERS,
  };

  const { data: room, error } = await insertRoom(newRoom);

  if (error) {
    return NextResponse.json({
      success: false,
      room,
    });
  }

  return NextResponse.json({
    success: true,
    room,
  });
};

const insertRoom = async (newRoom: InsertRoom) => {
  const supabase = await createClient();

  const res = await supabase.from('rooms').insert([newRoom]).select().single();

  return res;
};

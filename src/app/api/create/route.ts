import { NextResponse } from 'next/server';

import { type CreateRoomArgs } from '@/lib/apiRoute/createRoom';
import { addRoomParticipants } from '@/lib/serverActions/addRoomParticipants';
import { deleteRoom, insertRoom } from '@/lib/serverActions/rooms';

import type { InsertRoom, Room, RoomParticipant } from '@/types/supabase';
import type { NextRequest } from 'next/server';

const MAX_PLAYERS = 6;

export type CreateRoomResponse =
  | {
      success: true;
      room: Room;
      player: RoomParticipant;
    }
  | {
      success: false;
      room: null;
      player: null;
    };

const errorResponse: CreateRoomResponse = {
  success: false,
  room: null,
  player: null,
};

export const POST = async (request: NextRequest) => {
  const { nickname, hostId, roomCode }: CreateRoomArgs = await request.json();

  const newRoom: InsertRoom = {
    host_player_id: hostId,
    room_code: roomCode,
    room_name: nickname,
    max_players: MAX_PLAYERS,
  };

  const { data: room, error: RoomError } = await insertRoom(newRoom);
  if (RoomError) return NextResponse.json(errorResponse);

  const { data: player, error: RoomParticipantError } = await addRoomParticipants({
    playerId: hostId,
    roomCode,
  });

  if (RoomParticipantError) {
    const deleteRoomError = await deleteRoom(roomCode);
    if (deleteRoomError) console.error('방 삭제 실패');
    return NextResponse.json(errorResponse);
  }

  // 성공
  return NextResponse.json({
    success: true,
    room,
    player,
  });
};

import { createClient } from '@/utils/supabase/server';

export type AddRoomParticipantsArgs = {
  playerId: string;
  roomCode: string;
};

export const addRoomParticipants = async (args: AddRoomParticipantsArgs) => {
  const { playerId, roomCode } = args;
  const supabase = await createClient();

  const res = await supabase
    .from('room_participants')
    .insert({ player_id: playerId, room_code: roomCode })
    .select()
    .single();

  return res;
};

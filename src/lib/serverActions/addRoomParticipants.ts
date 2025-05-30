import { createClient } from '@/utils/supabase/server';

export type AddRoomParticipantsArgs = {
  playerId: string;
  roomId: string;
};

export const addRoomParticipants = async (args: AddRoomParticipantsArgs) => {
  const { playerId, roomId } = args;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('room_participants')
    .insert({ player_id: playerId, room_id: roomId });

  console.log(data);
};

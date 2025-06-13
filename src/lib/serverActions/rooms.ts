import { createClient } from '@/utils/supabase/server';

import type { InsertRoom } from '@/types/supabase';

export type CheckRoomCodeArg = {
  roomCode: string;
};

export const getRoomInfo = async ({ roomCode }: CheckRoomCodeArg) => {
  const supabase = await createClient();
  const { data } = await supabase.from('rooms').select('*').eq('room_code', roomCode).single();

  return data;
};

export const insertRoom = async (newRoom: InsertRoom) => {
  const supabase = await createClient();
  const res = await supabase.from('rooms').insert([newRoom]).select().single();

  return res;
};

export const deleteRoom = async (roomCode: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from('rooms').delete().eq('room_code', roomCode);

  return error;
};

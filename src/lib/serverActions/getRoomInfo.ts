import { createClient } from '@/utils/supabase/server';

export type CheckRoomIdArg = {
  roomId: string;
};

export const getRoomInfo = async ({ roomId }: CheckRoomIdArg) => {
  const supabase = await createClient();
  const { data } = await supabase.from('rooms').select('*').eq('room_code', roomId).single();

  return data;
};

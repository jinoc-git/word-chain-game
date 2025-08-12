'use client';

import { createClient } from '@/utils/supabase/client';

export const quitRoomWithPlayerId = async (playerId: string) => {
  const supabase = createClient();
  const { error } = await supabase.from('room_participants').delete().eq('player_id', playerId);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  } else {
    return {
      success: true,
      message: '방 나가기 성공',
    };
  }
};

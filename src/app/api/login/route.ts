import { NextResponse } from 'next/server';

import { setSessionId } from '@/utils/auth/setSessionId';
import { createClient } from '@/utils/supabase/server';

import type { Player } from '@/types/supabase';
import type { NextRequest } from 'next/server';

export type LoginResponse =
  | {
      success: true;
      sessionId: string;
      player: Player;
    }
  | {
      success: false;
      sessionId: string;
      player: null;
    };

export const POST = async (request: NextRequest) => {
  const { nickname } = await request.json();

  const sessionId = await setSessionId('session_id');
  const supabase = await createClient({
    global: {
      headers: {
        'X-Session-Id': sessionId,
      },
    },
  });

  const user = { nickname, session_id: sessionId };

  const { data: player } = await supabase
    .from('players')
    .select('*')
    .eq('session_id', sessionId)
    .single();

  if (player) {
    const { data: updatedPlayer } = await supabase
      .from('players')
      .update({ nickname })
      .eq('session_id', sessionId)
      .select()
      .single();
    return NextResponse.json({
      success: true,
      sessionId,
      player: updatedPlayer,
    });
  } else {
    const { data: newPlayer } = await supabase.from('players').insert([user]).select().single();
    if (newPlayer) {
      return NextResponse.json({
        success: true,
        sessionId,
        player: newPlayer,
      });
    }
  }

  return NextResponse.json({
    success: false,
    sessionId,
    player: null,
  });
};

import { NextResponse } from 'next/server';

import { setSessionId } from '@/utils/auth/setSessionId';
import { createClient } from '@/utils/supabase/server';

import type { Player } from '@/types/supabase';
import type { NextRequest } from 'next/server';

export type LoginResponse = {
  success: boolean;
  sessionId: string;
  player: Player | null;
};

export const POST = async (request: NextRequest) => {
  const { nickname } = await request.json();

  const sessionId = setSessionId('session_id');
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
    return NextResponse.json({
      success: true,
      sessionId,
      player,
    });
  } else {
    const { data: newPlayer } = await supabase.from('players').insert([user]).select().single();

    if (newPlayer) {
      return NextResponse.json({
        success: true,
        sessionId,
        player: newPlayer,
      });
    } else {
      return NextResponse.json({
        success: false,
        sessionId,
        player: newPlayer,
      });
    }
  }
};

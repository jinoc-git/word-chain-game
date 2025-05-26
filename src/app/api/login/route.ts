import { NextResponse } from 'next/server';

import { setCurrentPlayer, setSessionId } from '@/utils/auth/aboutCookies';
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
    const { data: updatedPlayer, error } = await supabase
      .from('players')
      .update({ nickname })
      .eq('session_id', sessionId)
      .select()
      .single();
    if (error) {
      return NextResponse.json({
        success: false,
        sessionId,
        player: null,
      });
    }

    await setCurrentPlayer({ id: updatedPlayer.id, nickname: updatedPlayer.nickname });
    return NextResponse.json({
      success: true,
      sessionId,
      player: updatedPlayer,
    });
  } else {
    const { data: newPlayer, error } = await supabase
      .from('players')
      .insert([user])
      .select()
      .single();
    if (error) {
      return NextResponse.json({
        success: false,
        sessionId,
        player: null,
      });
    }

    await setCurrentPlayer({ id: newPlayer.id, nickname: newPlayer.nickname });
    return NextResponse.json({
      success: true,
      sessionId,
      player: newPlayer,
    });
  }
};

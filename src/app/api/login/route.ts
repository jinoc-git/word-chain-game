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
    } else {
      return NextResponse.json({
        success: false,
        sessionId,
        player: newPlayer,
      });
    }
  }
};

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   {
//     global: {
//       headers: {
//         'X-Session-Id': sessionId,
//       },
//     },
//   },
// );

// // 플레이어 찾기 또는 생성
// let playerId: string;
// const { data: existingPlayer } = await supabase
//   .from('players')
//   .select('id')
//   .eq('session_id', sessionId)
//   .maybeSingle();

// if (existingPlayer) {
//   playerId = existingPlayer.id;

//   // 플레이어 정보 업데이트
//   await supabase
//     .from('players')
//     .update({
//       nickname,
//       is_online: true,
//       last_activity: new Date().toISOString(),
//     })
//     .eq('id', playerId);
// } else {
//   // 새 플레이어 생성
//   const { data: newPlayer, error: playerError } = await supabase
//     .from('players')
//     .insert({
//       nickname,
//       session_id: sessionId,
//       is_online: true,
//     })
//     .select('id')
//     .single();

//   if (playerError || !newPlayer) {
//     return NextResponse.json({ error: '플레이어 생성 실패' }, { status: 500 });
//   }

//   playerId = newPlayer.id;
// }

// Next.js API Route: app/api/join-game/route.ts
import { NextResponse } from 'next/server';

import { setSessionId } from '@/utils/auth/setSessionId';

import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { nickname } = await request.json();

  const sessionId = setSessionId('session_id');

  return NextResponse.json({
    success: true,
    sessionId,
    // roomId: room.id,
    // playerId,
  });
}

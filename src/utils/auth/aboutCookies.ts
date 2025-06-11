'use server';

import { cookies } from 'next/headers';
import short from 'short-uuid';

export const setSessionId = async (key: string) => {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get(key)?.value;

  if (!sessionId) {
    sessionId = short.generate();
    cookieStore.set(key, sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'strict',
      httpOnly: true,
      secure: true,
    });
  }

  return sessionId;
};

export const getCurrentPlayerId = async () => {
  const cookieStore = await cookies();
  const playerId = cookieStore.get('wcg-player')?.value;
  if (!playerId) return null;

  return playerId;
};

export const setCurrentPlayerId = async (playerId: string) => {
  const cookieStore = await cookies();
  cookieStore.set('wcg-player', playerId, {
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'strict',
    httpOnly: true,
    secure: true,
  });
};

'use server';

import { cookies } from 'next/headers';
import short from 'short-uuid';

import type { UserType } from '@/types/auth.type';

export const setSessionId = async (key: string) => {
  const cookieStore = cookies();
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
  const cookieStore = cookies();
  const userId = cookieStore.get('wcg-player')?.value;

  return userId;
};

export const setCurrentPlayer = async (player: UserType) => {
  const cookieStore = cookies();
  const val = `id=${player.id}&nickname=${player.nickname}`;
  cookieStore.set('wcg-player', val, {
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'strict',
    httpOnly: true,
    secure: true,
  });
};

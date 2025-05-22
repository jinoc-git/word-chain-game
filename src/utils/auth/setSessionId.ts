'use server';

import { cookies } from 'next/headers';
import short from 'short-uuid';

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

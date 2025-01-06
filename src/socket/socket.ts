'use client';

import { io } from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_GAME_CHAIN_SERVER, {
  withCredentials: true,
});

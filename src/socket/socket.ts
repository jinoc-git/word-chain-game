'use client';

import { io } from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_GAME_CHAIN_SERVER + '/socket.io', {
  withCredentials: true,
  reconnection: true, // 연결 끊김 시 재연결 시도
  reconnectionDelay: 1000, // 재연결 시도 간격
  reconnectionAttempts: 5, // 재연결 시도 횟수
  transports: ['websocket', 'polling'],
});

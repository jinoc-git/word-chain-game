'use client';

import { io } from 'socket.io-client';
// vercel은 socket.io 서버를 지원x
// aws 무료 할당량 확인 후 가능하면 aws 적용 예정..
// aws 배포 시 비용이 많이 발생 => supabase를 사용하여 사용자가 입력한 단어를 유효성 검사 후 저장하는 방식으로 realtime 적용 예정
export const socket = io(process.env.NEXT_PUBLIC_GAME_CHAIN_SERVER, {
  withCredentials: true,
  reconnection: true, // 연결 끊김 시 재연결 시도
  reconnectionDelay: 1000, // 재연결 시도 간격
  reconnectionAttempts: 5, // 재연결 시도 횟수
  transports: ['websocket', 'polling'],
});

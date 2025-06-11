import short from 'short-uuid';

import type { Room } from '@/types/supabase';

export const createRoomId = () => {
  const originCode = short.generate();
  const shortCode = originCode.slice(0, 6).toUpperCase();
  return shortCode;
};

export const checkValidRoomIdChar = (code: string) => {
  const regex = /^[A-Z]{6}$/;
  return regex.test(code);
};

export const checkEnterRoom = (room: Room | null) => {
  if (room === null) return { success: false, message: '방이 없습니다.' };
  if (room.status === 'playing') return { success: false, message: '게임중입니다.' };
  if (room.status === 'full') return { success: false, message: '인원이 꽉 찼습니다.' };
  return { success: true, message: '방 참여 성공!' };
};

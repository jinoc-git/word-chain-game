import { z } from 'zod';

const roomCode = z
  .string()
  .length(6, '올바른 코드를 입력해 주세요.')
  .regex(/^[a-zA-Z]+$/);

export const EnterRoomSchema = z.object({ roomCode });

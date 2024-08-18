import { z } from 'zod';

const nickname = z
  .string()
  .min(2, '닉네임은 2~6글자이어야 합니다.')
  .max(6, '닉네임은 2~6글자이어야 합니다.');

export const loginFormSchema = z.object({
  nickname,
});

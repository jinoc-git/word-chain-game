import { z } from 'zod';

export const passwordRegExp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?`~^&])[A-Za-z\d@$!%*#?`~^&]{6,}$/;
const email = z.string().email({ message: '올바른 이메일을 입력해 주세요.' });
const password = z
  .string()
  .min(6, '비밀번호는 6자리 이상이어야 합니다.')
  .max(50, '비밀번호는 50자리 이하이어야 합니다.')
  .regex(passwordRegExp, '비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다.');
const confirmPassword = z
  .string()
  .min(6, '비밀번호는 6자리 이상이어야 합니다.')
  .max(50, '비밀번호는 50자리 이하이어야 합니다.')
  .regex(passwordRegExp, '비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다.');

export const signupFormSchema = z
  .object({
    email,
    password,
    confirmPassword,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
      });
    }
  });

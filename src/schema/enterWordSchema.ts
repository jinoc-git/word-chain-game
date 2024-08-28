import { z } from 'zod';

const enterWord = z.string().min(1, '단어를 입력해 주세요.');

export const enterWordSchema = z.object({ enterWord });

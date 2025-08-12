import ky from 'ky';

import { POST_WORD_ROUTE } from '@/constants/apiRoute';

import type { PostWordResponse } from '@/app/api/word/route';

export type PostWordArgs = {
  roomCode: string;
  words: string[];
};

export const postWord = async (args: PostWordArgs) => {
  const res = await ky
    .post(POST_WORD_ROUTE, {
      json: args,
    })
    .json<PostWordResponse>();

  return res;
};

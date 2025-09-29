import ky from 'ky';

import { OPENAI_ROUTE } from '@/constants/apiRoute';

import type { OpenAIResponse } from '@/app/api/openai/route';

export const postWordToAIAndGetNextWord = async (lastWord: string): Promise<OpenAIResponse> => {
  try {
    const res = await ky
      .post(OPENAI_ROUTE, {
        json: { word: lastWord },
      })
      .json<OpenAIResponse>();

    return res;
  } catch (error) {
    console.error(error);
    return { success: false, word: undefined };
  }
};

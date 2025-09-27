import ky from 'ky';

import { OPENAI_ROUTE } from '@/constants/apiRoute';

import type { OpenAIResponse } from '@/app/api/openai/route';

export const postWordToAIAndGetNextWord = async (lastWord: string) => {
  try {
    const { success, word } = await ky
      .post(OPENAI_ROUTE, {
        json: { word: lastWord },
      })
      .json<OpenAIResponse>();

    if (success) return word;

    return undefined;
  } catch (error) {
    console.error(error);
  }
};

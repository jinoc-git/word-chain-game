import ky from 'ky';

import { OPENAI_ROUTE } from '@/constants/apiRoute';

export const postWordToAIAndGetNextWord = async (lastWord: string) => {
  try {
    const res = await ky
      .post<string | undefined>(OPENAI_ROUTE, {
        json: { word: lastWord },
      })
      .json();

    return res;
  } catch (error) {
    console.error(error);
  }
};

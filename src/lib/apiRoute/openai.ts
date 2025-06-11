import ky from 'ky';

import { OPENAI_ROUTE } from '@/constants/apiRoute';

export const postWordToAIAndGetNextWord = async (lastWord: string) => {
  try {
    const res = await ky
      .post(OPENAI_ROUTE, {
        json: { word: lastWord },
      })
      .json<string | undefined>();

    return res;
  } catch (error) {
    console.error(error);
  }
};

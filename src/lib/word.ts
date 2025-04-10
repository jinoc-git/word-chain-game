import ky from 'ky';

import type { DictionaryApiResponse } from '@/types/dictionary.type';

export const checkDictionary = async (enterWord: string) => {
  try {
    const encodedWord = encodeURI(enterWord);

    const result = await ky
      .get<DictionaryApiResponse>(window?.location?.origin + '/api/dictionary', {
        searchParams: { q: encodedWord },
      })
      .json();

    const item = result.channel?.item;

    if (!item || (Array.isArray(item) && item.length === 0)) return false;
    if (item[0].word !== enterWord) return false;

    return true;
  } catch (error) {
    console.error(error);
  }
};

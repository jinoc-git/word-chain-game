import ky from 'ky';

import { DICTIONARY_ROUTE } from '@/constants/apiRoute';

import type { DictionaryApiResponse } from '@/types/dictionary.type';

export const checkDictionary = async (enterWord: string) => {
  try {
    const result = await ky
      .get(DICTIONARY_ROUTE, {
        searchParams: { q: enterWord },
      })
      .json<DictionaryApiResponse>();

    const item = result.channel?.item;

    if (!item || (Array.isArray(item) && item.length === 0)) return false;
    const onlyCharacter = item[0].word.replace(/\^|\-/g, '');
    if (onlyCharacter !== enterWord) return false;

    return true;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

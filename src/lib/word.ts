import ky from 'ky';

import type { ApiResponse } from '@/types/naver.type';

export const checkNaverDictionary = async (enterWord: string) => {
  try {
    const encodedWord = encodeURI(enterWord);
    const result = await ky
      .get<ApiResponse>(window?.location?.origin + `/api/naver?query=${encodedWord}`)
      .json();
    console.log(result);
    if (Array.isArray(result.items) && result.items.length === 0) return false;

    return true;
  } catch (error) {
    console.error(error);
  }
};

import ky from 'ky';

import type { ApiResponse } from '@/types/naver.type';

export const checkValidWord = async (enterWord: string) => {
  try {
    const encodedWord = encodeURI(enterWord);
    const result = await ky
      .get<ApiResponse>(window?.location?.origin + `/api/naver?query=${encodedWord}`)
      .json();

    if (Array.isArray(result.items) && result.items.length === 0) return false;

    return true;
  } catch (error) {
    console.error(error);
  }
};

import { checkNaverDictionary } from '@/lib/word';

import { checkFirstCharacter } from './checkFirstCharacter';
import checkOnlyKorean from './checkOnlyKorean';

export const checkWordIsValid = async (lastWord: string, enterWord: string) => {
  const isOnlyKorean = checkOnlyKorean(enterWord);
  if (!isOnlyKorean) return false;

  const isValidFirstCharacter = checkFirstCharacter(lastWord, enterWord);
  if (!isValidFirstCharacter) return false;

  const isExistWord = await checkNaverDictionary(enterWord);
  if (!isExistWord) return false;

  return true;
};

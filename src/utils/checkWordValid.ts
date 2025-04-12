import { DUEUM_LIST } from '@/constants/dueum';
import { checkDictionary } from '@/lib/word';

import type { DueumKey } from '@/constants/dueum';

const checkDueum = (char: string): char is DueumKey => {
  if (char in DUEUM_LIST) return true;
  else return false;
};

const checkFirstCharacter = (before: string, now: string) => {
  const beforeCharacter = before.slice(-1);
  const nowCharacter = now.slice(0, 1);

  if (checkDueum(beforeCharacter)) {
    const dueumCharacter = DUEUM_LIST[beforeCharacter];
    if (nowCharacter === dueumCharacter) return true;
  }

  if (beforeCharacter === nowCharacter) return true;
  else return false;
};

const checkOnlyKorean = (text: string) => {
  const koreaRegex = /^[가-힣]+$/;
  return koreaRegex.test(text);
};

export const checkWordIsValid = async (lastWord: string, enterWord: string) => {
  const isOnlyKorean = checkOnlyKorean(enterWord);
  if (!isOnlyKorean) return false;

  const isValidFirstCharacter = checkFirstCharacter(lastWord, enterWord);
  if (!isValidFirstCharacter) return false;

  const isExistWord = await checkDictionary(enterWord);
  if (!isExistWord) return false;

  return true;
};

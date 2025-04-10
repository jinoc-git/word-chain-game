import { checkDictionary } from '@/lib/word';

const checkFirstCharacter = (before: string, now: string) => {
  const needCharacter = before.slice(-1);
  const firstCharacter = now.slice(0, 1);

  if (needCharacter === firstCharacter) return true;
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

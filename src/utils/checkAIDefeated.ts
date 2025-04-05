import { AI_DEFEATED_FLAG } from '@/constants/aiDefeatedFlag';

import { checkWordIsValid } from './checkWordIsValid';

const checkFlag = (aiWord: string) => {
  return aiWord === AI_DEFEATED_FLAG ? true : false;
};

export const checkAIDefeated = async (lastWord: string, aiWord: string) => {
  const hasDefeatedFlag = checkFlag(aiWord);
  if (hasDefeatedFlag) return true;

  const isValidWord = await checkWordIsValid(lastWord, aiWord);
  if (!isValidWord) return true;

  return false;
};

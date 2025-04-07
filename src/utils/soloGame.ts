import { AI_DEFEATED_FLAG } from '@/constants/aiDefeatedFlag';
import { postWordToAIAndGetNextWord } from '@/lib/openai';

import { checkWordIsValid } from './checkWordValid';

const checkFlag = (aiWord: string) => {
  return aiWord === AI_DEFEATED_FLAG ? true : false;
};

const checkAIDefeated = async (lastWord: string, aiWord: string) => {
  const hasDefeatedFlag = checkFlag(aiWord);
  if (hasDefeatedFlag) return true;

  const isValidWord = await checkWordIsValid(lastWord, aiWord);
  if (!isValidWord) return true;

  return false;
};

export const handleOpenAIResponse = async (lastWord: string) => {
  const nextWord = await postWordToAIAndGetNextWord(lastWord);

  if (!nextWord) return AI_DEFEATED_FLAG;

  const isAIDefeated = await checkAIDefeated(lastWord, nextWord);
  if (isAIDefeated) return AI_DEFEATED_FLAG;

  return nextWord;
};

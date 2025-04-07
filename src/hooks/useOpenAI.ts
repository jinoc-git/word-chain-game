import { AI_DEFEATED_FLAG } from '@/constants/aiDefeatedFlag';
import { postWordToAIAndGetNextWord } from '@/lib/openai';
import { useGameActions } from '@/providers/storeProvider/gameStoreProvider';
import { checkAIDefeated } from '@/utils/checkAIDefeated';

const useOpenAI = () => {
  const { endGame, setIsWaitingTurn } = useGameActions((actions) => actions);

  const handleOpenAIResponse = async (enterWord: string) => {
    const nextWord = await postWordToAIAndGetNextWord(enterWord);

    if (!nextWord) return AI_DEFEATED_FLAG;

    const isAIDefeated = await checkAIDefeated(enterWord, nextWord);
    if (isAIDefeated) return AI_DEFEATED_FLAG;

    return nextWord;
  };

  return { handleOpenAIResponse };
};

export default useOpenAI;

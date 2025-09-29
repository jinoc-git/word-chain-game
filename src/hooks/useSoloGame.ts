import { AI_DEFEATED_FLAG } from '@/constants/aiDefeatedFlag';
import { useFireworksActions } from '@/providers/storeProvider/fireworksStoreProvider';
import { useGameActions } from '@/providers/storeProvider/gameStoreProvider';
import { useWordActions } from '@/providers/storeProvider/wordStoreProvider';
import { handleOpenAIResponse } from '@/utils/soloGame';

const useSoloGame = () => {
  // const totalWordCount = useWordState((state) => state.totalWordCount);

  // React.useEffect(() => {
  //   if (totalWordCount > 1 && totalWordCount % 2 === 0) {
  //     playWithAI(getLastWord());
  //   }
  // }, [totalWordCount]);

  const { endGame } = useGameActions((actions) => actions);
  const { pushNewWord, resetWords } = useWordActions((actions) => actions);
  const onShoot = useFireworksActions((actions) => actions.onShoot);

  const getAIWord = async (lastWord: string) => {
    const res = await handleOpenAIResponse(lastWord);

    if (res === AI_DEFEATED_FLAG) {
      endGame();
      resetWords();
      onShoot();
      return false;
    } else {
      pushNewWord(res.word);
      return true;
    }
  };

  return { getAIWord };
};

export default useSoloGame;

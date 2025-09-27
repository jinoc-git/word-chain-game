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

  const { endGame, setIsWaitingTurn } = useGameActions((actions) => actions);
  const { pushNewWord, getLastWord, resetWords } = useWordActions((actions) => actions);
  const onShoot = useFireworksActions((actions) => actions.onShoot);

  const playWithAI = async (lastWord: string) => {
    const res = await handleOpenAIResponse(lastWord);

    if (res === AI_DEFEATED_FLAG) {
      endGame();
      setIsWaitingTurn(true);
      resetWords();
      onShoot();
      return false;
    } else {
      setIsWaitingTurn(false);
      pushNewWord(res);
      return true;
    }
  };

  return { playWithAI };
};

export default useSoloGame;

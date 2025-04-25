import { useCountActions } from '@/providers/storeProvider/countStoreProvider';
import { useGameActions } from '@/providers/storeProvider/gameStoreProvider';
import { useWordActions } from '@/providers/storeProvider/wordStoreProvider';

import useCountDown from './useCountDown';

const useGame = () => {
  useCountDown();

  const { startGame, endGame, setIsWaitingTurn } = useGameActions((actions) => actions);
  const { initRandomWord, resetWords } = useWordActions((actions) => actions);
  const { startCount, endCount } = useCountActions((actions) => actions);

  const setGameState = (state: boolean) => {
    if (state) {
      startGame();
      setIsWaitingTurn(false);
    } else {
      endGame();
      setIsWaitingTurn(true);
    }
  };

  const settingWords = (state: boolean) => {
    if (state) initRandomWord();
    else resetWords();
  };

  const handleCountDown = (state: boolean) => {
    if (state) startCount();
    else endCount();
  };

  return { setGameState, settingWords, handleCountDown };
};

export default useGame;

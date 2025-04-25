import React from 'react';
import { toast } from 'react-toastify';

import { AI_DEFEATED_FLAG } from '@/constants/aiDefeatedFlag';
import { useFireworksActions } from '@/providers/storeProvider/fireworksStoreProvider';
import { useGameActions } from '@/providers/storeProvider/gameStoreProvider';
import { useWordActions, useWordState } from '@/providers/storeProvider/wordStoreProvider';
import { handleOpenAIResponse } from '@/utils/soloGame';

import useGame from './useGame';

const useSoloGame = (mode: string) => {
  const totalWordCount = useWordState((state) => state.totalWordCount);

  React.useEffect(() => {
    if (mode === 'solo' && totalWordCount > 1 && totalWordCount % 2 === 0) {
      playWithAI(getLastWord());
    }
  }, [totalWordCount]);

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
    } else {
      setIsWaitingTurn(false);
      pushNewWord(res);
    }
  };

  const { setGameState, settingWords, handleCountDown } = useGame();

  const handleGameState = (state: boolean) => {
    try {
      settingWords(state);
      setGameState(state);
      handleCountDown(state);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return { handleGameState };
};

export default useSoloGame;

import React from 'react';

import { AI_DEFEATED_FLAG } from '@/constants/aiDefeatedFlag';
import { useFireworksActions } from '@/providers/storeProvider/fireworksStoreProvider';
import { useGameActions } from '@/providers/storeProvider/gameStoreProvider';
import { useWordActions, useWordState } from '@/providers/storeProvider/wordStoreProvider';
import { handleOpenAIResponse } from '@/utils/soloGame';

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
};

export default useSoloGame;

// useGame으로 전체 핸들링
// useSoloGame과 useMultiGame으로 각각 핸들링
// useCountDown은 useGame에서

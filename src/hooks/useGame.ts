import { useCallback } from 'react';

import { useCountActions } from '@/providers/storeProvider/countStoreProvider';
import { useGameActions } from '@/providers/storeProvider/gameStoreProvider';
import { useWordActions } from '@/providers/storeProvider/wordStoreProvider';

/**
 * useGame 훅이 반환하는 함수들
 *
 * - setGameState(state: boolean)
 *   • true  → 게임 시작, 나의 턴
 *   • false → 게임 종료, 턴 대기
 *
 * - settingWords(state: boolean)
 *   • true  → 랜덤 단어 세팅
 *   • false → 단어 초기화
 *
 * - handleCountDown(state: boolean)
 *   • true  → 카운트 시작
 *   • false → 카운트 종료
 */
const useGame = () => {
  const { startGame, endGame, setIsWaitingTurn } = useGameActions((actions) => actions);
  const { initRandomWord, resetWords } = useWordActions((actions) => actions);
  const { endCount, startCount } = useCountActions((actions) => actions);

  const setGameState = useCallback((state: boolean) => {
    if (state) {
      startGame();
      setIsWaitingTurn(false);
    } else {
      endGame();
      setIsWaitingTurn(true);
    }
  }, []);

  const settingWords = useCallback((state: boolean) => {
    if (state) initRandomWord();
    else resetWords();
  }, []);

  const handleCountDown = useCallback((state: boolean) => {
    if (state) startCount();
    else endCount();
  }, []);

  return { setGameState, settingWords, handleCountDown };
};

export default useGame;

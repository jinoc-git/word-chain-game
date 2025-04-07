import { toast } from 'react-toastify';

import { useAuthState } from '@/providers/storeProvider/authStoreProvider';
import { useCountActions } from '@/providers/storeProvider/countStoreProvider';
import { useGameActions } from '@/providers/storeProvider/gameStoreProvider';
import { useWordActions } from '@/providers/storeProvider/wordStoreProvider';
import { socket } from '@/socket/socket';

import useSoloGame from './useSoloGame';

const useGame = (mode: string, roomId: string) => {
  const user = useAuthState((state) => state.user);

  useSoloGame(mode);

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

  const handleMultiGame = async (state: boolean) => {
    if (user === null) return;

    await new Promise((resolve, reject) => {
      socket.emit('handleGameState', { userId: user.id, roomId, state });

      const gameStateSuccessHandler = (message: string) => {
        console.log(message);
        socket.off('handleGameStateSuccess', gameStateSuccessHandler);
        socket.off('handleGameStateFail', gameStateFailHandler);
        clearTimeout(timeoutId);
        resolve(true);
      };
      const gameStateFailHandler = (message: string) => {
        console.log(message);
        socket.off('handleGameStateSuccess', gameStateSuccessHandler);
        socket.off('handleGameStateFail', gameStateFailHandler);
        clearTimeout(timeoutId);
        reject(new Error(message));
      };

      socket.on('handleGameStateSuccess', gameStateSuccessHandler);
      socket.on('handleGameStateFail', gameStateFailHandler);

      const timeoutId = setTimeout(() => {
        socket.off('handleGameStateSuccess', gameStateSuccessHandler);
        socket.off('handleGameStateFail', gameStateFailHandler);
        reject(new Error('통신 오류! 잠시후 다시 시도해주세요'));
      }, 5000);
    });
  };

  const handleCountDown = (state: boolean) => {
    if (state) startCount();
    else endCount();
  };

  const handleGameState = async (state: boolean) => {
    try {
      if (mode === 'multi') await handleMultiGame(state);

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

export default useGame;

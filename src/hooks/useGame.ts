import { toast } from 'react-toastify';

import { useAuthState } from '@/providers/storeProvider/authStoreProvider';
import { useGameActions } from '@/providers/storeProvider/gameStoreProvider';
import { useWordActions } from '@/providers/storeProvider/wordStoreProvider';
import { socket } from '@/socket/socket';
import { getRandomFirstWord } from '@/utils/getRandomFirstWord';

const useGame = () => {
  const { startGame, endGame, setIsWaitingTurn } = useGameActions((actions) => actions);
  const { resetWords, pushNewWord } = useWordActions((actions) => actions);
  const user = useAuthState((state) => state.user);

  const setGameState = (state: boolean) => {
    if (state) startGame();
    else endGame();
    setIsWaitingTurn(true);
  };

  const setWords = (state: boolean) => {
    resetWords();
    if (state) pushNewWord(getRandomFirstWord());
  };

  const handleMultiGame = async (state: boolean, roomId: string) => {
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

  const handleGameState = async (state: boolean, roomId?: string) => {
    try {
      if (roomId) await handleMultiGame(state, roomId);

      setWords(state);
      setGameState(state);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return { handleGameState };
};

export default useGame;

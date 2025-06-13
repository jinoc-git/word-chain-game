import { toast } from 'react-toastify';

import { useAuthState } from '@/providers/storeProvider/authStoreProvider';

import useGame from './useGame';

const useMultiGame = (roomCode: string) => {
  const user = useAuthState((state) => state.user);

  const handleMultiGame = async (state: boolean) => {
    if (user === null) return;

    // await new Promise((resolve, reject) => {
    //   socket.emit('handleGameState', { userId: user.id, roomCode, state });

    //   const gameStateSuccessHandler = (message: string) => {
    //     console.log(message);
    //     socket.off('handleGameStateSuccess', gameStateSuccessHandler);
    //     socket.off('handleGameStateFail', gameStateFailHandler);
    //     clearTimeout(timeoutId);
    //     resolve(true);
    //   };
    //   const gameStateFailHandler = (message: string) => {
    //     console.log(message);
    //     socket.off('handleGameStateSuccess', gameStateSuccessHandler);
    //     socket.off('handleGameStateFail', gameStateFailHandler);
    //     clearTimeout(timeoutId);
    //     reject(new Error(message));
    //   };

    //   socket.on('handleGameStateSuccess', gameStateSuccessHandler);
    //   socket.on('handleGameStateFail', gameStateFailHandler);

    //   const timeoutId = setTimeout(() => {
    //     socket.off('handleGameStateSuccess', gameStateSuccessHandler);
    //     socket.off('handleGameStateFail', gameStateFailHandler);
    //     reject(new Error('통신 오류! 잠시후 다시 시도해주세요'));
    //   }, 5000);
    // });
  };

  const { setGameState, settingWords, handleCountDown } = useGame();

  const handleMultiGameState = async (state: boolean) => {
    try {
      await handleMultiGame(state);

      settingWords(state);
      setGameState(state);
      handleCountDown(state);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return { handleMultiGameState };
};

export default useMultiGame;

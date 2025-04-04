import { toast } from 'react-toastify';

import { useAuthState } from '@/providers/storeProvider/authStoreProvider';
import { useGameActions } from '@/providers/storeProvider/gameStoreProvider';
import { socket } from '@/socket/socket';

const useGame = (mode: string) => {
  const { startGame, endGame } = useGameActions((actions) => actions);
  const user = useAuthState((state) => state.user);

  const handleSoloGame = (state: boolean) => {
    if (state) startGame();
    else endGame();
  };

  const setGameState = (state: boolean) => {
    if (state) startGame();
    else endGame();
  };

  const setMultiRoomState = async (state: boolean, roomId: string) => {
    if (user === null) return;

    await new Promise((resolve, reject) => {
      socket.emit('handleGameState', { userId: user.id, roomId, state });

      socket.on('handleGameStateSuccess', (message: string) => {
        resolve(true);
      });

      socket.on('handleGameStateFail', (message: string) => {
        reject(new Error(message));
      });

      setTimeout(() => reject(new Error('통신 오류! 잠시후 다시 시도해주세요')), 5000);
    });
  };

  const handleGameState = async (state: boolean, roomId?: string) => {
    try {
      if (roomId) setMultiRoomState(state, roomId);

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

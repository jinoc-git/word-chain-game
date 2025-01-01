import { toast } from 'react-toastify';

import { socket } from '@/socket/socket';
import { useAuthState } from '@/store/authStore';
import { useGameActions, useGameState } from '@/store/gameStore';

const useGame = () => {
  const gameState = useGameState();
  const { startGame, endGame } = useGameActions();
  const user = useAuthState();

  const handleGameState = async (state: boolean, roomId: string) => {
    if (user === null) return;

    try {
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

      if (state) startGame();
      else endGame();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return { isGameStarted: gameState, handleGameState };
};

export default useGame;

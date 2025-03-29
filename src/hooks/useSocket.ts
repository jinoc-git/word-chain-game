import React from 'react';
import { toast } from 'react-toastify';

import _ from 'lodash';

import { socket } from '@/socket/socket';
import { usePlayerActions } from '@/stores/playerStore';

import type { Room } from '@/types/server.type';

export interface CreateOrJoinSocketRoomArgs {
  roomId: string;
  userId: string;
  nickname: string;
}

const useSocket = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [transport, setTransport] = React.useState('N/A');

  const { initPlayer } = usePlayerActions();

  const createSocketRoom = async ({ roomId, userId, nickname }: CreateOrJoinSocketRoomArgs) => {
    try {
      const res: boolean | undefined = await new Promise((resolve, reject) => {
        socket.emit('createRoom', { roomId, userId, nickname });

        socket.on('createRoomSuccess', (room: Room) => {
          initPlayer(room.players);
          resolve(true);
        });
        socket.on('createRoomFail', (message: string) => {
          reject(new Error(message));
        });

        setTimeout(() => reject(new Error('통신 오류! 잠시후 다시 시도해주세요')), 5000);
      });

      return res;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return false;
      }
    }
  };

  const joinSocketRoom = async ({ roomId, userId, nickname }: CreateOrJoinSocketRoomArgs) => {
    try {
      const res: boolean | undefined = await new Promise((resolve, reject) => {
        socket.emit('joinRoom', { roomId, userId, nickname });

        socket.on('joinRoomSuccess', (room: Room) => {
          console.log(room);
          resolve(true);
        });
        socket.on('joinRoomFail', (message: string) => {
          console.log(message);
          reject(new Error(message));
        });

        setTimeout(() => reject(new Error('통신 오류! 잠시후 다시 시도해주세요')), 5000);
      });

      return res;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return false;
      }
    }
  };

  React.useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name || 'N/A');

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name);
      });
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setTransport('N/A');
    };

    if (socket.connected) onConnect();
    console.log(socket);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return {
    isConnected,
    transport,
    createSocketRoom: _.throttle(createSocketRoom, 750),
    joinSocketRoom: _.throttle(joinSocketRoom, 750),
  };
};

export default useSocket;

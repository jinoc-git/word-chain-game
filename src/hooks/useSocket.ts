import React from 'react';
import { toast } from 'react-toastify';

import _ from 'lodash';

import { usePlayerActions } from '@/providers/storeProvider/playerStoreProvider';
import { socket } from '@/socket/socket';

import type { Room } from '@/types/server.type';

export type CreateOrJoinSocketRoomArgs = {
  roomId: string;
  userId: string;
  nickname: string;
};

const useSocket = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [transport, setTransport] = React.useState('N/A');

  const initPlayer = usePlayerActions((actions) => actions.initPlayer);

  const connectSocket = () => {
    if (!socket.connected) socket.connect();
  };

  const disconnectSocket = () => {
    if (socket.connected) socket.disconnect();
  };

  const createSocketRoom = async ({ roomId, userId, nickname }: CreateOrJoinSocketRoomArgs) => {
    try {
      if (!socket.connected) connectSocket();

      const res: boolean | undefined = await new Promise((resolve, reject) => {
        socket.emit('createRoom', { roomId, userId, nickname });

        const createRoomSuccessHandler = (room: Room) => {
          initPlayer(room.players);
          socket.off('createRoomSuccess', createRoomSuccessHandler);
          socket.off('createRoomFail', createRoomFailHandler);
          clearTimeout(timeoutId);
          resolve(true);
        };

        const createRoomFailHandler = (message: string) => {
          socket.off('createRoomSuccess', createRoomSuccessHandler);
          socket.off('createRoomFail', createRoomFailHandler);
          clearTimeout(timeoutId);
          reject(new Error(message));
        };

        socket.on('createRoomSuccess', createRoomSuccessHandler);
        socket.on('createRoomFail', createRoomFailHandler);

        const timeoutId = setTimeout(() => {
          socket.off('createRoomSuccess', createRoomSuccessHandler);
          socket.off('createRoomFail', createRoomFailHandler);
          reject(new Error('통신 오류! 잠시후 다시 시도해주세요'));
        }, 5000);
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
      if (!socket.connected) connectSocket();

      const res: boolean | undefined = await new Promise((resolve, reject) => {
        socket.emit('joinRoom', { roomId, userId, nickname });

        const joinRoomSuccessHandler = (room: Room) => {
          console.log(room);
          socket.off('joinRoomSuccess', joinRoomSuccessHandler);
          socket.off('joinRoomFail', joinRoomFailHandler);
          clearTimeout(timeoutId);
          resolve(true);
        };

        const joinRoomFailHandler = (message: string) => {
          console.log(message);
          socket.off('joinRoomSuccess', joinRoomSuccessHandler);
          socket.off('joinRoomFail', joinRoomFailHandler);
          clearTimeout(timeoutId);
          reject(new Error(message));
        };

        socket.on('joinRoomSuccess', joinRoomSuccessHandler);
        socket.on('joinRoomFail', joinRoomFailHandler);

        const timeoutId = setTimeout(() => {
          socket.off('joinRoomSuccess', joinRoomSuccessHandler);
          socket.off('joinRoomFail', joinRoomFailHandler);
          reject(new Error('통신 오류! 잠시후 다시 시도해주세요'));
        }, 5000);
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

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    if (socket.connected) onConnect();

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.io.engine.off('upgrade');
    };
  }, []);

  return {
    isConnected,
    transport,
    connectSocket,
    disconnectSocket,
    createSocketRoom: _.throttle(createSocketRoom, 750),
    joinSocketRoom: _.throttle(joinSocketRoom, 750),
  };
};

export default useSocket;

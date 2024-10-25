import React from 'react';

import _ from 'lodash';

import { socket } from '@/socket/socket';
import { usePlayerActions } from '@/store/playerStore';

import type { PlayerType } from '@/store/playerStore';

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
    let isValidRoomId = false;
    try {
      const res = await new Promise((resolve, reject) => {
        socket.emit('createRoom', { roomId, userId, nickname });

        socket.on('createRoomSuccess', ({ users }: { users: PlayerType[] }) => {
          initPlayer(users);
          resolve(true);
        });
        socket.on('createRoomFail', (data) => {
          console.log(data);
          reject(false);
        });

        setTimeout(() => reject(new Error('time out')), 5000);
      });

      isValidRoomId = res as boolean;
    } catch (error) {
      isValidRoomId = false;
    }

    return isValidRoomId;
  };

  const joinSocketRoom = async ({ roomId, userId, nickname }: CreateOrJoinSocketRoomArgs) => {
    let isValidRoomId = false;
    try {
      const res = await new Promise((resolve, reject) => {
        socket.emit('joinRoom', { roomId, userId, nickname });

        socket.on('joinRoomSuccess', (data) => {
          console.log(data);
          resolve(true);
        });
        socket.on('joinRoomFail', (data) => {
          console.log(data);
          reject(false);
        });

        setTimeout(() => reject(new Error('time out')), 5000);
      });

      isValidRoomId = res as boolean;
    } catch (error) {
      isValidRoomId = false;
    }

    return isValidRoomId;
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

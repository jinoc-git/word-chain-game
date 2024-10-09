import React from 'react';

import { socket } from '@/socket/socket';

export interface CreateOrJoinSocketRoomArgs {
  roomId: string;
  userId: string;
  userName: string;
}

const useSocket = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [transport, setTransport] = React.useState('N/A');

  const createSocketRoom = async ({ roomId, userId, userName }: CreateOrJoinSocketRoomArgs) => {
    let isValidRoomId = false;
    try {
      const res = await new Promise((resolve, reject) => {
        socket.emit('createRoom', { roomId, userId, userName });

        socket.on('createRoomSuccess', (data) => {
          console.log(data);
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

  const joinSocketRoom = async ({ roomId, userId, userName }: CreateOrJoinSocketRoomArgs) => {
    let isValidRoomId = false;
    try {
      const res = await new Promise((resolve, reject) => {
        socket.emit('joinRoom', { roomId, userId, userName });

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

  return { isConnected, transport, createSocketRoom, joinSocketRoom };
};

export default useSocket;

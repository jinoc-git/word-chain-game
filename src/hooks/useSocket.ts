import React from 'react';

import { socket } from '@/socket/socket';

export interface CreateOrJoinSocketRoomArgs {
  roomId: string;
  userId: string;
}

const useSocket = () => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [transport, setTransport] = React.useState('N/A');

  const createSocketRoom = ({ roomId, userId }: CreateOrJoinSocketRoomArgs) => {
    let isValidRoomCode = false;
    socket.emit('createRoom', { roomId, userId });

    socket.on('createRoomSuccess', () => (isValidRoomCode = true));
    socket.on('createRoomFail', () => (isValidRoomCode = false));

    return isValidRoomCode;
  };

  const joinSocketRoom = ({ roomId, userId }: CreateOrJoinSocketRoomArgs) => {
    let isValidRoomCode = false;
    socket.emit('joinRoom', { roomId, userId });

    socket.on('joinRoomSuccess', () => (isValidRoomCode = true));
    socket.on('joinRoomFail', () => (isValidRoomCode = false));

    return isValidRoomCode;
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

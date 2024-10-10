import React from 'react';

import { socket } from '@/socket/socket';

export interface PlayerType {
  socketId: string;
  userId: string;
  nickname: string;
}

const usePlayer = () => {
  const [curPlayers, setCurPlayers] = React.useState<PlayerType[]>([]);

  const updatePlayers = () => {
    socket.on('newUser', ({ users }: { users: PlayerType[] }) => {
      setCurPlayers(users);
    });
  };

  React.useEffect(() => {
    const handleNewUser = ({ users }: { users: PlayerType[] }) => {
      setCurPlayers(users);
    };

    socket.on('newUser', handleNewUser);

    return () => {
      socket.off('newUser', handleNewUser);
    };
  }, []);

  return { curPlayers, updatePlayers };
};

export default usePlayer;

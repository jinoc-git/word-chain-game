'use client';

import React from 'react';

import useSocket from '@/hooks/useSocket';
import { useAuthState } from '@/providers/storeProvider/authStoreProvider';

import CreateRoom from '../createRoom/CreateRoom';
import EnterRoom from '../enterRoom/EnterRoom';

const PlayMulti = () => {
  const { createSocketRoom, joinSocketRoom } = useSocket();
  const user = useAuthState((state) => state.user);

  return (
    <>
      <CreateRoom user={user} createSocketRoom={createSocketRoom} />
      <EnterRoom user={user} joinSocketRoom={joinSocketRoom} />
    </>
  );
};

export default PlayMulti;

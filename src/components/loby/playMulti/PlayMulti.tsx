'use client';

import React from 'react';

import { useAuthState } from '@/providers/storeProvider/authStoreProvider';

import CreateRoom from './createRoom/CreateRoom';
import EnterRoom from './enterRoom/EnterRoom';

const PlayMulti = () => {
  const user = useAuthState((state) => state.user);

  return (
    <>
      <CreateRoom user={user} />
      <EnterRoom user={user} />
    </>
  );
};

export default PlayMulti;

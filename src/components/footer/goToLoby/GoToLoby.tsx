'use client';

import React from 'react';

import { Button } from '@nextui-org/react';
import { House } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { useAuthActions, useAuthState } from '@/providers/storeProvider/authStoreProvider';
import { usePlayerActions } from '@/providers/storeProvider/playerStoreProvider';

const GoToLoby = () => {
  const router = useRouter();
  const params = useParams();

  const user = useAuthState((state) => state.user);
  const checkLogin = useAuthActions((actions) => actions.checkLogin);
  const quitRoom = usePlayerActions((actions) => actions.quitRoom);

  const handleGoToLoby = async () => {
    if ('roomCode' in params && typeof params.roomCode === 'string' && user !== null) {
      await quitRoom({ userId: user.id });
    }

    if (checkLogin()) router.push('/loby');
  };

  return (
    <Button isIconOnly onClick={handleGoToLoby} variant="faded">
      <House />
    </Button>
  );
};

export default GoToLoby;

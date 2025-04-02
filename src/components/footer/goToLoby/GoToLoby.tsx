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
  const quitGameAndOffObserver = usePlayerActions((actions) => actions.quitGameAndOffObserver);

  const handleGoToLoby = () => {
    if (checkLogin()) router.push('/loby');

    if ('gameId' in params && typeof params.gameId === 'string' && user !== null) {
      quitGameAndOffObserver({ roomId: params.gameId, userId: user.id });
    }
  };

  return (
    <Button isIconOnly onClick={handleGoToLoby} variant="faded">
      <House />
    </Button>
  );
};

export default GoToLoby;

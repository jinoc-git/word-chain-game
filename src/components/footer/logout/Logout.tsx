'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { LogOut } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { useAuthActions, useAuthState } from '@/providers/storeProvider/authStoreProvider';
import { usePlayerActions } from '@/providers/storeProvider/playerStoreProvider';

const Logout = () => {
  const params = useParams();

  const user = useAuthState((store) => store.user);
  const logout = useAuthActions((actions) => actions.logout);
  const quitGameAndOffObserver = usePlayerActions((actions) => actions.quitGameAndOffObserver);

  const router = useRouter();

  const handleLogout = () => {
    logout();

    if ('gameId' in params && typeof params.gameId === 'string' && user !== null) {
      quitGameAndOffObserver({ roomId: params.gameId, userId: user.id });
    }

    router.push('/');
  };

  return (
    <Button isIconOnly onClick={handleLogout} variant="faded">
      <LogOut />
    </Button>
  );
};

export default Logout;

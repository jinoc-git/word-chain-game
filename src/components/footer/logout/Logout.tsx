'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { LogOut } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { useAuthActions, useAuthState } from '@/providers/storeProvider/authStoreProvider';
import { usePlayerActions } from '@/providers/storeProvider/playerStoreProvider';

const Logout = () => {
  const params = useParams();

  const user = useAuthState((state) => state.user);
  const logout = useAuthActions((actions) => actions.logout);
  const quitRoom = usePlayerActions((actions) => actions.quitRoom);

  const router = useRouter();

  const handleLogout = async () => {
    logout();

    if ('roomCode' in params && typeof params.roomCode === 'string' && user !== null) {
      await quitRoom({ userId: user.id });
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

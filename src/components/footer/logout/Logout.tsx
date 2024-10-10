'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { LogOut } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { useAuthActions, useAuthState } from '@/store/authStore';
import { usePlayerActions } from '@/store/playerStore';

const Logout = () => {
  const params = useParams();

  const user = useAuthState();
  const { logout } = useAuthActions();
  const { quitGameAndOffObserver } = usePlayerActions();

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

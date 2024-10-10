'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useAuthActions } from '@/store/authStore';
import { usePlayerActions } from '@/store/playerStore';

const Logout = () => {
  const { logout } = useAuthActions();
  const { resetPlayerAndOffObserver } = usePlayerActions();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    resetPlayerAndOffObserver();

    router.push('/');
  };

  return (
    <Button isIconOnly onClick={handleLogout} variant="faded">
      <LogOut />
    </Button>
  );
};

export default Logout;

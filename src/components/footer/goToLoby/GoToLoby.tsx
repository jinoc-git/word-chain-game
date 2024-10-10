'use client';

import React from 'react';

import { Button } from '@nextui-org/react';
import { House } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useAuthActions } from '@/store/authStore';
import { usePlayerActions } from '@/store/playerStore';

const GoToLoby = () => {
  const router = useRouter();
  const { checkLogin } = useAuthActions();
  const { resetPlayerAndOffObserver } = usePlayerActions();

  const handleGoToLoby = () => {
    if (checkLogin()) router.push('/loby');
    resetPlayerAndOffObserver();
  };

  return (
    <Button isIconOnly onClick={handleGoToLoby} variant="faded">
      <House />
    </Button>
  );
};

export default GoToLoby;

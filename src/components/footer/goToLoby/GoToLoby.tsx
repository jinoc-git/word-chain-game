'use client';

import React from 'react';

import { Button } from '@nextui-org/react';
import { House } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useAuthActions } from '@/store/authStore';

const GoToLoby = () => {
  const router = useRouter();
  const { checkLogin } = useAuthActions();

  const handleGoToLoby = () => {
    if (checkLogin()) router.push('/loby');
  };

  return (
    <Button isIconOnly onClick={handleGoToLoby} variant="faded">
      <House />
    </Button>
  );
};

export default GoToLoby;

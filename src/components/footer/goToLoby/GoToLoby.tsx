'use client';

import React from 'react';

import { Button } from '@nextui-org/react';
import { House } from 'lucide-react';
import { useRouter } from 'next/navigation';

const GoToLoby = () => {
  const router = useRouter();

  const handleGoToLoby = () => {
    router.push('/loby');
  };

  return (
    <Button isIconOnly onClick={handleGoToLoby} variant="faded">
      <House />
    </Button>
  );
};

export default GoToLoby;

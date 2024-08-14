'use client';

import React from 'react';

import { Button } from '@nextui-org/react';
import { House } from 'lucide-react';
import { useRouter } from 'next/navigation';

const GoToHome = () => {
  const router = useRouter();

  const handleGoToHome = () => {
    router.push('/');
  };

  return (
    <Button isIconOnly onClick={handleGoToHome} variant="faded">
      <House />
    </Button>
  );
};

export default GoToHome;

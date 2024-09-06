'use client';

import React, { useContext } from 'react';

import { Button } from '@nextui-org/react';
import { House } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { AuthContext } from '@/context/authContext';

const GoToLoby = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  if (auth === null) throw new Error('need AuthProviders');

  const handleGoToLoby = () => {
    if (auth.checkLogin()) router.push('/loby');
  };

  return (
    <Button isIconOnly onClick={handleGoToLoby} variant="faded">
      <House />
    </Button>
  );
};

export default GoToLoby;

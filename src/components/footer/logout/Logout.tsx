'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <Button isIconOnly onClick={handleLogout} variant="faded">
      <LogOut />
    </Button>
  );
};

export default Logout;

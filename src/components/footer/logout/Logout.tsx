'use client';

import React, { useContext } from 'react';

import { Button } from '@nextui-org/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { AuthContext } from '@/context/authContext';

const Logout = () => {
  const auth = useContext(AuthContext);

  if (auth === null) throw new Error('need AuthProviders');

  const router = useRouter();

  const handleLogout = () => {
    auth.logout();

    router.push('/');
  };

  return (
    <Button isIconOnly onClick={handleLogout} variant="faded">
      <LogOut />
    </Button>
  );
};

export default Logout;

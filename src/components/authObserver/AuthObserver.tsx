'use client';

import React from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useAuthActions } from '@/store/authStore';

const AuthObserver = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { checkLogin } = useAuthActions();

  React.useEffect(() => {
    if (checkLogin()) return;
    else router.push('/');
  }, [pathname]);

  return null;
};

export default AuthObserver;

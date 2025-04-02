'use client';

import React from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useAuthActions } from '@/providers/storeProvider/authStoreProvider';

const AuthObserver = () => {
  const pathname = usePathname();
  const router = useRouter();
  const checkLogin = useAuthActions((actions) => actions.checkLogin);

  React.useEffect(() => {
    if (checkLogin()) return;
    else router.push('/');
  }, [pathname]);

  return null;
};

export default AuthObserver;

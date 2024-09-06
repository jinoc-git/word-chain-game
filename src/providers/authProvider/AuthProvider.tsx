import React from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { AuthContext } from '@/context/authContext';

import type { UserType } from '@/types/auth.type';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserType | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  // const getUser = () => {
  //   const data = sessionStorage.getItem('word-chain');
  //   if (!data || !user) return null;

  //   const sessionUser: UserType = JSON.parse(data);

  //   if (sessionUser.id === user.id) return sessionUser;
  //   else return user;
  // };

  const login = (user: UserType) => {
    sessionStorage.setItem('word-chain', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    sessionStorage.removeItem('word-chain');
    setUser(null);
  };

  const checkLogin = () => {
    return !!user;
  };
  console.log('유저', user);
  React.useEffect(() => {
    const data = sessionStorage.getItem('word-chain');
    if (user) {
      if (!data) return;

      const sessionUser: UserType = JSON.parse(data);
      const isSameUser = sessionUser.id === user.id;
      if (!isSameUser) sessionStorage.setItem('word-chain', JSON.stringify(user));
    } else {
      if (data) {
        const sessionUser: UserType = JSON.parse(data);
        setUser(sessionUser);
      } else {
        setUser(null);
        router.push('/');
      }
    }
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, login, logout, checkLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

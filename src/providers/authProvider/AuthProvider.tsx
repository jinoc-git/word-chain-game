import React from 'react';

import { AuthContext } from '@/context/authContext';

import type { UserType } from '@/types/auth.type';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserType | null>(null);

  const getUser = () => {
    const data = sessionStorage.getItem('word-chain');
    if (!data || !user) return null;

    const sessionUser: UserType = JSON.parse(data);

    if (sessionUser.id === user.id) return sessionUser;
    else return user;
  };

  const login = (user: UserType) => {
    sessionStorage.setItem('word-chain', JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    sessionStorage.removeItem('word-chain');
    setUser(null);
  };

  React.useEffect(() => {
    if (!user) {
      const data = sessionStorage.getItem('word-chain');
      if (data) {
        const sessionUser: UserType = JSON.parse(data);
        setUser(sessionUser);
      } else {
        setUser(null);
      }
    }
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

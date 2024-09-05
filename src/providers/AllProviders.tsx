'use client';

import React from 'react';

import AuthProvider from './authProvider/AuthProvider';
import UIProvider from './uiProvider/UIProvider';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <UIProvider>{children}</UIProvider>
    </AuthProvider>
  );
};

export default AllProviders;

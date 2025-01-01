'use client';

import React from 'react';

import ToastProvider from './toastProvider/ToastProvider';
import UIProvider from './uiProvider/UIProvider';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider>
      <UIProvider>{children}</UIProvider>
    </ToastProvider>
  );
};

export default AllProviders;

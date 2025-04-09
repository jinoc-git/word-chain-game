'use client';

import React from 'react';

import FireworksConfetti from './fireworksConfetti/FireworksConfetti';
import StoreProviders from './storeProvider';
import ToastProvider from './toastProvider/ToastProvider';
import UIProvider from './uiProvider/UIProvider';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProviders>
      <ToastProvider>
        <UIProvider>
          {children}
          <FireworksConfetti />
        </UIProvider>
      </ToastProvider>
    </StoreProviders>
  );
};

export default AllProviders;

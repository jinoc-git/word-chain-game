'use client';

import React from 'react';

import UIProvider from './uiProvider/UIProvider';

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return <UIProvider>{children}</UIProvider>;
};

export default AllProviders;

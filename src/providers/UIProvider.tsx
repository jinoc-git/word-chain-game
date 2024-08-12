'use client';

import React from 'react';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface Props {
  children: React.ReactNode;
}

const UIProvider = ({ children }: Props) => {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default UIProvider;

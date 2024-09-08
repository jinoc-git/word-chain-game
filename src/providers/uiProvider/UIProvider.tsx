'use client';

import React from 'react';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

interface Props {
  children: React.ReactNode;
}

const UIProvider = ({ children }: Props) => {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Header />
        {children}
        <Footer />
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default UIProvider;

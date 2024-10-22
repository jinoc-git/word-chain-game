'use client';

import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';

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
        <ToastContainer
          bodyClassName={() => 'text-sm font-white p-3 flex items-center'}
          position="top-center"
          autoClose={1500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Zoom}
        />
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default UIProvider;

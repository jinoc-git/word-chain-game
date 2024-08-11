import React from 'react';

import { NextUIProvider } from '@nextui-org/react';

const UIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <main className="w-screen h-screen flex-box bg-bg">{children}</main>
    </NextUIProvider>
  );
};

export default UIProvider;

import React from 'react';

import { NextUIProvider } from '@nextui-org/react';

const UIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <main className=" bg-bg">{children}</main>
    </NextUIProvider>
  );
};

export default UIProvider;

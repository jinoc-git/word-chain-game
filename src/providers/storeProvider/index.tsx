import React from 'react';

import { AuthStoreProvider } from './authStoreProvider';

const StoreProviders = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <AuthStoreProvider>{children}</AuthStoreProvider>
    </>
  );
};

export default StoreProviders;

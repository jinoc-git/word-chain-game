import React from 'react';

import { AuthStoreProvider } from './authStoreProvider';
import { GameStoreProvider } from './gameStoreProvider';

const StoreProviders = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthStoreProvider>
      <GameStoreProvider>{children}</GameStoreProvider>
    </AuthStoreProvider>
  );
};

export default StoreProviders;

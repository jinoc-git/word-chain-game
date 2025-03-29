import React from 'react';

import { AuthStoreProvider } from './authStoreProvider';
import { GameStoreProvider } from './gameStoreProvider';
import { PlayerStoreProvider } from './playerStoreProvider';

const StoreProviders = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthStoreProvider>
      <GameStoreProvider>
        <PlayerStoreProvider>{children}</PlayerStoreProvider>
      </GameStoreProvider>
    </AuthStoreProvider>
  );
};

export default StoreProviders;

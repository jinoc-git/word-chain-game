import React from 'react';

import { AuthStoreProvider } from './authStoreProvider';
import { GameStoreProvider } from './gameStoreProvider';
import { PlayerStoreProvider } from './playerStoreProvider';
import { WordStoreProvider } from './wordStoreProvider';

const StoreProviders = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthStoreProvider>
      <GameStoreProvider>
        <PlayerStoreProvider>
          <WordStoreProvider>{children}</WordStoreProvider>
        </PlayerStoreProvider>
      </GameStoreProvider>
    </AuthStoreProvider>
  );
};

export default StoreProviders;

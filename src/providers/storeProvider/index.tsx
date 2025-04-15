import React from 'react';

import { AuthStoreProvider } from './authStoreProvider';
import { CountStoreProvider } from './countStoreProvider';
import { FireworksStoreProvider } from './fireworksStoreProvider';
import { GameStoreProvider } from './gameStoreProvider';
import { PlayerStoreProvider } from './playerStoreProvider';
import { WordStoreProvider } from './wordStoreProvider';

const StoreProviders = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthStoreProvider>
      <GameStoreProvider>
        <PlayerStoreProvider>
          <WordStoreProvider>
            <CountStoreProvider>
              <FireworksStoreProvider>{children}</FireworksStoreProvider>
            </CountStoreProvider>
          </WordStoreProvider>
        </PlayerStoreProvider>
      </GameStoreProvider>
    </AuthStoreProvider>
  );
};

export default StoreProviders;

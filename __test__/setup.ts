import '@testing-library/jest-dom';
import type { ReactNode } from 'react';

import { mockStores } from './mocks/zustand-store';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
    replace: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
  }),
  useParams: vi.fn(),
}));

vi.mock('@/utils/createRoomId', () => ({
  createRoomId: vi.fn(() => 'ABCDEF'),
}));

vi.mock('@/hooks/useWord', () => ({
  isValidWord: true,
  enterWordAndCheck: vi.fn().mockReturnValue(true),
}));

vi.mock('lodash', () => ({
  default: {
    throttle: vi.fn((fn: any) => fn),
    debounce: vi.fn((fn: any) => fn),
  },
}));

vi.mock('@/providers/storeProvider/authStoreProvider', () => ({
  useAuthState: vi.fn(() => mockStores.auth.user),
  useAuthActions: vi.fn((selector) => selector(mockStores.auth.actions)),
  AuthStoreProvider: ({ children }: { children: ReactNode }) => children,
}));

vi.mock('@/providers/storeProvider/gameStoreProvider', () => ({
  useGameState: vi.fn(() => mockStores.game.state),
  useGameActions: vi.fn((selector) => selector(mockStores.game.actions)),
  GameStoreProvider: ({ children }: { children: ReactNode }) => children,
}));

vi.mock('@/providers/storeProvider/playerStoreProvider', () => ({
  usePlayerState: vi.fn(() => mockStores.player.curPlayers),
  usePlayerActions: vi.fn((selector) => selector(mockStores.player.actions)),
  PlayerStoreProvider: ({ children }: { children: ReactNode }) => children,
}));

vi.mock('@/providers/storeProvider/wordStoreProvider', () => ({
  useWordState: vi.fn(() => mockStores.word.words),
  useWordActions: vi.fn((selector) => selector(mockStores.word.actions)),
  WordStoreProvider: ({ children }: { children: ReactNode }) => children,
}));

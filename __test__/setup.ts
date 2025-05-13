import '@testing-library/jest-dom';

import { type ReactNode } from 'react';

import { server } from './mocks/server';
import { mockStores } from './mocks/zustand-store';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
  usePathname: vi.fn(),
}));

vi.mock('lodash', () => ({
  default: {
    throttle: vi.fn((fn: any) => fn),
    debounce: vi.fn((fn: any) => fn),
  },
}));

vi.mock('zustand');

vi.mock('@/utils/room/createRoomId', () => ({
  createRoomId: vi.fn(() => 'ABCDEF'),
}));

vi.mock('@/hooks/useWord', () => ({
  isValidWord: true,
  enterWordAndCheck: vi.fn().mockReturnValue(true),
}));

vi.mock('@/providers/storeProvider/authStoreProvider', () => ({
  useAuthState: vi.fn((selector) => selector(mockStores.auth)),
  useAuthActions: vi.fn((selector) => selector(mockStores.auth.actions)),
  AuthStoreProvider: ({ children }: { children: ReactNode }) => children,
}));

vi.mock('@/providers/storeProvider/gameStoreProvider', () => ({
  useGameState: vi.fn((selector) => selector(mockStores.game.state)),
  useGameActions: vi.fn((selector) => selector(mockStores.game.actions)),
  GameStoreProvider: ({ children }: { children: ReactNode }) => children,
}));

vi.mock('@/providers/storeProvider/playerStoreProvider', () => ({
  usePlayerState: vi.fn((selector) => selector(mockStores.player)),
  usePlayerActions: vi.fn((selector) => selector(mockStores.player.actions)),
  PlayerStoreProvider: ({ children }: { children: ReactNode }) => children,
}));

vi.mock('@/providers/storeProvider/wordStoreProvider', () => ({
  useWordState: vi.fn((selector) => selector(mockStores.word.state)),
  useWordActions: vi.fn((selector) => selector(mockStores.word.actions)),
  WordStoreProvider: ({ children }: { children: ReactNode }) => children,
}));

vi.mock('@/providers/storeProvider/countStoreProvider', () => ({
  useCountState: vi.fn((selector) => selector(mockStores.count.state)),
  useCountActions: vi.fn((selector) => selector(mockStores.count.actions)),
  CountStoreProvider: ({ children }: { children: ReactNode }) => children,
}));

vi.mock('@/providers/storeProvider/fireworksStoreProvider', () => ({
  useFireworksState: vi.fn((selector) => selector(mockStores.fireworks)),
  useFireworksActions: vi.fn((selector) => selector(mockStores.fireworks.actions)),
  FireworksStoreProvider: ({ children }: { children: ReactNode }) => children,
}));

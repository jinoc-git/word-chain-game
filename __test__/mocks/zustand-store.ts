import { mockPlayers } from './players';

const mockUser = { id: '123456789', nickname: 'test' };
const mockWords = ['대나무', '무다리', '리어카'];

export const mockStores = {
  auth: {
    user: mockUser,
    actions: {
      login: vi.fn(),
      logout: vi.fn(),
      checkLogin: vi.fn(() => true),
      syncAuth: vi.fn(),
    },
  },
  player: {
    curPlayers: mockPlayers,
    actions: {
      initPlayer: vi.fn(),
      playerObserver: vi.fn(() => ({ unsubscribe: vi.fn() })),
      quitGameAndOffObserver: vi.fn(),
      isRoomChief: vi.fn(() => true),
    },
  },
  word: {
    state: {
      totalWordsCount: 0,
      words: mockWords,
    },
    actions: {
      // getWordsCount: vi.fn(),
      getLastWord: vi.fn(),
      pushNewWord: vi.fn(),
      resetWords: vi.fn(),
    },
  },
  game: {
    state: {
      gameState: false,
      isWaitingTurn: true,
    },
    actions: {
      startGame: vi.fn(),
      endGame: vi.fn(),
      setIsWaitingTurn: vi.fn(),
    },
  },
  count: {
    state: {
      _timeoutId: undefined,
      isActiveCount: false,
      count: 10,
    },
    actions: {
      startCount: vi.fn(),
      endCount: vi.fn(),
      resetCount: vi.fn(),
      pauseCount: vi.fn(),
      resumeCount: vi.fn(),
      _clearTimeout: vi.fn(),
    },
  },
  fireworks: {
    controller: null,
    actions: {
      onInitHandler: vi.fn(),
      onShoot: vi.fn(),
    },
  },
};

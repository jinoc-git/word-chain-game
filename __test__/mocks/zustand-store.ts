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
      playerObserver: vi.fn(),
      quitGameAndOffObserver: vi.fn(),
      isRoomChief: vi.fn(() => true),
    },
  },
  word: {
    words: mockWords,
    actions: {
      getWordsCount: vi.fn(),
      getLastWord: vi.fn(),
      pushNewWord: vi.fn(),
    },
  },
  game: {
    gameState: false,
    actions: {
      startGame: vi.fn(),
      endGame: vi.fn(),
    },
  },
};

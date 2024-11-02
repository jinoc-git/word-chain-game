import { render, screen } from '@testing-library/react';

import Players from '@/components/game/players/Players';
import { createMockSocket, deleteMockSocket } from '__test__/utils';

import type { PlayerType } from '@/store/playerStore';
import type { MockSocket } from '__test__/utils';

// socket io 모킹 후 faker 사용 예정
const mockPlayers: PlayerType[] = [
  { socketId: 'a1', userId: 'a1', nickname: 'a1', isRoomChief: true },
  { socketId: 'a2', userId: 'a2', nickname: 'a2', isRoomChief: false },
  { socketId: 'a3', userId: 'a3', nickname: 'a3', isRoomChief: false },
];

describe('Players', () => {
  const mockSocket: MockSocket = {
    io: null,
    serverSocket: null,
    clientSocket: null,
  };

  beforeEach(async () => {
    await createMockSocket(mockSocket);

    vi.mock('@/store/playerStore', () => ({
      usePlayerState: vi.fn(() => mockPlayers),
      usePlayerActions: vi.fn(() => ({
        initPlayer: vi.fn(),
        playerObserver: vi.fn(),
        quitGameAndOffObserver: vi.fn(),
        isRoomChief: vi.fn(() => true),
      })),
    }));

    render(<Players />);
  });

  afterAll(() => {
    vi.clearAllMocks();

    deleteMockSocket(mockSocket);
  });

  it.each(mockPlayers)('should render players nickname', ({ userId, nickname }) => {
    const playerChip = screen.getByTestId(userId);

    expect(playerChip).toBeInTheDocument();
    expect(playerChip).toHaveTextContent(nickname);
  });
});

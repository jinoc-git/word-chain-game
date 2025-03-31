import { render, screen } from '@testing-library/react';

import Players from '@/components/game/players/Players';
import { mockPlayers, mockRoomChief } from '__test__/mocks/players';
import { createMockSocket, deleteMockSocket } from '__test__/utils';

import type { PlayerType } from '@/stores/playerStore';
import type { MockSocket } from '__test__/utils';

describe('Players', () => {
  const mockSocket: MockSocket = {
    io: null,
    serverSocket: null,
    clientSocket: null,
  };

  beforeEach(async () => {
    await createMockSocket(mockSocket);

    vi.mock('@/providers/storeProvider/playerStoreProvider', () => ({
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

  it('should render room chief', () => {
    return new Promise<void>((resolve) => {
      mockSocket.clientSocket?.on('createRoomSuccess', ({ userId, nickname }: PlayerType) => {
        const playerChip = screen.getByTestId(userId);

        expect(playerChip).toBeInTheDocument();
        expect(playerChip).toHaveTextContent(nickname);

        resolve();
      });

      mockSocket.serverSocket?.emit('createRoomSuccess', mockRoomChief);
    });
  });
});

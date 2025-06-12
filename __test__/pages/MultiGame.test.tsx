import { render } from '@testing-library/react';

import { mockingCookies, mockingParams, mockingPathname } from '__test__/utils';

describe('MultiGame', () => {
  beforeAll(() => {
    vi.mock('@/lib/serverActions/addRoomParticipants', () => ({
      addRoomParticipants: vi.fn(() => true),
    }));
  });

  const renderComponent = async () => {
    const mockRoomCode = 'ABCDEF';
    mockingPathname(`/game/multi/${mockRoomCode}`);
    mockingParams({ roomCode: mockRoomCode });
    mockingCookies('player123');

    const params = Promise.resolve({ roomCode: mockRoomCode });
    const { default: MultiGamePage } = await import('@/app/game/multi/[roomCode]/page');
    const page = await MultiGamePage({ params });
    render(page);
  };

  it('should render', async () => {
    await renderComponent();
  });
});

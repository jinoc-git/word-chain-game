import { render } from '@testing-library/react';

import { mockingCookies, mockingParams, mockingPathname } from '__test__/utils';

describe('MultiGame', () => {
  beforeAll(() => {
    vi.mock('@/lib/serverActions/addRoomParticipants', () => ({
      addRoomParticipants: vi.fn(() => true),
    }));
  });

  const renderComponent = async () => {
    const mockRoomId = 'ABCDEF';
    mockingPathname(`/game/multi/${mockRoomId}`);
    mockingParams({ roomId: mockRoomId });
    mockingCookies('player123');

    const params = Promise.resolve({ roomId: mockRoomId });
    const { default: MultiGamePage } = await import('@/app/game/multi/[roomId]/page');
    const page = await MultiGamePage({ params });
    render(page);
  };

  it('should render', async () => {
    await renderComponent();
  });
});

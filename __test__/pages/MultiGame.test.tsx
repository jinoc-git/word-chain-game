import { render } from '@testing-library/react';
import { useParams, usePathname } from 'next/navigation';

describe('MultiGame', () => {
  const renderComponent = async () => {
    vi.mocked(usePathname).mockReturnValue('/game/multi/ABCDEF');
    vi.mocked(useParams).mockReturnValue({ gameId: 'ABCDEF' });
    const params = Promise.resolve({ gameId: 'ABCDEF' });
    const { default: MultiGamePage } = await import('@/app/game/multi/[gameId]/page');
    const page = await MultiGamePage({ params });
    render(page);
  };

  it('should render', async () => {
    await renderComponent();
  });
});

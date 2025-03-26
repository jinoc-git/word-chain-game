import { render } from '@testing-library/react';
import { useParams } from 'next/navigation';

import Game from '@/app/game/[mode]/[gameId]/page';

describe('Game', () => {
  it('should render', () => {
    vi.mocked(useParams).mockReturnValue({ mode: 'multi', gameId: 'abcdef' });
    render(<Game />);

    // const a = screen;
  });
});

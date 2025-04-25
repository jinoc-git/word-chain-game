import { render } from '@testing-library/react';
import { useParams, usePathname } from 'next/navigation';

import MultiGame from '@/app/game/multi/[gameId]/page';

describe('MultiGame', () => {
  it('should render', () => {
    vi.mocked(usePathname).mockReturnValue('/game/multi/abcdef');
    vi.mocked(useParams).mockReturnValue({ gameId: 'abcdef' });
    render(<MultiGame />);
  });
});

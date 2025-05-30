import { render } from '@testing-library/react';
import { useParams, usePathname } from 'next/navigation';

import SoloGame from '@/app/game/solo/[roomId]/page';

describe('SoloGame', () => {
  it('should render', () => {
    vi.mocked(usePathname).mockReturnValue('/game/solo/abcdef');
    vi.mocked(useParams).mockReturnValue({ gameId: 'abcdef' });
    render(<SoloGame />);

    // const a = screen;
  });
});

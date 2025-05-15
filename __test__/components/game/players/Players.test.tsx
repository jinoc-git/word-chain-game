import { render } from '@testing-library/react';

import Players from '@/components/game/players/Players';

describe('Players', () => {
  beforeEach(async () => {
    render(<Players />);
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should render room chief', () => {});
});

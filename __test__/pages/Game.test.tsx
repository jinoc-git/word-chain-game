import { render } from '@testing-library/react';

import Game from '@/app/game/[mode]/[gameId]/page';

describe('Game', () => {
  it('should render', () => {
    render(<Game />);

    // const a = screen;
  });
});

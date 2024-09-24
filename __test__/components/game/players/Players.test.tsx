import { render, screen } from '@testing-library/react';

import Players, { mockPlayers } from '@/components/game/players/Players';

describe('Players', () => {
  beforeEach(() => {
    render(<Players />);
  });

  it.each(mockPlayers)('should render players nickname', ({ nickname, id }) => {
    const playerChip = screen.getByTestId(id);

    expect(playerChip).toBeInTheDocument();
    expect(playerChip).toHaveTextContent(nickname);
  });
});

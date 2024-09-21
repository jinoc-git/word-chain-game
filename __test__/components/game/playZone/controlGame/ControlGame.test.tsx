import { render, screen } from '@testing-library/react';

import ControlGame from '@/components/game/playZone/controlGame/ControlGame';

describe('ControlGame', () => {
  it('should render buttons', () => {
    render(<ControlGame />);

    const startButton = screen.getByRole('button', { name: /게임 시작/i });
    const endButton = screen.getByRole('button', { name: /게임 중단/i });

    expect(startButton).toBeInTheDocument();
    expect(endButton).toBeInTheDocument();
  });
});

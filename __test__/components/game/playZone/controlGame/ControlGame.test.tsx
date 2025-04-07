import { render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';

import ControlGame from '@/components/game/playZone/controlGame/ControlGame';

describe('ControlGame when solo game', () => {
  beforeAll(() => {
    vi.mocked(useParams).mockReturnValue({ mode: 'solo', gameId: 'abcdef' });
  });

  it('should 게임 시작 button is disabled when 게임 시작 button clicked ', () => {
    render(<ControlGame />);

    const startButton = screen.getByRole('button', { name: /게임 시작/i });

    expect(startButton).toHaveAttribute('data-disabled', 'true');
  });
});
// 방장일 때, 아닐 때 테스트 추가 예정
describe('ControlGame when multi game', () => {
  beforeAll(() => {
    vi.mocked(useParams).mockReturnValue({ mode: 'multi', gameId: 'abcdef' });
  });

  it('should render buttons', () => {
    render(<ControlGame />);

    const startButton = screen.getByRole('button', { name: /게임 시작/i });
    const endButton = screen.getByRole('button', { name: /게임 종료/i });

    expect(startButton).toBeInTheDocument();
    expect(endButton).toBeInTheDocument();
  });
});

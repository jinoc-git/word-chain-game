import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useParams } from 'next/navigation';

import ControlGame from '@/components/game/playZone/controlGame/ControlMultiGame';

describe('ControlGame when solo game', () => {
  beforeAll(() => {
    vi.mocked(useParams).mockReturnValue({ mode: 'solo', gameId: 'abcdef' });
  });

  it('게임 시작, 종료 버튼 서로 토글되면서 disabled 되는지 ', async () => {
    render(<ControlGame />);

    const startButton = screen.getByRole('button', { name: /게임 시작/i });
    expect(startButton).not.toBeDisabled();
    const endButton = screen.getByRole('button', { name: /게임 종료/i });
    expect(endButton).toBeDisabled();

    const user = userEvent.setup();
    await user.click(startButton);

    // zustand 제대로 모킹한 후 테스트 예정
    // expect(startButton).toBeDisabled();
    // expect(endButton).not.toBeDisabled();

    // console.log(startButton);
    // await waitFor(() => {
    //   expect(startButton).toBeDisabled();
    // });
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

import { render, screen } from '@testing-library/react';

import EnterWord from '@/components/game/playZone/enterWord/EnterWord';

describe('EnterWord', () => {
  it('should render input', () => {
    render(<EnterWord />);

    const input = screen.getByPlaceholderText(/상대를 기다리는 중.../i);

    expect(input).toBeInTheDocument();
  });

  it('should disabled when waiting turn', () => {
    render(<EnterWord />);

    const input = screen.getByPlaceholderText(/상대를 기다리는 중.../i);

    expect(input).toBeDisabled();
  });

  // it('should not disabled when isWaitingTurn is false', async () => {
  //   vi.mocked(useGameState).mockReturnValue({
  //     gameState: false,
  //     isWaitingTurn: false,
  //   });

  //   render(<EnterWord />);

  //   const input = await screen.findByPlaceholderText(/단어를 입력하세요!/i);

  //   // const afterInput = await screen.findByPlaceholderText(/단어를 입력하세요!/i);
  //   // console.log(afterInput);

  //   expect(input).not.toBeDisabled();
  // });
});

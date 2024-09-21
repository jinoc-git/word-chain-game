import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EnterWord from '@/components/game/playZone/enterWord/EnterWord';

describe('EnterWord', () => {
  it('should render input', () => {
    render(<EnterWord />);

    const input = screen.getByPlaceholderText(/단어를 입력하세요/i);

    expect(input).toBeInTheDocument();
  });

  it('should render error message if enter empty', async () => {
    render(<EnterWord />);

    const input = screen.getByPlaceholderText(/단어를 입력하세요/i);
    const user = userEvent.setup();
    await user.type(input, '{enter}');

    const warnMessage = await screen.findByText(/단어를 입력해 주세요/i);
    expect(warnMessage).toBeInTheDocument();
  });
});

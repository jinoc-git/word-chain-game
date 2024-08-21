import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Loby from '@/app/loby/page';

describe('Loby Page', () => {
  const renderComponent = () => {
    render(<Loby />);

    const getButtons = () => {
      return {
        playSoloButton: screen.getByRole('button', { name: /혼자 하기/i }),
        makeRoomButton: screen.getByRole('button', { name: /방 만들기/i }),
        enterRoomButton: screen.getByRole('button', { name: /방 참여하기/i }),
      };
    };

    return {
      getButtons,
      roomCodeInput: screen.getByPlaceholderText(/방 코드 입력하기/i),
      user: userEvent.setup(),
    };
  };

  it('should render heading', () => {
    renderComponent();

    const heading = screen.getByRole('heading', { name: /끝말잇기/i });

    expect(heading).toBeInTheDocument();
  });

  it('should render buttons', () => {
    const { getButtons } = renderComponent();

    const { playSoloButton, makeRoomButton, enterRoomButton } = getButtons();

    expect(playSoloButton).toBeInTheDocument();
    expect(makeRoomButton).toBeInTheDocument();
    expect(enterRoomButton).toBeInTheDocument();
  });

  it('should render room code input', () => {
    const { roomCodeInput } = renderComponent();

    expect(roomCodeInput).toBeInTheDocument();
  });

  it('should disabled enter room button', () => {
    const { getButtons } = renderComponent();

    const { enterRoomButton } = getButtons();

    expect(enterRoomButton).toBeDisabled();
  });

  it('should enabled enter room button if room code is valid', async () => {
    const { roomCodeInput, getButtons, user } = renderComponent();

    const { enterRoomButton } = getButtons();
    await user.type(roomCodeInput, 'ABCDEF');

    expect(enterRoomButton).not.toBeDisabled();
  });
});

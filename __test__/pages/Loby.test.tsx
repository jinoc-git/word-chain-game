import { render, screen } from '@testing-library/react';

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
});

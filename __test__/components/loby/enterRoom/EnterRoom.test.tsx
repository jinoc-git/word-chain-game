import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EnterRoom from '@/components/loby/playMulti/enterRoom/EnterRoom';
import { mockStores } from '__test__/mocks/zustand-store';

describe('EnterRoom', () => {
  const renderComponent = () => {
    render(<EnterRoom user={mockStores.auth.user} />);

    return {
      roomCodeInput: screen.getByPlaceholderText(/방 코드 입력하기/i),
      enterRoomButton: screen.getByRole('button', { name: /방 참여하기/i }),
      user: userEvent.setup(),
    };
  };

  it('should disabled enter room button', () => {
    const { enterRoomButton } = renderComponent();

    expect(enterRoomButton).toBeDisabled();
  });

  it('should enabled enter room button if room code is valid', async () => {
    const { roomCodeInput, enterRoomButton, user } = renderComponent();

    await user.type(roomCodeInput, 'ABCDEF');

    expect(enterRoomButton).not.toBeDisabled();
  });

  it('should disabled enter room button if room code is not valid', async () => {
    const { roomCodeInput, enterRoomButton, user } = renderComponent();

    await user.type(roomCodeInput, 'ABCDE');
    expect(enterRoomButton).toBeDisabled();

    await user.clear(roomCodeInput);
    await user.type(roomCodeInput, 'ㄱㄴㄷㄹㅁㅂ');
    expect(enterRoomButton).toBeDisabled();
  });
});

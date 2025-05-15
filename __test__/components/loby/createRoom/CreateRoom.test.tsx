import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { useRouter } from 'next/navigation';

import CreateRoom from '@/components/loby/playMulti/createRoom/CreateRoom';
import { mockRoom } from '__test__/mocks/room';
import { server } from '__test__/mocks/server';

import type { UserType } from '@/types/auth.type';

describe('CreateRoom', () => {
  const renderComponent = () => {
    const mockUser: UserType = { id: '123456789', nickname: 'test' };
    render(<CreateRoom user={mockUser} />);
  };

  it('방 생성이 성공했을 때', async () => {
    renderComponent();

    const user = userEvent.setup();
    const makeRoomButton = screen.getByRole('button', { name: /방 만들기/i });
    await user.click(makeRoomButton);

    const router = useRouter();
    expect(router.push).toHaveBeenCalledWith(`/game/multi/${mockRoom.room_code}`);
  });

  it('방 생성이 실패했을 때', () => {
    const mockFailRes = {
      success: false,
      room: null,
    };
    server.use(http.post('/api/create', () => HttpResponse.json(mockFailRes)));
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

import CreateRoom from '@/components/loby/createRoom/CreateRoom';
import { createRoomId } from '@/utils/createRoomId';

import type { UserType } from '@/types/auth.type';

describe('CreateRoom', () => {
  it('should change pathname when make room button is clicked', async () => {
    const mockUser: UserType = { id: '123456789', nickname: 'test' };
    render(<CreateRoom user={mockUser} createSocketRoom={vi.fn().mockResolvedValue(true)} />);

    const router = useRouter();
    const user = userEvent.setup();
    const makeRoomButton = screen.getByRole('button', { name: /방 만들기/i });
    await user.click(makeRoomButton);

    expect(router.push).toHaveBeenCalledWith(`/game/multi/${createRoomId()}`);
  });
});

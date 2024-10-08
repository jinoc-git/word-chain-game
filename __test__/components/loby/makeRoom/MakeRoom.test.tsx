import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

import MakeRoom from '@/components/loby/createRoom/CreateRoom';

describe('MakeRoom', () => {
  it('should change pathname when make room button is clicked', async () => {
    render(<MakeRoom />);

    const router = useRouter();
    const user = userEvent.setup();
    const makeRoomButton = screen.getByRole('button', { name: /방 만들기/i });
    await user.click(makeRoomButton);

    expect(router.push).toHaveBeenCalledWith(`/game`);
  });
});

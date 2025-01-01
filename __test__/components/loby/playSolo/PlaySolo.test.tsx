import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

import PlaySolo from '@/components/loby/playSolo/PlaySolo';
import { createRoomId } from '@/utils/createRoomId';

describe('PlaySolo', () => {
  it('should change pathname when play solo button is clicked', async () => {
    render(<PlaySolo />);

    const router = useRouter();
    const user = userEvent.setup();
    const playSoloButton = screen.getByRole('button', { name: /혼자 하기/i });
    await user.click(playSoloButton);

    expect(router.push).toHaveBeenCalledWith(`/game/solo/${createRoomId()}`);
  });
});

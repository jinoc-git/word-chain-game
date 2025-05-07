'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

import { createRoomId } from '@/utils/createRoomId';

import type { UserType } from '@/types/auth.type';

interface Props {
  user: UserType | null;
}

const CreateRoom = ({ user }: Props) => {
  const router = useRouter();

  const handleCreateRoom = async () => {
    if (!user) return;
    const roomId = createRoomId();

    router.push(`/game/multi/${roomId}`);
    // if (isValidRoomId)
    // else handleCreateRoom();
  };

  return (
    <Button color="primary" variant="shadow" onClick={handleCreateRoom}>
      방 만들기
    </Button>
  );
};

export default CreateRoom;

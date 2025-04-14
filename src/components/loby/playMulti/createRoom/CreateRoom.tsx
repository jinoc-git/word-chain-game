'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

import { createRoomId } from '@/utils/createRoomId';

import type { CreateOrJoinSocketRoomArgs } from '@/hooks/useSocket';
import type { UserType } from '@/types/auth.type';
import type { DebouncedFuncLeading } from 'lodash';

interface Props {
  user: UserType | null;
  createSocketRoom: DebouncedFuncLeading<(args: CreateOrJoinSocketRoomArgs) => Promise<boolean>>;
}

const CreateRoom = ({ user, createSocketRoom }: Props) => {
  const router = useRouter();

  const handleCreateRoom = async () => {
    if (!user) return;
    const roomId = createRoomId();

    const isValidRoomId = await createSocketRoom({
      roomId,
      userId: user.id,
      nickname: user.nickname,
    });

    if (isValidRoomId) router.push(`/game/multi/${roomId}`);
    // else handleCreateRoom();
  };

  return (
    <Button color="primary" variant="shadow" onClick={handleCreateRoom}>
      방 만들기
    </Button>
  );
};

export default CreateRoom;

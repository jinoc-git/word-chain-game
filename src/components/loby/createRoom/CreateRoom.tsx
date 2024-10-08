'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import short from 'short-uuid';

import type { CreateOrJoinSocketRoomArgs } from '@/hooks/useSocket';
import type { UserType } from '@/types/auth.type';

interface Props {
  user: UserType | null;
  createSocketRoom: (args: CreateOrJoinSocketRoomArgs) => boolean;
}

const CreateRoom = ({ user, createSocketRoom }: Props) => {
  const router = useRouter();

  const handleCreateRoom = async () => {
    const originCode = short.generate();
    const shortCode = originCode.slice(0, 6).toUpperCase();

    router.push(`/game/multi/${shortCode}`);
  };

  return (
    <Button color="primary" variant="shadow" onClick={handleCreateRoom}>
      방 만들기
    </Button>
  );
};

export default CreateRoom;

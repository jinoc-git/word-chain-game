'use client';

import React from 'react';
import { toast } from 'react-toastify';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

import { createRoom, type CreateRoomArgs } from '@/lib/createRoom';
import { createRoomId } from '@/utils/room/createRoomId';

import type { UserType } from '@/types/auth.type';

interface Props {
  user: UserType | null;
}

const CreateRoom = ({ user }: Props) => {
  const router = useRouter();

  const handleCreateRoom = async () => {
    if (!user) return;

    const newRoom: CreateRoomArgs = {
      nickname: user.nickname,
      hostId: user.id,
      roomId: createRoomId(),
    };

    const res = await createRoom(newRoom);

    if (res.success) {
      router.push(`/game/multi/${res.room.room_code}`);
    } else {
      toast.error('방 생성에 실패했습니다.');
    }
  };

  return (
    <Button color="primary" variant="shadow" onClick={handleCreateRoom}>
      방 만들기
    </Button>
  );
};

export default CreateRoom;

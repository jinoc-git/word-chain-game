'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import short from 'short-uuid';

import { EnterRoomSchema } from '@/schema/enterRoomSchema';

import type { CreateOrJoinSocketRoomArgs } from '@/hooks/useSocket';
import type { UserType } from '@/types/auth.type';
import type { z } from 'zod';

type EnterRoomInput = z.infer<typeof EnterRoomSchema>;

interface Props {
  user: UserType | null;
  joinSocketRoom: (args: CreateOrJoinSocketRoomArgs) => boolean;
}

const EnterRoom = ({ user, joinSocketRoom }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EnterRoomInput>({
    resolver: zodResolver(EnterRoomSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<EnterRoomInput> = ({ roomId }) => {
    const originCode = short.generate();
    const shortCode = originCode.slice(0, 6).toUpperCase();
    console.log(originCode, shortCode);
    router.push(`/game/multi/${roomId}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-2">
      <Input
        {...register('roomId')}
        type="text"
        placeholder="방 코드 입력하기"
        size="md"
        className="w-1/2"
      />
      <Button
        type="submit"
        color="primary"
        variant="shadow"
        isDisabled={!isValid}
        className="w-1/2"
      >
        방 참여하기
      </Button>
    </form>
  );
};

export default EnterRoom;

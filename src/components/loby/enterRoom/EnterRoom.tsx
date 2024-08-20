'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import short from 'short-uuid';

import { EnterRoomSchema } from '@/schema/enterRoomSchema';

import type { z } from 'zod';

type EnterRoomInput = z.infer<typeof EnterRoomSchema>;

const EnterRoom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EnterRoomInput>({
    resolver: zodResolver(EnterRoomSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<EnterRoomInput> = (data) => {
    const originCode = short.generate();
    const shortCode = originCode.slice(0, 6).toUpperCase();
    console.log(originCode, shortCode);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-2">
      <Input
        {...register('roomCode')}
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

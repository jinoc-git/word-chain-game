'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { EnterRoomSchema } from '@/schema/enterRoomSchema';

import type { UserType } from '@/types/auth.type';
import type { z } from 'zod';

type EnterRoomInput = z.infer<typeof EnterRoomSchema>;

interface Props {
  user: UserType | null;
}

const EnterRoom = ({ user }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setFocus,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<EnterRoomInput>({
    resolver: zodResolver(EnterRoomSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<EnterRoomInput> = async ({ roomId }) => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    router.push(`/game/multi/${roomId}`);
    // if (isValidRoomId)
    // else setFocus('roomId');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-2">
      <Input
        {...register('roomId')}
        type="text"
        placeholder="방 코드 입력하기"
        size="md"
        autoComplete="off"
        className="w-1/2 uppercase-input"
        minLength={6}
        maxLength={6}
        onValueChange={(val) => {
          const en = /^[a-z]*$/i;
          if (en.test(val)) {
            setValue('roomId', val.toUpperCase(), {
              shouldValidate: true,
            });
          }
        }}
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

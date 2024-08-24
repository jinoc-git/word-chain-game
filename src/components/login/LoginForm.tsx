'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { loginFormSchema } from '@/schema/loginFormSchema';

import type { z } from 'zod';

type LoginFormInput = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    console.log(data);
    router.push('/loby');
  };

  return (
    <Card className="main-layout">
      <CardHeader>
        <h2 className=" font-semibold">닉네임 입력</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3">
          <p className="text-sm text-red-600">{errors.nickname?.message}</p>
          <Input
            {...register('nickname')}
            type="text"
            label="닉네임"
            placeholder="사용할 닉네임을 입력해 주세요"
            size="md"
          />
          <Button type="submit" color="primary" isDisabled={!isValid} className="w-full">
            로그인
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
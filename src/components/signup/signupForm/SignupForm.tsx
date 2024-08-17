'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardBody, CardHeader, Input, Link } from '@nextui-org/react';

import { signupFormSchema } from '@/schema/signupFormSchema';

import type { z } from 'zod';

type SignupFormRegisterInput = z.infer<typeof signupFormSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormRegisterInput>({
    resolver: zodResolver(signupFormSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<SignupFormRegisterInput> = async (data) => {
    console.log(data);
  };

  return (
    <Card className="main-layout">
      <CardHeader>
        <h1>회원가입</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3">
          <Input
            {...register('email')}
            type="email"
            label="이메일"
            placeholder="이메일을 입력해 주세요"
            size="md"
          />
          <Input
            {...register('password')}
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            size="md"
          />
          <Input
            {...register('confirmPassword')}
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해 주세요"
            size="md"
          />
          <Button type="submit" color="primary" isDisabled={!isValid} className="w-full">
            회원가입
          </Button>
        </form>
        <div className="flex-box !mt-5">
          <Link href="/signin" underline="always" color="foreground" className="text-sm">
            로그인하러가기
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default SignupForm;

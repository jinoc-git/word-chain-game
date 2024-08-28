'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@nextui-org/react';

import { enterWordSchema } from '@/schema/enterWordSchema';

import type { z } from 'zod';

type EnterWordInput = z.infer<typeof enterWordSchema>;

const EnterWord = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EnterWordInput>({
    resolver: zodResolver(enterWordSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<EnterWordInput> = async ({ enterWord }) => {
    console.log('in', enterWord);
  };

  return (
    <div className="flexCol gap-2 items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input {...register('enterWord')} variant="bordered" />
        <button type="submit" className="hidden">
          제출
        </button>
      </form>
      <p className=" text-red-600">{errors.enterWord?.message}</p>
    </div>
  );
};

export default EnterWord;

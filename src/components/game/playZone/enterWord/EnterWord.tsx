'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@nextui-org/react';

import useCheckValidWord from '@/hooks/useCheckValidWord';
import { enterWordSchema } from '@/schema/enterWordSchema';

import type { z } from 'zod';

type EnterWordInput = z.infer<typeof enterWordSchema>;

const EnterWord = () => {
  const { checkFirstCharacter } = useCheckValidWord();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EnterWordInput>({
    resolver: zodResolver(enterWordSchema),
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<EnterWordInput> = async ({ enterWord }) => {
    console.log('in', enterWord);
    const isValidFirstCharacter = checkFirstCharacter(enterWord, enterWord);
  };

  return (
    <div className="flexCol gap-2 items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input
          {...register('enterWord')}
          variant="bordered"
          className={` ${errors.enterWord?.message ? 'animate-shake' : ''}`}
        />
        <button type="submit" className="hidden">
          제출
        </button>
      </form>
      <p className=" text-red-600">{errors.enterWord?.message}</p>
    </div>
  );
};

export default EnterWord;

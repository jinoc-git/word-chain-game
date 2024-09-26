'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@nextui-org/react';

import useShakeAnimate from '@/hooks/useShakeAnimate';
import useWords from '@/hooks/useWords';
import { enterWordSchema } from '@/schema/enterWordSchema';

import type { z } from 'zod';

type EnterWordInput = z.infer<typeof enterWordSchema>;

const EnterWord = () => {
  const { isShake, handleShake } = useShakeAnimate();

  const { isValidWord, enterWordAndCheck } = useWords();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnterWordInput>({
    resolver: zodResolver(enterWordSchema),
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<EnterWordInput> = async ({ enterWord }) => {
    console.log('in', enterWord);
    const isValidFirstCharacter = enterWordAndCheck(enterWord);
    if (!isValidFirstCharacter) {
      handleShake();
      return;
    }
  };

  return (
    <div className="flexCol gap-2 items-center mt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input
          {...register('enterWord')}
          variant="bordered"
          placeholder="단어를 입력하세요."
          className={`${isShake ? 'animate-shake' : ''}`}
        />
        <button type="submit" className="hidden" disabled={isSubmitting}>
          제출
        </button>
      </form>
      <p className=" text-red-600">{errors.enterWord?.message}</p>
    </div>
  );
};

export default EnterWord;

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
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EnterWordInput>({
    resolver: zodResolver(enterWordSchema),
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<EnterWordInput> = async ({ enterWord }) => {
    const isValid = await enterWordAndCheck(enterWord);
    if (!isValid) {
      handleShake();
      setError('enterWord', { type: '401', message: '없는 단어입니다!' });
      return;
    }

    reset();
  };

  return (
    <div className="flexCol gap-2 items-center mt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input
          {...register('enterWord')}
          variant="bordered"
          placeholder="단어를 입력하세요."
          isInvalid={!isValidWord}
          errorMessage={errors.enterWord?.message}
          className={`${isShake ? 'animate-shake' : ''}`}
        />
        <button type="submit" className="hidden" disabled={isSubmitting}>
          제출
        </button>
      </form>
    </div>
  );
};

export default EnterWord;

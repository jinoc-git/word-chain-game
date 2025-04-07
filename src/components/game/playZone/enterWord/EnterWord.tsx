'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@nextui-org/react';

import useShakeAnimate from '@/hooks/useShakeAnimate';
import useWords from '@/hooks/useWords';
import { useGameState } from '@/providers/storeProvider/gameStoreProvider';
import { enterWordSchema } from '@/schema/enterWordSchema';

import type { z } from 'zod';

type EnterWordInput = z.infer<typeof enterWordSchema>;

const EnterWord = () => {
  const { isShake, handleShake } = useShakeAnimate();
  const { isValidWord, checkWord, pushNewWord } = useWords();

  const isWaitingTurn = useGameState((state) => state.isWaitingTurn);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isSubmitting },
  } = useForm<EnterWordInput>({
    resolver: zodResolver(enterWordSchema),
    mode: 'onSubmit',
  });

  React.useEffect(() => {
    if (!isWaitingTurn) setFocus('enterWord');
  }, [isWaitingTurn]);

  const onSubmit: SubmitHandler<EnterWordInput> = async ({ enterWord }) => {
    const isValid = await checkWord(enterWord);
    if (!isValid) {
      handleShake();
      reset();
      return;
    }

    pushNewWord(enterWord);
    reset();

    // const res = await postWordToAIAndGetNextWord(enterWord);

    // if (res) {
    //   const isAIDefeated = checkAIDefeated(enterWord, res);
    //   pushNewWord(res);
    // }
  };

  return (
    <div className="flexCol gap-2 items-center mt-3">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input
          {...register('enterWord')}
          variant="bordered"
          placeholder={isWaitingTurn ? '상대를 기다리는 중...' : '단어를 입력하세요!'}
          disabled={isWaitingTurn}
          autoComplete="off"
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

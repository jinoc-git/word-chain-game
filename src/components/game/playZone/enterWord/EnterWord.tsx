'use client';

import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@nextui-org/react';

import useShakeAnimate from '@/hooks/useShakeAnimate';
import { useGameActions, useGameState } from '@/providers/storeProvider/gameStoreProvider';
import { useWordActions } from '@/providers/storeProvider/wordStoreProvider';
import { enterWordSchema } from '@/schema/enterWordSchema';
import { checkWordIsValid } from '@/utils/word/checkWordValid';

import type { RealtimeChannel } from '@supabase/supabase-js';
import type { z } from 'zod';

type EnterWordInput = z.infer<typeof enterWordSchema>;

interface Props {
  isSoloGame: boolean;
  roomCode: string;
}

const EnterWord = ({ isSoloGame, roomCode }: Props) => {
  const { isShake, handleShake } = useShakeAnimate();

  const isWaitingTurn = useGameState((state) => state.isWaitingTurn);
  const setIsWaitingTurn = useGameActions((actions) => actions.setIsWaitingTurn);
  const { pushNewWord, getLastWord, streamWord } = useWordActions((actions) => actions);

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

  const onSubmit: SubmitHandler<EnterWordInput> = async ({ enterWord }) => {
    const isValid = await checkWordIsValid(getLastWord(), enterWord);
    if (!isValid) {
      handleShake();
      reset();
      return;
    }
    // 솔로, 멀티 구분해야함.
    if (isSoloGame) {
      pushNewWord(enterWord);
      reset();
      setIsWaitingTurn(true);
    } else {
    }
    // pushNewWord(enterWord);
    // reset();
    // setIsWaitingTurn(true);
  };

  const channelRef = React.useRef<null | RealtimeChannel>(null);

  React.useEffect(() => {
    if (!isSoloGame) {
      const channel = streamWord(roomCode);
      channelRef.current = channel;
    }
    return () => {
      channelRef.current?.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (!isWaitingTurn) setFocus('enterWord');
    else reset();
  }, [isWaitingTurn]);

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

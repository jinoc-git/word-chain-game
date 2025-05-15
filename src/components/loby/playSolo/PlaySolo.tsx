'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

import { createRoomId } from '@/utils/room/createRoomId';

const PlaySolo = () => {
  const router = useRouter();
  // const initPlayer = usePlayerActions((actions) => actions.initPlayer);

  const handlePlaySolo = async () => {
    const roomId = createRoomId();

    router.push(`/game/solo/${roomId}`);
  };

  return (
    <Button color="primary" variant="shadow" onClick={handlePlaySolo}>
      혼자 하기
    </Button>
  );
};

export default PlaySolo;

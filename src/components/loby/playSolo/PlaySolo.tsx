'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

import { createRoomCode } from '@/utils/room/room';

const PlaySolo = () => {
  const router = useRouter();

  const handlePlaySolo = async () => {
    const roomCode = createRoomCode();

    router.push(`/game/solo/${roomCode}`);
  };

  return (
    <Button color="primary" variant="shadow" onClick={handlePlaySolo}>
      혼자 하기
    </Button>
  );
};

export default PlaySolo;

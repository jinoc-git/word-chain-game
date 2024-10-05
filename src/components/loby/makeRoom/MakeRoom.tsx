'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import short from 'short-uuid';

const MakeRoom = () => {
  const router = useRouter();

  const handleMakeRoom = async () => {
    const originCode = short.generate();
    const shortCode = originCode.slice(0, 6).toUpperCase();

    router.push(`/game/multi/${shortCode}`);
  };

  return (
    <Button color="primary" variant="shadow" onClick={handleMakeRoom}>
      방 만들기
    </Button>
  );
};

export default MakeRoom;

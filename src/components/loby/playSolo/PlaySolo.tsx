'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import short from 'short-uuid';

const PlaySolo = () => {
  const router = useRouter();

  const handlePlaySolo = async () => {
    const originCode = short.generate();
    const shortCode = originCode.slice(0, 6).toUpperCase();

    router.push(`/game/123?solo`);
  };

  return (
    <Button color="primary" variant="shadow" onClick={handlePlaySolo}>
      혼자 하기
    </Button>
  );
};

export default PlaySolo;

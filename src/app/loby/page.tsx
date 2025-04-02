'use client';

import React from 'react';

import { Card, CardBody, CardHeader } from '@nextui-org/react';

import CreateRoom from '@/components/loby/createRoom/CreateRoom';
import EnterRoom from '@/components/loby/enterRoom/EnterRoom';
import PlaySolo from '@/components/loby/playSolo/PlaySolo';
import useSocket from '@/hooks/useSocket';
import { useAuthState } from '@/providers/storeProvider/authStoreProvider';

const Loby = () => {
  const { isConnected, createSocketRoom, joinSocketRoom } = useSocket();
  const user = useAuthState((state) => state.user);

  console.log(isConnected);

  return (
    <section>
      <Card className="main-layout">
        <CardHeader className=" justify-center">
          <h2 className=" text-2xl font-semibold">끝말잇기</h2>
        </CardHeader>
        <CardBody className=" space-y-5">
          <PlaySolo />
          <CreateRoom user={user} createSocketRoom={createSocketRoom} />
          <EnterRoom user={user} joinSocketRoom={joinSocketRoom} />
        </CardBody>
      </Card>
    </section>
  );
};

export default Loby;

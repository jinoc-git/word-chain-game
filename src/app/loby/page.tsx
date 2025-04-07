import React from 'react';

import { Card, CardBody, CardHeader } from '@nextui-org/react';

import PlayMulti from '@/components/loby/playMulti/PlayMulti';
import PlaySolo from '@/components/loby/playSolo/PlaySolo';

const Loby = () => {
  return (
    <section>
      <Card className="main-layout">
        <CardHeader className=" justify-center">
          <h2 className=" text-2xl font-semibold">끝말잇기</h2>
        </CardHeader>
        <CardBody className=" space-y-5">
          <PlaySolo />
          <PlayMulti />
        </CardBody>
      </Card>
    </section>
  );
};

export default Loby;

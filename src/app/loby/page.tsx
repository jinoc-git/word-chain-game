import React from 'react';

import { Button, Card, CardBody, CardHeader, Link } from '@nextui-org/react';

import EnterRoom from '@/components/loby/enterRoom/EnterRoom';
import MakeRoom from '@/components/loby/makeRoom/MakeRoom';

const Loby = () => {
  return (
    <section className=" w-screen h-screen flex-box">
      <Card className="main-layout">
        <CardHeader className=" justify-center">
          <h2 className=" text-2xl font-semibold">끝말잇기</h2>
        </CardHeader>
        <CardBody className=" space-y-5">
          <Button color="primary" variant="shadow" as={Link} href={'/game/solo'}>
            혼자 하기
          </Button>
          <MakeRoom />
          <EnterRoom />
        </CardBody>
      </Card>
    </section>
  );
};

export default Loby;

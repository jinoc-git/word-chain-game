'use client';

import { Button, Card, CardBody, CardHeader, Link } from '@nextui-org/react';

export default function Home() {
  return (
    <section className=" w-screen h-screen flex-box">
      <Card isBlurred className="main-layout">
        <CardHeader className=" justify-center">
          <h1 className=" text-2xl font-semibold">Word Chain Game</h1>
        </CardHeader>
        <CardBody className=" space-y-5">
          <Button color="primary" variant="shadow" as={Link}>
            게임 시작
          </Button>
          <Button color="warning" variant="ghost" as={Link}>
            로그인
          </Button>
          <Button color="warning" variant="ghost" as={Link}>
            회원가입
          </Button>
        </CardBody>
      </Card>
    </section>
  );
}

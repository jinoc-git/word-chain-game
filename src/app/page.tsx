import { Button, Link } from '@nextui-org/react';

import Banner from '@/component/loby/banner/Banner';

export default function Home() {
  return (
    <>
      <Banner />
      <section className="main-layout flexCol gap-5">
        <Button color="primary" variant="shadow" as={Link}>
          게임 시작
        </Button>
        <Button color="warning" variant="ghost" as={Link}>
          로그인
        </Button>
        <Button color="warning" variant="ghost" as={Link}>
          회원가입
        </Button>
      </section>
    </>
  );
}

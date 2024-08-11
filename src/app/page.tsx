import { Button, Link } from '@nextui-org/react';

export default function Home() {
  return (
    <section className="sm:w-2/3 md:w-1/2 lg:w-[400px] flexCol gap-5">
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
  );
}

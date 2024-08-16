'use client';

import React from 'react';

import { Button, Card, CardBody, CardHeader, Input, Link } from '@nextui-org/react';

const SignupForm = () => {
  return (
    <Card className="main-layout">
      <CardHeader>
        <h1>회원가입</h1>
      </CardHeader>
      <CardBody>
        <form className=" space-y-3">
          <Input type="email" label="이메일" placeholder="example@gamil.com" size="md" />
          <Input type="password" label="비밀번호" placeholder="비밀번호를 입력해주세요" size="md" />
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            size="md"
          />
          <Button color="primary" isDisabled={true} className="w-full">
            회원가입
          </Button>
        </form>
        <div className="flex-box !mt-5">
          <Link href="/signin" underline="always" color="foreground" className="text-sm">
            로그인하러가기
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default SignupForm;

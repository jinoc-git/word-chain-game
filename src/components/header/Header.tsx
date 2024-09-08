'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const onClickLogo = () => {
    router.push('/loby');
  };

  return (
    <header className=" absolute top-0 left-0 w-screen flex-box">
      <div className="main-layout flex-box py-3 cursor-pointer">
        <h1 onClick={onClickLogo} className=" text-large font-bold">
          WORD CHAIN GAME
        </h1>
      </div>
    </header>
  );
};

export default Header;

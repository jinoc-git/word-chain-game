import React from 'react';

import GoToHome from './goToHome/GoToHome';
import PlayBGM from './playBGM/PlayBGM';
import ThemeSwitcher from './themeSwitcher/ThemeSwitcher';

const Footer = () => {
  return (
    <footer className="main-layout flex-box absolute bottom-0 left-1/2 -translate-x-1/2">
      <nav className=" flex justify-between w-full py-2">
        <ThemeSwitcher />
        <GoToHome />
        <PlayBGM />
      </nav>
    </footer>
  );
};

export default Footer;

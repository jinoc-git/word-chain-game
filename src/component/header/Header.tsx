import React from 'react';

import GoToHome from './goToHome/GoToHome';
import PlayBGM from './playBGM/PlayBGM';
import ThemeSwitcher from './themeSwitcher/ThemeSwitcher';

const Header = () => {
  return (
    <header className="flex-box">
      <div className="main-layout flex justify-between py-2">
        <ThemeSwitcher />
        <GoToHome />
        <PlayBGM />
      </div>
    </header>
  );
};

export default Header;

import React from 'react';

import GoToHome from './goToHome/GoToHome';
import ThemeSwitcher from './themeSwitcher/ThemeSwitcher';

const Header = () => {
  return (
    <header className="flex-box">
      <div className="main-layout flex justify-between py-2">
        <GoToHome />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;

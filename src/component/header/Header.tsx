import React from 'react';

import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';

const Header = () => {
  return (
    <header className=" flex-box h-[70px]">
      <div className="main-layout">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;

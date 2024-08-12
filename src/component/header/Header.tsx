import React from 'react';

import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';

const Header = () => {
  return (
    <header className="flex-box">
      <div className="main-layout flex justify-end">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;

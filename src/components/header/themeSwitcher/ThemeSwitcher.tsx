'use client';

import React from 'react';

import { Button } from '@nextui-org/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const handleSwitchTheme = React.useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button isIconOnly onClick={handleSwitchTheme} variant="faded">
      {mounted ? theme === 'light' ? <Moon /> : <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeSwitcher;

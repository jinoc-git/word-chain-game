'use client';

import React from 'react';

import { Button } from '@nextui-org/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const handleSwitchTheme = React.useCallback(() => {
    if (theme === 'light') setTheme('dark');
    if (theme === 'dark') setTheme('light');
  }, [theme]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button isIconOnly onClick={handleSwitchTheme} variant="faded">
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default ThemeSwitcher;

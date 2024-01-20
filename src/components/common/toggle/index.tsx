'use client';
import React, { useEffect } from 'react';
import { Switch } from '@components/ui/switch';

export const ToggleButton = ({ setTheme, currentTheme }: any) => {
  // Add useEffect to set the dark class on the body element
  useEffect(() => {
    document.body.classList.toggle('primary', currentTheme === 'primary');
  }, [currentTheme]);

  return (
    <Switch
      onClick={() =>
        currentTheme === 'primary' ? setTheme('secondary') : setTheme('primary')
      }
      className="w-[30px] h-[15px]"
    >
      Toggle Mode
    </Switch>
  );
};

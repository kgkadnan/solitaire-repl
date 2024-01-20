'use client';
import { ThemeProvider } from 'next-themes';
import React, { ReactNode, useEffect } from 'react';

interface IThemeProvidersProps {
  children: ReactNode;
  isV2Route?: boolean; // Include the optional boolean prop
}
export const ThemeProviders = ({
  children,
  isV2Route
}: IThemeProvidersProps) => {
  useEffect(() => {}, []);
  return (
    <ThemeProvider
      enableSystem={true}
      attribute="class"
      defaultTheme={isV2Route ? 'v2primary' : 'primary'}
      storageKey={isV2Route ? 'v2-theme' : 'theme'}
    >
      {children}
    </ThemeProvider>
  );
};

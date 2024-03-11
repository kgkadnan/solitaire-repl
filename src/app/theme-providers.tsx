'use client';
import { ThemeProvider } from 'next-themes';
import React, { ReactNode, useEffect } from 'react';

interface IThemeProvidersProps {
  children: ReactNode;
}
export const ThemeProviders = ({ children }: IThemeProvidersProps) => {
  useEffect(() => {}, []);
  return (
    <ThemeProvider
      enableSystem={true}
      attribute="class"
      defaultTheme={'v2primary'}
    >
      {children}
    </ThemeProvider>
  );
};

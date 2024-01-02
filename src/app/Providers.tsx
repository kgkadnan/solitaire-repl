'use client';
import { ThemeProvider } from 'next-themes';
import React, { ReactNode } from 'react';

interface IProvidersProps {
  children: ReactNode;
}
export const Providers = ({ children }: IProvidersProps) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
};

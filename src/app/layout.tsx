'use client';
import React, { ReactNode, FC } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';
import '../../styles/_globals.scss';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
import { usePathname } from 'next/navigation';
import authorizedLogin from '@/utils/authorized-login';
import {
  headerlessRoutes,
  protectedRoutes,
  applicationRoutes,
  v2Routes
} from '@/constants/routes';
import { ThemeProviders } from './theme-providers';
import Head from 'next/head';

const store = setupStore();

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children?: ReactNode }) {
  const path = usePathname();
  const isApplicationRoutes = applicationRoutes.includes(path);
  const isV2Route = v2Routes.includes(path);
  console.log(path);
  const showHeader =
    (isApplicationRoutes && !headerlessRoutes.includes(path)) || path === '/';
  // Create a component that just renders children, with children as an optional prop
  const ChildrenComponent: FC<{ children?: ReactNode }> = ({ children }) => (
    <>{children}</>
  );
  // Wrap the ChildrenComponent with authorizedLogin if it's a secure page
  const SecureComponent = protectedRoutes.includes(path)
    ? authorizedLogin(ChildrenComponent)
    : ChildrenComponent;

  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Inter"
        />
      </Head>
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProviders>
            {isV2Route ? (
              <>
                {showHeader ? (
                  <SecureComponent>{children}</SecureComponent>
                ) : (
                  <div>{children}</div>
                )}{' '}
              </>
            ) : (
              <div>{children}</div>
            )}
          </ThemeProviders>
        </Provider>
        <SpeedInsights />
      </body>
    </html>
  );
}

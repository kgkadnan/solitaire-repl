'use client';
import React, { ReactNode, FC } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';
import '../../styles/_globals.scss';
import { TopNavigationBar } from '@/components/common/top-navigation-bar';
import { BottomNavigationBar } from '@/components/common/bottom-navigation-bar';
import SideBar from '@/components/common/sidebar';
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
import V2TopNavigationBar from '@/components/v2/common/top-navigation-bar';
import Head from 'next/head';
import SideNavigationBar from '@/components/v2/common/side-navigation-bar';

const store = setupStore();

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children?: ReactNode }) {
  const path = usePathname();
  const isApplicationRoutes = applicationRoutes.includes(path);
  const isV2Route = v2Routes.includes(path);

  const showOldThemeWithHeader =
    isApplicationRoutes && !(headerlessRoutes.includes(path) || isV2Route);
  const showHeader = isApplicationRoutes && !headerlessRoutes.includes(path);
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
          <ThemeProviders isV2Route={isV2Route}>
            {showOldThemeWithHeader ? (
              <>
                <SideBar />
                <TopNavigationBar />

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'right',
                    padding: '110px 30px 0px 30px'
                  }}
                >
                  <main
                    style={{ width: 'calc(100% - 92px)', minHeight: '78vh' }}
                  >
                    <SecureComponent>{children}</SecureComponent>
                  </main>
                </div>
                <BottomNavigationBar />
              </>
            ) : isV2Route ? (
              <>
                {showHeader ? (
                  <div className="flex w-full">
                    <SideNavigationBar />

                    <div className="flex-1 flex flex-col w-[calc(100%-84px)]">
                      <V2TopNavigationBar />

                      <main className="flex-1 px-[32px] ml-[84px] bg-neutral25">
                        <SecureComponent>{children}</SecureComponent>
                      </main>
                    </div>
                  </div>
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

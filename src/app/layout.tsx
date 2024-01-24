'use client';
import React, { ReactNode, FC } from 'react';
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

const store = setupStore();

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children?: ReactNode }) {
  const path = usePathname();
  const isApplicationRoutes = applicationRoutes.includes(path);
  const isV2Route = v2Routes.includes(path);

  const showHeader =
    isApplicationRoutes && !(headerlessRoutes.includes(path) || isV2Route);
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
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProviders isV2Route={isV2Route}>
            {showHeader ? (
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
            ) : (
              <div>{children}</div>
            )}
          </ThemeProviders>
        </Provider>
      </body>
    </html>
  );
}

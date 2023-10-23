'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../styles/_globals.scss';
import { Providers } from './Providers';
import { TopNavigationBar } from '@/components/common/top-navigation-bar';
import { BottomNavigationBar } from '@/components/common/bottom-navigation-bar';
import SideBar from '@/components/common/sidebar';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
import { usePathname } from 'next/navigation';

const store = setupStore();

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KGK 2.O',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const showHeader = path === '/login' ? false : true;

  // return shouldApplyLayout ? <div>{children}</div> : <>{children}</>;
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Provider store={store}>
            {showHeader ? (
              <>
                <SideBar />
                <TopNavigationBar />

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'right',
                    marginTop: '110px',
                    padding: '0px 30px',
                  }}
                >
                  <main
                    style={{ width: 'calc(100% - 92px)', minHeight: '76vh' }}
                  >
                    {children}
                  </main>
                </div>
                <BottomNavigationBar />
              </>
            ) : (
              <div>{children}</div>
            )}
          </Provider>
        </Providers>
      </body>
    </html>
  );
}

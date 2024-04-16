'use client';
import React, { ReactNode, FC, useEffect, useState } from 'react';
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
import AppDownloadPopup from '@/components/v2/common/alert-pop-for-mobile';
import InvalidCreds from './v2/login/component/invalid-creds';
import { DialogComponent } from '@/components/v2/common/dialog';

const store = setupStore();

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children?: ReactNode }) {
  const path = usePathname();
  const isApplicationRoutes = applicationRoutes.includes(path);
  const isV2Route = v2Routes.includes(path);
  const [open, setOpen] = useState(false);

  const showHeader =
    (isApplicationRoutes && !headerlessRoutes.includes(path)) || path === '/';
  // Create a component that just renders children, with children as an optional prop
  const ChildrenComponent: FC<{ children?: ReactNode }> = ({ children }) => (
    <>
      {children}
      <AppDownloadPopup></AppDownloadPopup>
    </>
  );
  // Wrap the ChildrenComponent with authorizedLogin if it's a secure page
  const SecureComponent = protectedRoutes.includes(path)
    ? authorizedLogin(ChildrenComponent)
    : ChildrenComponent;

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.navigator !== 'undefined' &&
      typeof navigator !== 'undefined' &&
      navigator.userAgent
    ) {
      const disableDevtool = require('disable-devtool');
      disableDevtool({
        disableMenu: true,
        ondevtoolopen(type: any, next: any) {
          setOpen(true);
          // You may choose to call next() if you want to allow the default behavior
          // next();
        },
        ignore: () => {
          return process.env.NEXT_PUBLIC_ENV !== 'production';
        }
      });
    }
  });
  return (
    <html lang="en">
      <head>
        {' '}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W85XMPHM');
        `
          }}
        />
      </head>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Inter"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
                if (typeof window !== 'undefined') {
                  document.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                  });
                }
              `
          }}
        />
      </Head>
      <body className={inter.className}>
        <DialogComponent
          dialogContent={
            <InvalidCreds
              header="Warning"
              content={
                'Please first close developer tool window and then access website'
              }
              handleClick={() => setOpen(false)}
              buttonText="Okay"
            />
          }
          isOpens={open}
          setIsOpen={setOpen}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=GTM-W85XMPHM`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Provider store={store}>
          <ThemeProviders>
            {isV2Route ? (
              <>
                {showHeader ? (
                  <SecureComponent>{children}</SecureComponent>
                ) : (
                  <ChildrenComponent>{children}</ChildrenComponent>
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

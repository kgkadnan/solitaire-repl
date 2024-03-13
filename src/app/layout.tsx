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
// import { GoogleAnalytics } from '@next/third-parties/google'
// import Script from 'next/script';

const store = setupStore();

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children?: ReactNode }) {
  const path = usePathname();
  const isApplicationRoutes = applicationRoutes.includes(path);
  const isV2Route = v2Routes.includes(path);

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
        {/* <!-- Google Tag Manager --> */}
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
        {/* <Script strategy="afterInteractive">
          {' '}
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
     })(window,document,'script','dataLayer', 'GTM-W85XMPHM');`}
        </Script> */}
        {/* <GoogleAnalytics gaId="GTM-W85XMPHM" /> */}

        {/* <!-- End Google Tag Manager --> */}
      </Head>
      <body className={inter.className}>
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

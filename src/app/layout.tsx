'use client';
import React, { ReactNode, FC, useEffect, useState } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter, Cardo } from 'next/font/google';
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

import AppDownloadPopup from '@/components/v2/common/alert-pop-for-mobile';

import { useMediaQuery } from 'react-responsive';
// import Salesiq from '@/components/v2/common/sales-iq';
import * as Sentry from '@sentry/nextjs';
import SideNavigationBar from '@/components/v2/common/side-navigation-bar';

const store = setupStore();

const inter = Inter({ subsets: ['latin'] });
export const cardo = Cardo({
  subsets: ['latin'], // Specify subset (optional)
  weight: ['400', '700'] // Specify font weights
});
// Add this type declaration at the top of your file
declare global {
  interface Window {
    OneSignal?: any; // You can replace 'any' with a more specific type if available
  }
}

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, // Replace with your Sentry DSN
  tracesSampleRate: 1.0 // Adjust the sample rate for performance monitoring
});

export default function RootLayout({ children }: { children?: ReactNode }) {
  const path = usePathname();
  const isApplicationRoutes = applicationRoutes.includes(path);
  const isV2Route = v2Routes.includes(path);

  const showHeader = isApplicationRoutes && !headerlessRoutes.includes(path);
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  // Create a component that just renders children, with children as an optional prop
  const ChildrenComponent: FC<{ children?: ReactNode }> = ({ children }) => (
    <>{children}</>
  );

  useEffect(() => {
    // Define the URLs
    const appStoreURL =
      'https://apps.apple.com/in/app/kgk-diamond/id6479595403';
    const playStoreURL =
      'https://play.google.com/store/apps/details?id=com.kgk.diamonds&hl=en_IN';

    // Check if the device is iOS
    const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Check if the device is Android
    const isAndroid = () => /Android/i.test(navigator.userAgent);

    // Perform the redirect based on the platform
    if (path.includes('/v3') || path.includes('/v2') || path === '/') {
      if (isIOS()) {
        window.location.href = appStoreURL;
      } else if (isAndroid()) {
        window.location.href = playStoreURL;
      }
    }
  }, []);

  // Wrap the ChildrenComponent with authorizedLogin if it's a secure page
  const SecureComponent = protectedRoutes.includes(path)
    ? authorizedLogin(ChildrenComponent)
    : ChildrenComponent;

  return (
    <html lang="en">
      {/* Cookie Consent Listener and GTM Loading */}

      <body className={inter.className}>
        <Provider store={store}>
          <ThemeProviders>
            {isV2Route ? (
              <>
                {isMobile ? (
                  <AppDownloadPopup></AppDownloadPopup>
                ) : showHeader ? (
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
        {/* <Salesiq /> */}
      </body>
    </html>
  );
}

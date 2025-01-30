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
  v2Routes,
  v3Routes
} from '@/constants/routes';
import { ThemeProviders } from './theme-providers';
import Head from 'next/head';
import AppDownloadPopup from '@/components/v2/common/alert-pop-for-mobile';
import CommonPoppup from './v2/login/component/common-poppup';
import { DialogComponent } from '@/components/v2/common/dialog';
import Toaster from '@/components/v3/ui/toaster';
import CommonHeader from '@/components/v3/navigation-menu/header';
import SubscribeNewsLetter from '@/components/v3/subscribe-newsletter';
import FooterSiteMap from '@/components/v3/footer-sitemap';
import Footer from '@/components/v3/footer';
import { useMediaQuery } from 'react-responsive';
// import Salesiq from '@/components/v2/common/sales-iq';
import * as Sentry from '@sentry/nextjs';
import Script from 'next/script';
import CookieBot from 'react-cookiebot';

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
  const isV3Route = v3Routes.includes(path) || path.includes('/v3');
  const [open, setOpen] = useState(false);
  const [showLPHeader, setShowLPHeader] = useState(false);
  const showHeader = isApplicationRoutes && !headerlessRoutes.includes(path);
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  // Create a component that just renders children, with children as an optional prop
  const ChildrenComponent: FC<{ children?: ReactNode }> = ({ children }) => (
    <>{children}</>
  );

  useEffect(() => {
    // Show header after 2 seconds
    const timer = setTimeout(() => {
      setShowLPHeader(true);
    }, 500);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

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
        ondevtoolopen(type: any, _next: any) {
          // if ( _type === 5) {
          // Additional check: Confirm if dev tools are really open (optional)
          if (
            type === 6
            // window.outerWidth - window.innerWidth > 200 ||
            // window.outerHeight - window.innerHeight > 200
          ) {
            // This checks if the window has shrunk in size due to dev tools being opened
            setOpen(true);
            // }else{
            //   setOpen(false)
          }
          // }
        },
        ignore: () => {
          return process.env.NEXT_PUBLIC_ENV !== 'production';
        }
      });
    }
  });

  useEffect(() => {
    if (!window.OneSignal) {
      const script = document.createElement('script');
      script.src = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
      script.async = true;
      script.onload = () => {
        window.OneSignal = window.OneSignal || [];
        window.OneSignal.push(() => {
          console.log('Initializing OneSignal...');
          window.OneSignal.init({
            appId: '378b2db1-01ba-4f45-b8cf-9500ea88056b',
            safari_web_id:
              'web.onesignal.auto.017f9378-7499-4b97-8d47-e55f2bb151c0',
            allowLocalhostAsSecureOrigin: true
          });

          // Always attempt to fetch the UUID (Player ID) on every load
          window.OneSignal.push(() => {
            window.OneSignal.getNotificationPermission()
              .then((permission: any) => {
                // Handle notification permissions
                if (permission === 'default') {
                  window.OneSignal.registerForPushNotifications();
                } else {
                  console.log('Notification permission denied.');
                }
              })
              .catch((error: any) => {
                console.error('Error fetching notification permission:', error);
              });
          });
        });
      };

      script.onerror = () => {
        console.error('Failed to load OneSignal script.');
      };

      document.head.appendChild(script);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <script
          id="ga-consent"
          // strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function loadGA() {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${process.env.NEXT_PUBLIC_GA}, { 'anonymize_ip': true });
              }
              
              // Check Cookiebot Consent API
              window.addEventListener("CookieConsentDeclaration", function() {
                if (Cookiebot.consent.statistics) {
                  loadGA();
                }
              });
            `
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-P4DSD2MS');
        `
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5J5J2RFB');
        `
          }}
        />

        {/* <Script
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
          strategy="beforeInteractive"
          onLoad={() => console.log('OneSignal SDK script loaded')}
        /> */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
        />

        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA}', { 'anonymize_ip': true });
          `
          }}
        /> */}
        <Script
          id="cookie-consent"
          // strategy="afterInteractive"
          data-cookieconsent="ignore"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag("consent", "default", {
                ad_personalization: "denied",
                ad_storage: "denied",
                ad_user_data: "denied",
                analytics_storage: "denied",
                functionality_storage: "denied",
                personalization_storage: "denied",
                security_storage: "granted",
                wait_for_update: 500,
              });
              gtag("set", "ads_data_redaction", true);
              gtag("set", "url_passthrough", false);
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
            <CommonPoppup
              header="Warning"
              content={
                'Please first close developer tool window and then access website'
              }
              handleClick={() => setOpen(false)}
              buttonText="Okay"
            />
          }
          isOpens={open}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P4DSD2MS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=GTM-5J5J2RFB`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {(isV3Route || isV2Route) && (
          <CookieBot domainGroupId={'86ce1cb4-4338-418c-acca-d54a1b81cccc'} />
        )}
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

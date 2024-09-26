'use client';
import logger from 'logging/log-util';
// import Dashboard from './v2/page';
import { Metadata } from 'next';
import LandingPage from './v3/page';
import { useEffect } from 'react';

export const metadata: Metadata = {
  title: 'Buy Diamonds in Few Clicks | KGK Diamonds',
  description:
    'Simplify your diamond buying with KGK Diamonds. where you can manage your diamonds, orders, and preferences seamlessly.'
};

export default function Home() {
  logger.setLogLevel('debug');

  logger.info('This is an info message');

  useEffect(() => {
    // Define the URLs
    const appStoreURL =
      'https://apps.apple.com/in/app/kgk-diamond/id6479595403';
    const playStoreURL =
      'https://play.google.com/store/apps/details?id=com.kgk.diamonds&hl=en_IN';
    const desktopURL = 'https://kgkdiamonds.com/';

    // Check if the device is iOS
    const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Check if the device is Android
    const isAndroid = () => /Android/i.test(navigator.userAgent);

    // Perform the redirect based on the platform
    if (isIOS()) {
      window.location.href = appStoreURL;
    } else if (isAndroid()) {
      window.location.href = playStoreURL;
    } else {
      window.location.href = desktopURL;
    }
  }, []);
  return (
    <>
      <LandingPage />
    </>
  );
}

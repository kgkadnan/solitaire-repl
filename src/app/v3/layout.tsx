import { AppProps } from 'next/app';
import '../../../styles/_globals.scss';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/v3/ui/toaster';
import CommonHeader from '@/components/v3/navigation-menu/header';
import SubscribeNewsLetter from '@/components/v3/subscribe-newsletter';
import FooterSiteMap from '@/components/v3/footer-sitemap';
import Footer from '@/components/v3/footer';

function V3Layout({ Component, pageProps }: any) {
  return (
    <main>
      <Toaster />
      <CommonHeader />
      <Component {...pageProps} />
      <SubscribeNewsLetter />
      <FooterSiteMap />
      <Footer />
    </main>
  );
}

export default V3Layout;

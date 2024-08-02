'use client';
import '../../../styles/_globals.scss';
import Toaster from '@/components/v3/ui/toaster';
import CommonHeader from '@/components/v3/navigation-menu/header';
import SubscribeNewsLetter from '@/components/v3/subscribe-newsletter';
import FooterSiteMap from '@/components/v3/footer-sitemap';
import Footer from '@/components/v3/footer';

export default function Layout({ children }: any) {
  return (
    <main>
      <Toaster />
      <CommonHeader />
      {children}
      <SubscribeNewsLetter />
      <FooterSiteMap />
      <Footer />
    </main>
  );
}

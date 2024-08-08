// components/v3/layout.tsx
'use client';
import '../../../styles/_globals.scss';
import Toaster from '@/components/v3/ui/toaster';
import CommonHeader from '@/components/v3/navigation-menu/header';
import SubscribeNewsLetter from '@/components/v3/subscribe-newsletter';
import FooterSiteMap from '@/components/v3/footer-sitemap';
import Footer from '@/components/v3/footer';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false
});
interface ILayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <main>
      <Toaster />

      <AnimatedCursor
        color="255,255,255"
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={2}
        outerAlpha={1}
        // hasBlendMode={true}
        outerStyle={{
          mixBlendMode: 'exclusion'
        }}
        innerStyle={{
          backgroundColor: 'var(--cursor-color)',
          mixBlendMode: 'exclusion'
        }}
      />
      <CommonHeader />
      <div>{children}</div>
      <div style={{ zIndex: 100 }}>
        <SubscribeNewsLetter />
        <FooterSiteMap />
        <Footer />
      </div>
    </main>
  );
}

// // 'use client';
// // import '../../../styles/_globals.scss';
// // import Toaster from '@/components/v3/ui/toaster';
// // import CommonHeader from '@/components/v3/navigation-menu/header';
// // import SubscribeNewsLetter from '@/components/v3/subscribe-newsletter';
// // import FooterSiteMap from '@/components/v3/footer-sitemap';
// // import Footer from '@/components/v3/footer';
// // import { ReactNode } from 'react';
// // // import dynamic from 'next/dynamic';

// // // const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
// // //   ssr: false
// // // });
// // interface ILayoutProps {
// //   children: ReactNode;
// // }

// // export default function Layout({ children }: ILayoutProps) {
// //   return (
// //     <main>
// //       <Toaster />

// //       {/* <AnimatedCursor
// //         color="255,255,255"
// //         // color="0,0,0"
// //         innerSize={8}
// //         outerSize={35}
// //         innerScale={1}
// //         outerScale={2}
// //         outerAlpha={1}
// //         // hasBlendMode={true}
// //         outerStyle={{
// //           // backgroundColor:"red",
// //           mixBlendMode: 'exclusion'
// //         }}
// //         innerStyle={{
// //           backgroundColor: 'var(--cursor-color)',
// //           mixBlendMode: 'exclusion'
// //         }}
// //         trailingSpeed={8}
// //       /> */}

// //       <CommonHeader />
// //       <div>{children}</div>
// //       <div style={{ zIndex: 100 }}>
// //         <SubscribeNewsLetter />
// //         <FooterSiteMap />
// //         <Footer />
// //       </div>
// //     </main>
// //   );
// // }

// 'use client';
// import '../../../styles/_globals.scss';
// import Toaster from '@/components/v3/ui/toaster';
// import CommonHeader from '@/components/v3/navigation-menu/header';
// import SubscribeNewsLetter from '@/components/v3/subscribe-newsletter';
// import FooterSiteMap from '@/components/v3/footer-sitemap';
// import Footer from '@/components/v3/footer';
// import { ReactNode, useEffect } from 'react';

// interface ILayoutProps {
//   children: ReactNode;
// }

// export default function Layout({ children }: ILayoutProps) {
//   useEffect(() => {
//     const cursor = document.createElement('div');
//     cursor.classList.add('custom-cursor');
//     document.body.appendChild(cursor);

//     const moveCursor = (e: MouseEvent) => {
//       cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
//       const elementUnderCursor = document.elementFromPoint(
//         e.clientX,
//         e.clientY
//       );

//       if (elementUnderCursor) {
//         const bgColor =
//           window.getComputedStyle(elementUnderCursor).backgroundColor;
//         const textColor = window.getComputedStyle(elementUnderCursor).color;

//         if (bgColor === 'rgb(255, 255, 255)' || textColor === 'rgb(0, 0, 0)') {
//           cursor.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
//         } else if (
//           bgColor === 'rgb(0, 0, 0)' ||
//           textColor === 'rgb(255, 255, 255)'
//         ) {
//           cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
//         } else {
//           cursor.style.backgroundColor = 'rgba(128, 128, 128, 0.7)';
//         }

//         if (elementUnderCursor.classList.contains('asset')) {
//           cursor.style.backgroundColor = 'transparent';
//           cursor.style.border = '2px solid rgba(255, 255, 255, 0.5)';
//           cursor.style.backdropFilter = 'blur(5px)';
//         } else {
//           cursor.style.border = 'none';
//           cursor.style.backdropFilter = 'none';
//         }
//       }
//     };

//     const addHoverEffect = () => cursor.classList.add('hover');
//     const removeHoverEffect = () => cursor.classList.remove('hover');

//     document.addEventListener('mousemove', moveCursor);
//     document.querySelectorAll('a, button').forEach(el => {
//       el.addEventListener('mouseover', addHoverEffect);
//       el.addEventListener('mouseout', removeHoverEffect);
//     });

//     return () => {
//       document.removeEventListener('mousemove', moveCursor);
//       document.querySelectorAll('a, button').forEach(el => {
//         el.removeEventListener('mouseover', addHoverEffect);
//         el.removeEventListener('mouseout', removeHoverEffect);
//       });
//       document.body.removeChild(cursor);
//     };
//   }, []);

//   return (
//     <main className="">
//       <Toaster />
//       <CommonHeader />
//       <div>{children}</div>
//       <div style={{ zIndex: 100 }}>
//         <SubscribeNewsLetter />
//         <FooterSiteMap />
//         <Footer />
//       </div>
//     </main>
//   );
// }
'use client';
import '../../../styles/_globals.scss';
import Toaster from '@/components/v3/ui/toaster';
import CommonHeader from '@/components/v3/navigation-menu/header';
import SubscribeNewsLetter from '@/components/v3/subscribe-newsletter';
import FooterSiteMap from '@/components/v3/footer-sitemap';
import Footer from '@/components/v3/footer';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface ILayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  const path = usePathname();

  // useEffect(() => {
  //   const cursor = document.createElement('div');
  //   cursor.classList.add('custom-cursor');
  //   document.body.appendChild(cursor);

  //   const moveCursor = (e: MouseEvent) => {
  //     // Check if the cursor is within the div that should disable the custom cursor
  //     const disableCursorDiv = document.querySelector('.disable-custom-cursor');
  //     if (
  //       disableCursorDiv &&
  //       disableCursorDiv.contains(
  //         document.elementFromPoint(e.clientX, e.clientY)
  //       )
  //     ) {
  //       cursor.style.display = 'none';
  //     } else {
  //       cursor.style.display = 'block';
  //       cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  //       const elementUnderCursor = document.elementFromPoint(
  //         e.clientX,
  //         e.clientY
  //       );

  //       if (elementUnderCursor) {
  //         const bgColor =
  //           window.getComputedStyle(elementUnderCursor).backgroundColor;
  //         const textColor = window.getComputedStyle(elementUnderCursor).color;

  //         if (
  //           bgColor === 'rgb(255, 255, 255)' ||
  //           textColor === 'rgb(0, 0, 0)'
  //         ) {
  //           cursor.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  //         } else if (
  //           bgColor === 'rgb(0, 0, 0)' ||
  //           textColor === 'rgb(255, 255, 255)'
  //         ) {
  //           cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
  //         } else {
  //           cursor.style.backgroundColor = 'rgba(128, 128, 128, 0.7)';
  //         }

  //         if (elementUnderCursor.classList.contains('asset')) {
  //           cursor.style.backgroundColor = 'transparent';
  //           cursor.style.border = '2px solid rgba(255, 255, 255, 0.5)';
  //           cursor.style.backdropFilter = 'blur(5px)';
  //         } else {
  //           cursor.style.border = 'none';
  //           cursor.style.backdropFilter = 'none';
  //         }
  //       }
  //     }
  //   };

  //   const addHoverEffect = () => cursor.classList.add('hover');
  //   const removeHoverEffect = () => cursor.classList.remove('hover');

  //   document.addEventListener('mousemove', moveCursor);
  //   document.querySelectorAll('a, button').forEach(el => {
  //     el.addEventListener('mouseover', addHoverEffect);
  //     el.addEventListener('mouseout', removeHoverEffect);
  //   });

  //   return () => {
  //     document.removeEventListener('mousemove', moveCursor);
  //     document.querySelectorAll('a, button').forEach(el => {
  //       el.removeEventListener('mouseover', addHoverEffect);
  //       el.removeEventListener('mouseout', removeHoverEffect);
  //     });
  //     document.body.removeChild(cursor);
  //   };
  // }, []);
  return (
    <>
      {path === '/v3/test' ? (
        <div
          style={{
            background:
              'radial-gradient(690.14% 690.14% at 50% 50%, #FFF 0%, #344444 100%)'
          }}
        >
          {children}
        </div>
      ) : (
        <main className="">
          <Toaster />
          <CommonHeader />
          <div>{children}</div>
          <div style={{ zIndex: 100 }}>
            <SubscribeNewsLetter />
            <FooterSiteMap />
            <Footer />
          </div>
        </main>
      )}
    </>
  );
}

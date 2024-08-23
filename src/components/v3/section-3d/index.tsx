// // import React, { useEffect, useRef } from 'react';

// // const SuperfastWireless: React.FC = () => {
// //   // Explicitly typing uiRef as HTMLDivElement
// //   const uiRef = useRef<HTMLDivElement | null>(null);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       if (!uiRef.current) return;

// //       const rows: any = uiRef.current.querySelectorAll('ul li');
// //       const html = document.documentElement;
// //       let scrolled = html.scrollTop / (html.scrollHeight - html.clientHeight);
// //       let total = 1 / rows.length;

// //       rows.forEach((row: any, index: any) => {
// //         let start = total * index;
// //         let end = total * (index + 1);
// //         let progress = (scrolled - start) / (end - start);

// //         if (progress >= 1) progress = 1;
// //         if (progress <= 0) progress = 0;

// //         row.style.setProperty('--progress', progress.toString());
// //       });
// //     };

// //     window.addEventListener('scroll', handleScroll);
// //     return () => {
// //       window.removeEventListener('scroll', handleScroll);
// //     };
// //   }, []);

// //   return (
// //     <div style={{ position: 'relative', width: '770px', height: '1336px' }}>
// //       <div
// //         style={{
// //           width: '100%',
// //           height: '100%',
// //           backgroundImage:
// //             'url(https://assets.codepen.io/2002878/iphone12-5g_on_phone.jpg)',
// //           backgroundSize: '770px 1336px',
// //           maskImage:
// //             'url(https://assets.codepen.io/2002878/iphone12-5g_on_phone_mask.png)',
// //           maskSize: '770px 1336px',
// //           WebkitMaskImage:
// //             'url(https://assets.codepen.io/2002878/iphone12-5g_on_phone_mask.png)',
// //           WebkitMaskSize: '770px 1336px'
// //         }}
// //       />
// //       <div
// //         ref={uiRef}
// //         style={{
// //           position: 'absolute',
// //           top: '0',
// //           left: '50%',
// //           transform: 'translateX(-50%)'
// //         }}
// //       >
// //         <img
// //           src="https://assets.codepen.io/2002878/iphone12-5g_top_ui.jpg"
// //           style={{
// //             display: 'block',
// //             width: '640px',
// //             margin: '70px auto 0',
// //             paddingBottom: '30px',
// //             borderBottom: '1px solid #222'
// //           }}
// //           alt=""
// //         />
// //         <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
// //           {[1, 2, 3, 4, 5, 6, 7].map(i => (
// //             <li
// //               key={i}
// //               style={{
// //                 margin: '10px auto',
// //                 paddingBottom: '10px',
// //                 borderBottom: '1px solid #222'
// //               }}
// //             >
// //               <img
// //                 src={`https://assets.codepen.io/2002878/iphone12-5g_show_0${i}.jpg`}
// //                 style={{
// //                   display: 'block',
// //                   width: '640px',
// //                   height: 'auto',
// //                   transform: `scale(calc(1.8 - (0.8 * var(--progress)))) translateY(calc(-60px * (1 - var(--progress))))`,
// //                   opacity: 'var(--progress)'
// //                 }}
// //                 alt={`Show ${i}`}
// //               />
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SuperfastWireless;
// import React, { useEffect, useRef } from 'react';

// const SuperfastWireless: React.FC = () => {
//   const uiRef = useRef<HTMLDivElement | null>(null);
//   const animationIntervalRef = useRef<number | null>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           startAnimation(); // Start animation when the div enters the viewport
//         } else {
//           stopAnimation(); // Stop animation when the div leaves the viewport
//         }
//       },
//       { threshold: 0.5 } // Adjust threshold as needed
//     );

//     if (uiRef.current) {
//       observer.observe(uiRef.current);
//     }

//     return () => {
//       if (uiRef.current) {
//         observer.unobserve(uiRef.current);
//       }
//       stopAnimation(); // Cleanup animation on unmount
//     };
//   }, []);

//   const startAnimation = () => {
//     const rows:any = uiRef.current?.querySelectorAll('ul li');
//     if (!rows) return;

//     let index = 0;

//     animationIntervalRef.current = window.setInterval(() => {
//       rows.forEach((row:any, i:any) => {
//         row.style.opacity = '0'; // Reset all elements
//         row.style.transform = 'scale(1) translateY(0)';
//       });

//       const currentRow = rows[index];
//       if (currentRow) {
//         currentRow.style.opacity = '1';
//         currentRow.style.transform = 'scale(1.2) translateY(-20px)';
//       }

//       index = (index + 1) % rows.length; // Loop back to the first element
//     }, 1000); // Adjust the interval time as needed
//   };

//   const stopAnimation = () => {
//     if (animationIntervalRef.current) {
//       clearInterval(animationIntervalRef.current);
//       animationIntervalRef.current = null;
//     }
//   };

//   return (
//     <div style={{ position: 'relative', width: '770px', height: '1336px' }}>
//       <div
//         style={{
//           width: '100%',
//           height: '100%',
//           backgroundImage:
//             'url(https://assets.codepen.io/2002878/iphone12-5g_on_phone.jpg)',
//           backgroundSize: '770px 1336px',
//           maskImage:
//             'url(https://assets.codepen.io/2002878/iphone12-5g_on_phone_mask.png)',
//           maskSize: '770px 1336px',
//           WebkitMaskImage:
//             'url(https://assets.codepen.io/2002878/iphone12-5g_on_phone_mask.png)',
//           WebkitMaskSize: '770px 1336px'
//         }}
//       />
//       <div
//         ref={uiRef}
//         style={{
//           position: 'absolute',
//           top: '0',
//           left: '50%',
//           transform: 'translateX(-50%)'
//         }}
//       >
//         <img
//           src="https://assets.codepen.io/2002878/iphone12-5g_top_ui.jpg"
//           style={{
//             display: 'block',
//             width: '640px',
//             margin: '70px auto 0',
//             paddingBottom: '30px',
//             borderBottom: '1px solid #222'
//           }}
//           alt=""
//         />
//         <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
//           {[1, 2, 3, 4, 5, 6, 7].map(i => (
//             <li
//               key={i}
//               style={{
//                 margin: '10px auto',
//                 paddingBottom: '10px',
//                 borderBottom: '1px solid #222',
//                 opacity: 0, // Hide items initially
//                 transition: 'opacity 0.3s ease, transform 0.3s ease'
//               }}
//             >
//               <img
//                 src={`https://assets.codepen.io/2002878/iphone12-5g_show_0${i}.jpg`}
//                 style={{
//                   display: 'block',
//                   width: '640px',
//                   height: 'auto'
//                 }}
//                 alt={`Show ${i}`}
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SuperfastWireless;
import React, { useEffect, useRef, useState } from 'react';

const SuperfastWireless: React.FC = () => {
  const uiRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    let lastScrollTop = window.pageYOffset;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const isUp = scrollTop < lastScrollTop;
      setIsScrollingUp(isUp);
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isScrollingUp) {
            animateForward(); // Animate forward when scrolling down
          } else {
            animateBackward(); // Animate backward when scrolling up
          }
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    if (uiRef.current) {
      observer.observe(uiRef.current);
    }

    return () => {
      if (uiRef.current) {
        observer.unobserve(uiRef.current);
      }
    };
  }, [isScrollingUp]);

  const animateForward = () => {
    const rows = uiRef.current?.querySelectorAll('ul li');
    if (!rows) return;

    if (currentIndex < rows.length) {
      const currentRow: any = rows[currentIndex];
      if (currentRow) {
        currentRow.style.opacity = '1';
        currentRow.style.transform = 'scale(1.2) translateY(-20px)';
      }
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const animateBackward = () => {
    const rows = uiRef.current?.querySelectorAll('ul li');
    if (!rows) return;

    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const currentRow: any = rows[prevIndex];
      if (currentRow) {
        currentRow.style.opacity = '0';
        currentRow.style.transform = 'scale(1) translateY(0)';
      }
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <div className="flex justify-around bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient w-full">
      <div
        className={`mobile-design-slide-left ${
          isScrollingUp ? 'slide-left-backward' : 'slide-left-forward'
        }`}
      >
        hello
      </div>
      <div
        style={{
          position: 'relative',
          width: '350px',
          height: '620px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/v3/home/phone.png)',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            justifyContent: 'center'
          }}
        />
        {/* <div
        ref={uiRef}
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        <img
          src="https://assets.codepen.io/2002878/iphone12-5g_top_ui.jpg"
          style={{
            display: 'block',
            width: '640px',
            margin: '70px auto 0',
            paddingBottom: '30px',
            borderBottom: '1px solid #222'
          }}
          alt=""
        />
        <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
          {[1, 2, 3, 4, 5, 6, 7].map(i => (
            <li
              key={i}
              style={{
                margin: '10px auto',
                paddingBottom: '10px',
                borderBottom: '1px solid #222',
                opacity: 0, // Initially hide all items
                transition: 'opacity 0.3s ease, transform 0.3s ease'
              }}
            >
              <img
                src={`https://assets.codepen.io/2002878/iphone12-5g_show_0${i}.jpg`}
                style={{
                  display: 'block',
                  width: '640px',
                  height: 'auto'
                }}
                alt={`Show ${i}`}
              />
            </li>
          ))}
        </ul>
      </div> */}
      </div>
      <div
        className={`mobile-design-slide-right ${
          isScrollingUp ? 'slide-right-backward' : 'slide-right-forward'
        }`}
      >
        hi
      </div>{' '}
    </div>
  );
};

export default SuperfastWireless;

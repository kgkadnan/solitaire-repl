// 'use client';
// import React, { useEffect } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import SplitType from 'split-type';

// gsap.registerPlugin(ScrollTrigger);

// interface ISectionProps {
//   fgColor: string;
//   children: React.ReactNode;
// }

// const AnimateSectionText: React.FC<ISectionProps> = ({ fgColor, children }) => {
//   useEffect(() => {
//     // SplitType must be applied after the text is rendered
//     const splitTypes = document.querySelectorAll('.reveal-type');

//     splitTypes.forEach(char => {
//       const text = new SplitType(char as Element, { types: 'chars' });

//       gsap.fromTo(
//         text.chars,
//         { autoAlpha: 0 }, // Starting state
//         {
//           color: fgColor,
//           autoAlpha: 1, // Ending state
//           duration: 1, // Duration of the animation
//           stagger: 0.02,
//           scrollTrigger: {
//             trigger: char,
//             start: 'top 80%',
//             end: 'top 20%',
//             // scrub: false, // Smooth scrolling animation
//             markers: false,
//             toggleActions:'play none none none'
//             // toggleActions: 'play none reverse none', // Ensure it reverses properly
//           }
//         }
//       );
//     });

//     return () => {
//       SplitType.revert()
//       gsap.killTweensOf('*');
//     };
//   }, [fgColor]);

//   return (
//     <section>
//       <p className="reveal-type">{children}</p>
//     </section>
//   );
// };

// export default AnimateSectionText;

'use client';
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface ISectionProps {
  fgColor: string;
  children: React.ReactNode;
}

const AnimateSectionText: React.FC<ISectionProps> = ({ fgColor, children }) => {
  useEffect(() => {
    // SplitType must be applied after the text is rendered
    const splitTypes = document.querySelectorAll('.reveal-type');

    splitTypes.forEach(char => {
      const text = new SplitType(char as Element, { types: 'chars' });

      gsap.fromTo(
        text.chars,
        { autoAlpha: 0 }, // Starting state
        {
          color: fgColor,
          autoAlpha: 1, // Ending state
          duration: 1, // Duration of the animation
          stagger: 0.02,
          scrollTrigger: {
            trigger: char,
            start: 'top 80%',
            end: 'top 20%',
            markers: false,
            scrub: false, // Smooth scrolling animation
            toggleActions: 'play reverse play play' // Ensure it plays and reverses properly
          }
        }
      );
    });

    return () => {
      SplitType.revert(); // Use revert instead of destroy to reset the text
      gsap.killTweensOf('*');
    };
  }, [fgColor]);

  return <p className="reveal-type">{children}</p>;
};

export default AnimateSectionText;

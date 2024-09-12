// 'use client';
// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import SplitType from 'split-type';

// gsap.registerPlugin(ScrollTrigger);

// interface ISectionProps {
//   fgColor: string;
//   children: string;
//   animationDelay?: number; // Optional delay prop in milliseconds
// }

// const AnimateSectionText: React.FC<ISectionProps> = ({
//   fgColor,
//   children,
//   animationDelay = 0
// }) => {
//   const textRef = useRef<HTMLParagraphElement>(null);

//   useEffect(() => {
//     if (textRef.current) {
//       const splitText = new SplitType(textRef.current, { types: 'chars' });

//       gsap.fromTo(
//         splitText.chars,
//         { autoAlpha: 0 },
//         {
//           color: fgColor,
//           autoAlpha: 1,
//           duration: 1,
//           stagger: 0.02,
//           delay: animationDelay, // Convert milliseconds to seconds
//           scrollTrigger: {
//             trigger: textRef.current,
//             start: 'top 80%',
//             end: 'top 20%',
//             markers: false,
//             scrub: false,
//             toggleActions: 'play reverse play play'
//           }
//         }
//       );

//       return () => {
//         splitText.revert();
//         gsap.killTweensOf(textRef.current);
//       };
//     }
//   }, [fgColor, animationDelay]);

//   return (
//     <p ref={textRef} className="reveal-type">
//       {children}
//     </p>
//   );
// };

// export default AnimateSectionText;
'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface ISectionProps {
  fgColor: string;
  children: string;
  animationDelay?: number; // Optional delay prop in milliseconds
}

const AnimateSectionText: React.FC<ISectionProps> = ({
  fgColor,
  children,
  animationDelay = 0
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const splitText = new SplitType(textRef.current, {
        types: 'words, chars',
        wordClass: 'split-word'
      });

      gsap.fromTo(
        splitText.chars,
        { autoAlpha: 0 },
        {
          color: fgColor,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.02,
          delay: animationDelay, // Convert milliseconds to seconds
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 20%',
            markers: false,
            scrub: false,
            toggleActions: 'play none play play'
          }
        }
      );

      return () => {
        splitText.revert();
        gsap.killTweensOf(textRef.current);
      };
    }
  }, [fgColor, animationDelay]);

  return (
    <p ref={textRef} className="reveal-type break-words whitespace-normal">
      {children}
    </p>
  );
};

export default AnimateSectionText;

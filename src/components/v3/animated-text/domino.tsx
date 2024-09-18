'use client';
import { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimatedTextDomino: React.FC<{ text: string }> = ({ text }: any) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const textWrapper = textRef.current;
    if (textWrapper) {
      textWrapper.innerHTML =
        textWrapper.textContent?.replace(
          /\S/g,
          `<span class='letter'>$&</span>`
        ) || '';

      anime.timeline({ loop: false }).add({
        targets: '.ml10 .letter',
        rotateY: [-90, 0],
        duration: 1300,
        delay: (el, i) => 45 * i
      });
      // .add({
      //   targets: '.ml10',
      //   opacity: 0,
      //   duration: 1000,
      //   easing: 'easeOutExpo',
      //   delay: 1000
      // });
    }
  }, []);

  return (
    <h1 ref={textRef} className="ml10">
      <span className="text-wrapper">
        <span className="letters">{text}</span>
      </span>
    </h1>
  );
};

export default AnimatedTextDomino;

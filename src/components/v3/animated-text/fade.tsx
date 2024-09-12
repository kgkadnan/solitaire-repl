'use client';
import { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimatedTextFade: React.FC<{ text: string }> = ({ text }: any) => {
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
        targets: '.ml12 .letter',
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: (el, i) => 500 + 30 * i
      });
      // .add({
      //   targets: '.ml12 .letter',
      //   translateX: [0, -30],
      //   opacity: [1, 0],
      //   easing: 'easeInExpo',
      //   duration: 1100,
      //   delay: (el, i) => 100 + 30 * i
      // });
    }
  }, []);

  return (
    <h1 ref={textRef} className="ml12">
      <span className="text-wrapper">
        <span className="letters">{text}</span>
      </span>
    </h1>
  );
};

export default AnimatedTextFade;

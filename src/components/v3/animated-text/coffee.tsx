'use client';
import { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimatedTextCoffee: React.FC<{ text: string }> = ({ text }: any) => {
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
        targets: '.ml9 .letter',
        scale: [0, 1],
        duration: 1500,
        elasticity: 600,
        delay: (el, i) => 45 * (i + 1)
      });
      // .add({
      //   targets: '.ml9',
      //   opacity: 0,
      //   duration: 1000,
      //   easing: 'easeOutExpo',
      //   delay: 1000
      // });
    }
  }, []);

  return (
    <h1 ref={textRef} className="ml9">
      <span className="text-wrapper">
        <span className="letters">{text}</span>
      </span>
    </h1>
  );
};

export default AnimatedTextCoffee;

'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const AirpodsScrollAnimation: React.FC = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    gsap.to(imgElement, {
      y: -222.16, // Translate the image
      scale: 0.6, // Scale the image
      opacity: 1, // Fade in the image
      ease: 'power2.out', // Easing for smooth transition
      scrollTrigger: {
        trigger: imgElement,
        start: 'top center', // When the top of the image hits the center of the viewport
        end: 'bottom center',
        scrub: true // Smooth scroll
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      className="ChapterOrigin-staticCrystal common-video"
      style={{ display: 'block' }}
    >
      <img
        ref={imgRef}
        src="/pics/crystal-light-static.webp"
        alt=""
        style={{
          transform: 'translateY(0) scale(1)',
          opacity: 0
        }}
      />
    </div>
  );
};

export default AirpodsScrollAnimation;

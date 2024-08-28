'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AirpodsScrollAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const airpodsRef = useRef<{ frame: number }>({ frame: 0 });
  const frameCount = 440;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = 1100; //1158
    canvas.height = 680; //770

    const currentFrame = (index: number): string =>
      `https://kgk-diamonds-assets.s3.eu-west-1.amazonaws.com/landing-page-assets/globe/Black_bg_0${(
        index + 1
      )
        .toString()
        .padStart(4, '0')}.png`;
    // `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      imagesRef.current.push(img);
    }

    gsap.to(airpodsRef.current, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: canvas,
        start: 'top top',
        end: () => `+=${(canvas.height * frameCount) / 2}`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1
      },
      onUpdate: render
    });

    imagesRef.current[0].onload = render;

    function render() {
      if (!context) return;
      context.clearRect(0, 0, canvas?.width!, canvas?.height!);
      context.drawImage(imagesRef.current[airpodsRef.current.frame], 0, 0);
    }

    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className=" ">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default AirpodsScrollAnimation;

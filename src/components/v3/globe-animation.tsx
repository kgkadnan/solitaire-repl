'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroLightpassCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const frameCount = 430;
    const currentFrame = (index: number) =>
      `/v3/globe/World_Animation_Backup2_gv005_-Camera_${(index + 22)
        .toString()
        .padStart(4, '0')}.png`;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };

    const loadImages = async () => {
      const imagePromises = Array.from({ length: frameCount }, (_, i) => {
        return new Promise<HTMLImageElement>(resolve => {
          const img = new Image();
          img.src = currentFrame(i);
          img.onload = () => resolve(img);
        });
      });

      return Promise.all(imagePromises);
    };

    loadImages().then(loadedImages => {
      images.push(...loadedImages);

      const render = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[airpods.frame], 0, 0);
      };

      gsap.to(airpods, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: canvas,
          start: 'top top', // Adjust start position if necessary
          end: 'bottom bottom', // Adjust end position if necessary
          scrub: 0.5,
          markers: true // Add this line to debug ScrollTrigger
        },
        onUpdate: render
      });

      render(); // Render the initial frame
    });

    return () => {
      // Clean up GSAP animations
      gsap.killTweensOf(airpods);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="fixed" style={{ width: '100%', height: 'auto' }}>
      <canvas ref={canvasRef} width={1000} height={700} />
    </div>
  );
};

export default HeroLightpassCanvas;

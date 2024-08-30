'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const AirpodsScrollAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const airpodsRef = useRef<{ frame: number }>({ frame: 0 });
  const frameCount = 440; // Adjusted for skipping

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set initial canvas dimensions
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize(); // Set size on load
    window.addEventListener('resize', setCanvasSize); // Adjust size on window resize

    const currentFrame = (index: number): string =>
      `/v3/webp-globe/Black_bg_0${(index * 1 + 1) // Skip every other image by incrementing by 2
        .toString()
        .padStart(4, '0')}.webp`;

    // Preload images
    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        imagesRef.current.push(img);
      }
    };

    // Wait until the first image is loaded to start rendering
    const startRendering = () => {
      imagesRef.current[0].onload = () => {
        gsap.to(airpodsRef.current, {
          frame: frameCount - 1, // Adjusted for the skipped frames
          snap: 'frame',
          ease: 'none',
          scrollTrigger: {
            trigger: canvas,
            start: 'top top',
            end: () => `+=${canvas.height * 4}`, // Adjust the end based on the desired scroll length
            scrub: true,
            pin: true,
            anticipatePin: 1
          },
          onUpdate: render
        });

        render(); // Initial render
      };
    };

    const render = () => {
      if (!context) return;

      const image = imagesRef.current[airpodsRef.current.frame];
      if (!image) return; // Ensure the image is available before rendering

      const aspectRatio = image.width / image.height;

      // Calculate the new dimensions of the image to fit the screen
      let imgWidth = canvas.width;
      let imgHeight = canvas.width / aspectRatio;

      if (imgHeight > canvas.height) {
        imgHeight = canvas.height;
        imgWidth = canvas.height * aspectRatio;
      }

      const x = (canvas.width - imgWidth) / 2;
      const y = (canvas.height - imgHeight) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, x, y, imgWidth, imgHeight);
    };

    preloadImages(); // Preload all images
    startRendering(); // Start the rendering process

    return () => {
      // Cleanup ScrollTrigger instances and resize event
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default AirpodsScrollAnimation;

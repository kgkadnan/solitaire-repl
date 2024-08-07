import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroLightpass: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context: any = canvas.getContext('2d');
    if (!context) return;

    const frameCount = 147;
    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };

    canvas.width = 1158;
    canvas.height = 770;

    const currentFrame = (index: number) =>
      `/v3/animation/World_Animation_Backup2_gv005_-Camera_${(index + 100)
        .toString()
        .padStart(4, '0')}.png`;

    // Preload images
    let imagesLoaded = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === frameCount) {
          // Initialize GSAP animation once all images are loaded
          gsap.to(airpods, {
            frame: frameCount - 1,
            snap: 'frame',
            ease: 'none',
            scrollTrigger: {
              trigger: canvas,
              start: 'top top',
              end: `+=${frameCount * (canvas.height / frameCount)}`, // Adjust based on number of frames
              scrub: 0.5,
              onUpdate: render
            }
          });
        }
      };
      images.push(img);
    }

    function render() {
      if (airpods.frame < 0 || airpods.frame >= images.length) return;
      context.clearRect(0, 0, canvas?.width, canvas?.height);
      context.drawImage(images[airpods.frame], 0, 0);
    }

    return () => {
      // Cleanup gsap scrollTrigger
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-lightpass"
      style={{ width: '80%', height: '80%' }}
    ></canvas>
  );
};

export default HeroLightpass;

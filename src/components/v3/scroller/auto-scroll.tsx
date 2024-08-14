'use client';
import React, { useEffect, useRef } from 'react';
import { sustainabilitySection } from '@/constants/v3/sustainability';
import Image from 'next/image';

const AutoScrollImageGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollHeight = container.scrollHeight / 2;
      container.style.animationDuration = `${scrollHeight / 50}s`;
    }
  }, []);

  return (
    <div className="overflow-hidden h-full relative" ref={containerRef}>
      <div className="absolute top-[80px] left-0 w-full flex flex-col continuousScroll">
        {sustainabilitySection.map((section, index: number) => (
          <div
            key={section.imageTitle}
            className={` w-[350px] h-[300px] ${
              index % 2 === 0 ? '!left-0' : '!right-0'
            }`}
          >
            <div className="flex justify-between">
              {' '}
              <p>{section.imageTitle}</p> <p>{section.id}</p>
            </div>
            <Image
              src={section.images[0]}
              alt={section.imageTitle}
              height={250}
              width={350}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollImageGrid;

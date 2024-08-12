'use client';
import React, { useEffect, useRef } from 'react';

const images = [
  'https://via.placeholder.com/400x300?text=1',
  'https://via.placeholder.com/400x300?text=2',
  'https://via.placeholder.com/400x300?text=3',
  'https://via.placeholder.com/400x300?text=4'
];

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
      <div className="absolute top-0 left-0 w-full flex flex-col continuousScroll">
        {images.map((src, index) => (
          <div key={index} className="p-4">
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}
        {images.map((src, index) => (
          <div key={index + images.length} className="p-4">
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollImageGrid;

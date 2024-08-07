import React, { useState, useEffect } from 'react';

// Generate image paths
const images = Array.from({ length: 465 - 22 + 1 }, (_, i) => {
  const index = 22 + i;
  const formattedIndex = index.toString().padStart(4, '0'); // Ensure zero-padding
  return `/v3/globe-animation/World_Animation_Backup2_gv005_-Camera_${formattedIndex}.png`;
});

const partitionCount = 4;
const imagesPerPartition = Math.ceil(images.length / partitionCount);

const InteractiveScrollAnimation = () => {
  const [currentPartition, setCurrentPartition] = useState(0);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const partitionHeight = document.body.scrollHeight / partitionCount;
    const newPartition = Math.floor(scrollPosition / partitionHeight);

    setCurrentPartition(Math.min(newPartition, partitionCount - 1)); // Ensure it's within bounds
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-screen h-[80vh] overflow-y-scroll">
      <div className="sticky top-0 w-full h-screen">
        <div className="relative w-full h-full">
          {images.map((src, index) => {
            const partitionIndex = Math.floor(index / imagesPerPartition);
            const isActive = partitionIndex === currentPartition;

            return (
              <div
                key={index}
                className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundImage: `url(${src})`, zIndex: index }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InteractiveScrollAnimation;

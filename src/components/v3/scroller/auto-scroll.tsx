'use client';
import React, { useEffect, useRef } from 'react';
import { sustainabilitySection } from '@/constants/v3/sustainability';
import Image from 'next/image';

const ScrollableSection = ({ section, onClick }: any) => (
  <div
    key={section.imageTitle}
    className="group flex flex-col transition-all duration-300"
    onClick={onClick}
  >
    <div className="w-[350px] h-[300px] ">
      {' '}
      {/* Apply rounded corners to the container */}
      <div className="flex justify-between">
        <div className="text-neutral900 lg:text-[16px] xl:text-[20px] semiBold  flex items-end">
          <div dangerouslySetInnerHTML={{ __html: section.imageTitle }} />
        </div>
        <p className="text-neutral400 lg:text-headingL xl:text-headingXL flex items-baseline mb-[-10px]">
          {section.id}
        </p>
      </div>
      <div className="overflow-hidden rounded-[8px]">
        <Image
          src={section.head}
          alt={section.imageTitle}
          height={250}
          width={350}
          className="object-cover transition-transform duration-300 transform hover:scale-110"
          style={
            {
              userSelect: 'none',
              outline: 'none',
              WebkitUserDrag: 'none',
              userDrag: 'none'
            } as any
          }
          draggable="false"
          onContextMenu={e => e.preventDefault()}
        />
      </div>
    </div>
  </div>
);

const AutoScrollImageGrid = ({ setCarouselIndex }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = React.useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollHeight = container.scrollHeight / 2;
      container.style.animationDuration = `${scrollHeight / 50}s`;
    }
  }, []);

  const renderSection = (sections: any) =>
    sections.map((section: any, index: number) => (
      <div
        key={section.imageTitle}
        className={`flex flex-col transition-transform duration-300 transform 
          
        `}
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => handleClick(section.id)}
      >
        <ScrollableSection section={section} />
      </div>
    ));

  const handleClick = (id: any) => {
    // if(id===)
    setCarouselIndex(id);
    setTimeout(() => {
      window.scrollTo({
        top: 780,
        behavior: 'smooth'
      });
    }, 0);
  };

  return (
    <div
      className={`overflow-hidden h-full relative cursor-pointer flex justify-center ${
        hovered !== null ? 'paused-animation' : ''
      }`}
      ref={containerRef}
    >
      <div className="absolute top-[80px] flex w-[700px]">
        <div className="circular-scroll-content w-[350px] flex flex-col gap-[50px]">
          {renderSection([
            ...sustainabilitySection,
            ...sustainabilitySection,
            ...sustainabilitySection,
            ...sustainabilitySection,
            ...sustainabilitySection,
            ...sustainabilitySection
          ])}
        </div>
        <div className="downward-scroll-content w-[350px] ml-[370px] flex flex-col gap-[50px]">
          {renderSection([
            ...sustainabilitySection,
            ...sustainabilitySection,
            ...sustainabilitySection,
            ...sustainabilitySection,
            ...sustainabilitySection,
            ...sustainabilitySection
          ])}
        </div>
      </div>
    </div>
  );
};

export default AutoScrollImageGrid;

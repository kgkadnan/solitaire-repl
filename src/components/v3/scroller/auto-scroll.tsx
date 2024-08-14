'use client';
import React, { useEffect, useRef } from 'react';
import { sustainabilitySection } from '@/constants/v3/sustainability';
import Image from 'next/image';

const AutoScrollImageGrid = ({ setCarouselIndex }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollHeight = container.scrollHeight / 2;
      container.style.animationDuration = `${scrollHeight / 50}s`;
    }
  }, []);

  return (
    <div
      className="overflow-hidden h-full relative cursor-pointer"
      ref={containerRef}
    >
      <div className="absolute top-[80px] flex">
        <div className="circular-scroll-content w-[350px] ">
          {sustainabilitySection.map(
            (section, index) =>
              index % 2 !== 0 && (
                <div
                  key={section.imageTitle}
                  className="flex flex-col gap-5"
                  onClick={() => {
                    setCarouselIndex(section.id);
                    setTimeout(() => {
                      window.scrollTo({
                        top: 750,
                        behavior: 'smooth'
                      });
                    }, 0);
                  }}
                >
                  <div className="w-[350px] h-[300px]">
                    <div className="flex justify-between">
                      <p className="text-neutral900 text-[20px] w-[150px]">
                        {section.imageTitle}
                      </p>
                      <p className="text-neutral300 text-headingXL mb-[-15px] flex items-end">
                        {section.id}
                      </p>
                    </div>
                    <Image
                      src={section.head}
                      alt={section.imageTitle}
                      height={250}
                      width={350}
                    />
                  </div>
                </div>
              )
          )}
        </div>
        <div className="downward-scroll-content w-[350px] ml-[350px]">
          {sustainabilitySection.map(
            (section, index) =>
              index % 2 !== 0 && (
                <div
                  key={section.imageTitle}
                  className="flex flex-col gap-5"
                  onClick={() => {
                    setCarouselIndex(section.id);
                    setTimeout(() => {
                      window.scrollTo({
                        top: 750,
                        behavior: 'smooth'
                      });
                    }, 0);
                  }}
                >
                  <div className="w-[350px] h-[300px]">
                    <div className="flex justify-between">
                      <p className="text-neutral900 text-[20px] w-[150px]">
                        {section.imageTitle}
                      </p>
                      <p className="text-neutral300 text-headingXL mb-[-15px] flex items-end">
                        {section.id}
                      </p>
                    </div>
                    <Image
                      src={section.head}
                      alt={section.imageTitle}
                      height={250}
                      width={350}
                    />
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoScrollImageGrid;

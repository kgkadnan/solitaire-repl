'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import TimelineBanner from '@public/v3/timeline/timeline-banner.png';
import { aboutUsFirstFold } from '@/constants/v3/about-us';
import TimelineComponent from '@/components/v3/timeline';

export default function AboutUs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef: any = useRef(null);
  const sectionCount = aboutUsFirstFold.length;

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const scrollAmount = scrollContainer.clientWidth * index;
      scrollContainer.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = (event: any) => {
    if (scrollContainerRef.current) {
      // const scrollContainer = scrollContainerRef.current;
      // const scrollAmount = scrollContainer.clientWidth;

      // Throttling to ensure scroll event only updates index once
      if (event.deltaY > 0) {
        // Scroll down
        if (currentIndex < sectionCount - 1) {
          setCurrentIndex(prevIndex =>
            Math.min(prevIndex + 1, sectionCount - 1)
          );
        }
      } else {
        // Scroll up
        if (currentIndex > 0) {
          setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
        }
      }
    }
  };

  useEffect(() => {
    const handleGlobalScroll = (event: any) => {
      event.preventDefault();
      handleScroll(event);
    };

    const throttledHandleScroll = throttle(handleGlobalScroll, 500); // Adjust throttle limit as needed

    window.addEventListener('wheel', throttledHandleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', throttledHandleScroll);
    };
  }, [currentIndex]);

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  // Throttle function to limit the rate at which scroll events are processed
  const throttle = (func: any, limit: any) => {
    let inThrottle: any;
    return () => {
      const args = arguments;
      let context: any;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  return (
    <div className="relative">
      <div className="min-h-[300px] flex items-center px-[112px] bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient">
        <div
          ref={scrollContainerRef}
          className="scroll-container flex overflow-hidden mt-8 w-full"
        >
          {aboutUsFirstFold.map((aboutStep, index) => (
            <div
              key={index}
              className="flex gap-8 flex-none w-full flex-shrink-0 snap-center p-4"
            >
              <div className="w-[600px] text-neutral900 text-headingXL font-bold">
                KGK Diamonds: A Pillar of KGK Group
              </div>
              <div className="flex gap-2">
                <div className="flex gap-3 flex-col w-[600px]">
                  <p className="text-neutral900 text-headingS font-bold">
                    {aboutStep.subtitle}
                  </p>
                  <p className="text-neutral800 text-lRegular">
                    {aboutStep.description}
                  </p>
                </div>
                <p className="text-neutral400 text-headingXL font-bold bottom-0">
                  0{index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="relative">
          <Image
            src={TimelineBanner}
            alt="Timeline banner"
            className="w-full animate-zoom"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 90%)' }}
          />
          <div className="absolute top-[250px] px-[112px] text-neutral0 w-full flex justify-between">
            <div className="w-[500px]">
              <p className="text-headingXL font-bold">The Timeline</p>
              <div className="flex gap-1">
                <div className="absolute transform -translate-x-1/2 top-20 h-full">
                  <div className="h-[75px] mr-4 w-[2px] bg-[white] mx-auto"></div>
                </div>
                <p className="text-headingS">
                  KGK Group, founded by Shri Kesrimal Ji of Jaipur in 1905,
                  began with a humble task of trading coloured gemstones from
                  India.
                </p>
              </div>
            </div>
            {/* <p>scroller</p> */}
          </div>
        </div>

        <div className="mt-[-150px] p-6 mb-20">
          <TimelineComponent />
        </div>
      </div>
    </div>
  );
}

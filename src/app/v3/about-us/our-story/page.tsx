'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import TimelineBanner from '@public/v3/timeline/timeline-banner.png';
import { aboutUsFirstFold } from '@/constants/v3/about-us';
import TimelineComponent from '@/components/v3/timeline';
import AnimationSection from '@/components/v3/animated-text/scroll';

export default function AboutUs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionCount = aboutUsFirstFold.length;
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const scrollAmount = scrollContainer.clientWidth * index;
      console.log(`Scrolling to index ${index}: ${scrollAmount}`);
      scrollContainer.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = (event: WheelEvent) => {
    if (event.deltaY > 0) {
      if (currentIndex < sectionCount - 1) {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, sectionCount - 1));
      }
    } else {
      if (currentIndex > 0) {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
      }
    }
    console.log(`Handled scroll: ${currentIndex}`);
  };

  useEffect(() => {
    const handleGlobalScroll = (event: WheelEvent) => {
      event.preventDefault();
      handleScroll(event);
    };

    const throttledHandleScroll = throttle(handleGlobalScroll, 500);

    window.addEventListener('wheel', throttledHandleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', throttledHandleScroll);
    };
  }, [currentIndex]);

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  const throttle = (func: (event: WheelEvent) => void, limit: number) => {
    let inThrottle: boolean;
    return function (this: any, ...args: [WheelEvent]) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('timeline-animate-zoom');
        } else {
          entry.target.classList.remove('timeline-animate-zoom');
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    if (imageContainerRef.current) {
      observer.observe(imageContainerRef.current);
    }

    return () => {
      if (imageContainerRef.current) {
        observer.unobserve(imageContainerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <div className="min-h-[300px] flex items-center justify-center px-[112px] bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient ">
        <div className="w-full">
          <div className="flex flex-col items-center gap-14 pt-[180px] pb-[80px]">
            <div className="text-neutral900 text-[96px] font-bold text-center leading-[110px] w-[1100px]">
              <AnimationSection>
                KGK Diamonds: A Pillar of KGK Group
              </AnimationSection>
            </div>
            <div className="flex flex-col gap-10">
              {aboutUsFirstFold.map((aboutStep, index) => (
                <div
                  ref={scrollContainerRef}
                  className="flex gap-2 flex-none w-full flex-shrink-0 snap-center scroll-container flex overflow-hidden"
                  key={index}
                >
                  <div className="flex gap-3">
                    {/* <p className="text-neutral900 text-[28px] font-bold w-1/2 ">
                      <AnimationSection>{aboutStep.subtitle}</AnimationSection>
                    </p> */}
                    <p
                      className={`text-neutral800 text-lRegular text-center  w-[1100px]`}
                    >
                      <AnimationSection animationDelay={index === 0 ? 1 : 5}>
                        {aboutStep.description}
                      </AnimationSection>
                    </p>
                  </div>
                  <p className="text-neutral400 text-headingXL font-bold bottom-0 mt-[30px]">
                    <span>
                      <AnimationSection>0{index + 1}</AnimationSection>
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div
          className="relative"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 90%)',
            overflow: 'hidden'
          }}
        >
          <div ref={imageContainerRef} className="w-full">
            <Image
              src={TimelineBanner}
              alt="Timeline banner"
              className="w-full h-[100vh]"
              style={{ zIndex: 1 }}
            />
          </div>
          <div
            className="absolute top-[250px] px-[112px] text-neutral0 w-full flex justify-between"
            style={{ zIndex: 2 }}
          >
            <div className="w-[500px]">
              <div className="text-headingXL font-bold ">
                <AnimationSection>The Timeline</AnimationSection>
              </div>
              <div className="flex gap-1">
                <div className="absolute transform -translate-x-1/2 top-20 h-full">
                  <div className="h-[75px] mr-4 w-[2px] bg-[white] mx-auto"></div>
                </div>
                <div className="text-headingS ">
                  <AnimationSection>
                    KGK Group, founded by Shri Kesrimal Ji of Jaipur in 1905,
                    began with a humble task of trading coloured gemstones from
                    India.
                  </AnimationSection>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[-100px] p-6">
          <TimelineComponent />
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
// import anime from 'animejs';
import TimelineBanner from '@public/v3/timeline/timeline-banner.png';
import { aboutUsFirstFold } from '@/constants/v3/about-us';
import TimelineComponent from '@/components/v3/timeline';
import classNames from 'classnames';

export default function AboutUs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionCount = aboutUsFirstFold.length;
  // const [displayedText, setDisplayedText] = useState('');
  // const [index, setIndex] = useState(0);
  // const typewriterText = "KGK Diamonds: A Pillar of KGK Group";

  // useEffect(() => {
  //   if (index < typewriterText.length) {
  //     const timeoutId = setTimeout(() => {
  //       setDisplayedText(displayedText + typewriterText.charAt(index));
  //       setIndex(index + 1);
  //     }, 100); // Adjust the speed here
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [index, displayedText, typewriterText]);

  // useEffect(() => {
  //   // Wrap every letter in a span for animation
  //   const textWrapper = document.querySelector('.animated-text');
  //   if (textWrapper) {
  //     textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  //     anime.timeline({ loop: true })
  //       .add({
  //         targets: '.animated-text .letter',
  //         scale: [4, 1],
  //         opacity: [0, 1],
  //         translateZ: 0,
  //         easing: "easeOutExpo",
  //         duration: 950,
  //         delay: (el, i) => 70 * i
  //       }).add({
  //         targets: '.animated-text',
  //         opacity: 0,
  //         duration: 1000,
  //         easing: "easeOutExpo",
  //         delay: 1000
  //       });
  //   }
  // }, [displayedText]);

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

  const handleScroll = (event: WheelEvent) => {
    if (event.deltaY > 0) {
      // Scroll down
      if (currentIndex < sectionCount - 1) {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, sectionCount - 1));
      }
    } else {
      // Scroll up
      if (currentIndex > 0) {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
      }
    }
  };

  useEffect(() => {
    const handleGlobalScroll = (event: WheelEvent) => {
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

  return (
    <div className="relative">
      <div className="min-h-[300px] flex items-center px-[112px] bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient">
        <div className="w-full">
          <div className="flex flex-col gap-14 pt-[180px] pb-[80px]">
            <div className="text-neutral900 text-[108px] font-bold text-center leading-[100px] flowy-animate typewriter-text animated-text">
              KGK Diamonds: A Pillar of KGK Group
            </div>
            {aboutUsFirstFold.map((aboutStep, index) => (
              <div
                ref={scrollContainerRef}
                className="flex gap-2 flex-none w-full flex-shrink-0 snap-center scroll-container flex overflow-hidden"
                key={index}
              >
                <div className="flex gap-3">
                  <p className="text-neutral900 text-[28px] font-bold w-1/2 animated-text">
                    {aboutStep.subtitle}
                  </p>
                  <p className="text-neutral800 text-lRegular w-1/2 px-4 pt-[14px]">
                    {aboutStep.description}
                  </p>
                </div>
                <p className="text-neutral400 text-headingXL font-bold bottom-0 mt-[30px]">
                  0{index + 1}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="relative">
          <Image
            src={TimelineBanner}
            alt="Timeline banner"
            className={classNames('w-full timeline-animate-zoom')}
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
          </div>
        </div>

        <div className="mt-[-100px] p-6">
          <TimelineComponent />
        </div>
      </div>
    </div>
  );
}

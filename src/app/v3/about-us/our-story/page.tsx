'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import TimelineBanner from '@public/v3/timeline/timeline-banner.png';
import { aboutUsFirstFold } from '@/constants/v3/about-us';
import TimelineComponent from '@/components/v3/timeline';
import classNames from 'classnames';
import anime from 'animejs/lib/anime.es.js';
import AnimatedTextDomino from '@/components/v3/animated-text/domino';
import AnimatedTextCoffee from '@/components/v3/animated-text/coffee';
import AnimatedTextFade from '@/components/v3/animated-text/fade';
// import './style.module.scss'

export default function AboutUs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionCount = aboutUsFirstFold.length;
  const imageContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Wrap every letter in a span
    const textElements = document.querySelectorAll(
      '.animated-text, .ml9 .letters'
    );
    textElements.forEach((textElement: any) => {
      textElement.innerHTML = textElement.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );
    });

    // Anime.js animation
    anime
      .timeline({ loop: true })
      .add({
        targets: '.animated-text .letter, .ml9 .letter',
        scale: [0, 1],
        duration: 1500,
        elasticity: 600,
        delay: (el, i) => 45 * (i + 1)
      })
      .add({
        targets: '.animated-text, .ml9',
        opacity: 0,
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 1000
      });
  }, []);

  return (
    <div className="relative">
      <div className="min-h-[300px] flex items-center px-[112px] bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient">
        <div className="w-full">
          <div className="flex flex-col gap-14 pt-[180px] pb-[80px]">
            <div className="text-neutral900 text-[108px] font-bold text-center leading-[100px]">
              <AnimatedTextFade text="KGK Diamonds: A Pillar of KGK Group" />
            </div>
            {aboutUsFirstFold.map((aboutStep, index) => (
              <div
                ref={scrollContainerRef}
                className="flex gap-2 flex-none w-full flex-shrink-0 snap-center scroll-container flex overflow-hidden"
                key={index}
              >
                <div className="flex gap-3">
                  <p className="text-neutral900 text-[28px] font-bold w-1/2 ">
                    <AnimatedTextCoffee text={aboutStep.subtitle} />
                  </p>
                  <p className="text-neutral800 text-lRegular w-1/2 px-4 pt-[14px] ">
                    <AnimatedTextFade text={aboutStep.description} />
                  </p>
                </div>
                <p className="text-neutral400 text-headingXL font-bold bottom-0 mt-[30px]">
                  <span>0{index + 1}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="relative">
          <div ref={imageContainerRef}>
            {/* <Image
              src={TimelineBanner}
              alt="Timeline banner"
              className={classNames('w-full', 'timeline-animate-zoom')}
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 90%)' }}
            /> */}
          </div>
          <div className="absolute top-[250px] px-[112px] text-neutral0 w-full flex justify-between">
            <div className="w-[500px]">
              <p className="text-headingXL font-bold animated-text ml9">
                <span className="text-wrapper">
                  <span className="letters">The Timeline</span>
                </span>
              </p>
              <div className="flex gap-1">
                <div className="absolute transform -translate-x-1/2 top-20 h-full">
                  <div className="h-[75px] mr-4 w-[2px] bg-[white] mx-auto"></div>
                </div>
                <p className="text-headingS animated-text ml9">
                  <span className="text-wrapper">
                    <span className="letters">
                      KGK Group, founded by Shri Kesrimal Ji of Jaipur in 1905,
                      began with a humble task of trading coloured gemstones
                      from India.
                    </span>
                  </span>
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

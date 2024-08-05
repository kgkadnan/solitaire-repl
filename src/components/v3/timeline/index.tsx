import React, { useRef, useState, useEffect } from 'react';
import TimelineItem from './timeline-item';
import Timeline from './timeline';
import Diamond from '@public/v3/timeline/diamond.svg';
// import Image from 'next/image';
import CircularArrow from '@public/v3/icons/circular-arrow.svg?url';
import { timelineData } from '@/constants/v3/about-us';

const TimelineComponent: React.FC = () => {
  const divRefs: any = useRef([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const scrollDownToDiv = () => {
    if (currentIndex < divRefs.current.length - 1) {
      divRefs.current[currentIndex + 1]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const scrollUpToDiv = () => {
    if (currentIndex > 0) {
      divRefs.current[currentIndex - 1]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = divRefs.current.indexOf(entry.target);
            setCurrentIndex(index);
          }
        });
      },
      { threshold: 1 }
    );

    divRefs.current.forEach((ref: any) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (divRefs.current) {
        divRefs.current.forEach((ref: any) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  const timelineElements = timelineData.map((data, index) => (
    <div
      key={index}
      ref={el => {
        divRefs.current[index] = el;
      }}
    >
      <TimelineItem
        image={data.image}
        icon={Diamond}
        isLast={data.year === '2023'}
        isFirst={data.year === '1905'}
      >
        <div className="flex flex-col gap-2 pl-[60px]">
          <div className="text-headingXL neutral900 font-bold">{data.year}</div>
          <div className="text-neutral900 text-headingM font-semiBold">
            {data.content}
          </div>
        </div>
      </TimelineItem>
    </div>
  ));

  return (
    <div className="relative">
      <Timeline lineColor="#D0D5DD">
        <div className="flex flex-col ">{timelineElements}</div>
      </Timeline>
      <div className="fixed right-10 top-1/2 -mt-[50px]">
        {/* <Image
          src={circularArrow}
          alt="Up scroller arrow"
          onClick={scrollUpToDiv}
        /> */}
        <div onClick={scrollUpToDiv}>
          <CircularArrow stroke="red" />
        </div>
        <div
          className="absolute left-1/2 top-full w-0.5 h-8 bg-black bg-opacity-50"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 2px, transparent 4px)'
          }}
        ></div>
        <div
          className="absolute h-[60px] !w-[60px] -left-[15px] mt-[35px] border-[1px] border-primaryMain rounded-[50%] p-15 flex items-center text-center justify-center"
          style={{ boxShadow: 'var(--input-shadow)' }}
        >
          {timelineData[currentIndex]?.year ?? '1905'}
        </div>
        <div
          className="absolute mt-[100px] left-1/2 top-full w-0.5 h-8 bg-black bg-opacity-50 "
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, black 0, black 1px, transparent 2px, transparent 4px)'
          }}
        ></div>
        {/* <Image
          src={circularArrow}
          alt="Down scroller arrow"
          className="absolute left-[1px] mt-[132px] rotate-180 fill-[red]"
          onClick={scrollDownToDiv}
        /> */}
        <div
          className="absolute left-[1px] mt-[132px] rotate-180"
          onClick={scrollDownToDiv}
        >
          <CircularArrow stroke="red" />
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;

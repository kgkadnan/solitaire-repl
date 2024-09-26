'use client';
import {
  leadingPrograms,
  traceabilityMatters
} from '@/constants/v3/traceability';
import React from 'react';
import Image from 'next/image';
import TraceabilityHtml from '@/components/v3/traceability-html';
export default function Traceability() {
  return (
    <div>
      <div className="min-h-[800px] pt-[160px] pb-[80px] flex items-center  bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
        <div className="scroll-container flex overflow-hidden  w-full justify-center">
          <div className="flex flex-col gap-2 flex-none w-full flex-shrink-0 snap-center items-center">
            <div className="text-neutral900 text-[52px] font-bold text-center leading-[110px] custom-fadeIn">
              What is Diamond Traceability?
            </div>
            <div className="flex gap-2">
              <div className="flex gap-3 flex-col items-center">
                <div className="text-neutral800 text-[16px] px-4 pt-[14px] w-[832px] text-center content">
                  {/* <AnimationSection animationDelay={0.5}> */}
                  In the diamond industry, traceability refers to the
                  comprehensive tracking of a diamond's journey from the mine to
                  the final consumer. This process ensures transparency,
                  authenticity, and ethical sourcing, allowing both businesses
                  and consumers to verify the origins and history of each
                  diamond.
                  {/* </AnimationSection> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center xl:px-[112px] lg:px-[32px] pb-[40px]">
        <div className="xl:w-[1100px] lg:w-[950px]  ">
          <div className="text-neutral900 text-[52px] font-bold text-center leading-[110px] custom-fadeIn">
            Why Diamond Traceability Matters?
          </div>
          <div className="flex flex-wrap gap-[60px] items-center justify-center">
            {traceabilityMatters.map(matter => (
              <div className="flex flex-col items-center w-[400px] gap-4">
                <Image src={matter.icon} alt={matter.heading} />
                <p className="text-neutral900 text-[20px]">{matter.heading}</p>
                <p className="text-justify text-[16px] text-neutral800 ">
                  {matter.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="xl:px-[112px] lg:px-[32px]  pb-[40px] flex flex-col bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient items-center blur-bottom  justify-center">
        <div className="flex flex-col gap-2 text-center w-[840px] py-[40px] justify-center">
          <div className="flex flex-col gap-2">
            <p className="xl:text-[52px] lg:text-[42px] text-neutral900 font-black">
              How Traceability Works in KGK{' '}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full h-fit">
        <TraceabilityHtml />
      </div>

      <div className="flex flex-col items-center xl:px-[112px] lg:px-[32px] pb-[40px]">
        <div className="w-[1200px]">
          <div className="text-neutral900 text-[52px] font-bold text-center leading-[110px] custom-fadeIn">
            Leading Traceability Programs We use
          </div>
          <div className="flex flex-wrap gap-[60px] items-center justify-center">
            {leadingPrograms.map(program => (
              <div className="flex flex-col w-[560px] items-center gap-4">
                <div
                  className="w-[560px] h-[240px] rounded-[12px] bg-white flex items-center justify-center"
                  style={{ boxShadow: 'var(--popups-shadow' }}
                >
                  {' '}
                  <Image
                    src={program.icon}
                    alt={program.heading}
                    className="rounded-[12px]"
                  />
                </div>
                <div
                  className="w-[528px] rounded-[8px] bg-white p-2 mt-[-120px] h-[220px] gap-2 flex flex-col"
                  style={{ boxShadow: 'var(--popups-shadow' }}
                >
                  <p className="text-neutral900 text-[28px]">
                    {program.heading}
                  </p>
                  <p className="text-neutral800 text-[16px]">
                    {program.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

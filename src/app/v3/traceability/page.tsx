'use client';
import { leadingPrograms } from '@/constants/v3/traceability';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import TraceabilityHtml from '@/components/v3/traceability-html';
import AnimationSection from '@/components/v3/animated-text/scroll';
import arrowUpRight from '@public/v3/traceability/arrow-up-right.svg';
import Link from 'next/link';
export default function Traceability() {
  const [showControls, setShowControls] = useState(false);
  useEffect(() => {
    // Show header after 2 seconds
    const timer = setTimeout(() => {
      setShowControls(true);
    }, 100);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  return (
    <div>
      <div className="-[320px] pt-[160px] pb-[80px] flex items-center  bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
        <div className="scroll-container flex overflow-hidden  w-full justify-center">
          <div className="flex flex-col gap-2 flex-none w-full flex-shrink-0 snap-center items-center">
            <div className="text-neutral900 text-[52px] font-black text-center leading-[110px] custom-fadeIn">
              <AnimationSection>How Traceability Works in KGK</AnimationSection>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-3 flex-col items-center">
                <div className="text-neutral800 text-[16px] px-4 pt-[14px] w-[832px] text-center content">
                  <AnimationSection animationDelay={0.5}>
                    At KGK, every diamond undergoes a traceable journey through
                    our GemTrac program, ensuring transparency at each stage.
                    The video below highlights this process, and additional
                    traceability options are available upon request.
                  </AnimationSection>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="xl:px-[112px] lg:px-[32px] bg-neutral0 flex flex-col  items-center justify-center">
        <div className="flex flex-col gap-2 text-center w-[840px] py-[40px] justify-center">
          <div className="flex flex-col gap-2">
            <p className="xl:text-[52px] lg:text-[42px] text-neutral900 font-black">
              How Traceability Works in KGK{' '}
            </p>
          </div>
        </div>
      </div> */}
      <div className="flex justify-center w-full h-fit">
        <TraceabilityHtml showControls={showControls} />
      </div>

      <div className="flex flex-col items-center xl:px-[112px] lg:px-[32px] pb-[40px]">
        <div className="w-full">
          <div className="flex flex-col justify-center pb-[20px]  items-center">
            <div className="text-neutral900 text-[52px] font-bold text-center leading-[110px] ">
              Traceability Programs We Offer
            </div>
            <p className="text-[14px] text-neutral900 font-regular">
              To request a traceability program for any stone, please get in
              touch with our sales team.
            </p>
          </div>
          <div className="flex flex-wrap gap-[60px] items-center justify-center">
            {leadingPrograms.map((program, index) => (
              <div className="flex flex-col min-w-[560px] items-center gap-4">
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
                  className={`w-[528px] rounded-[8px] bg-white p-2 mt-[-120px] ${
                    index < 2 ? 'h-[170px]' : 'h-[220px]'
                  } gap-2 flex flex-col`}
                  style={{ boxShadow: 'var(--popups-shadow' }}
                >
                  <p className="text-neutral900 text-[28px]">
                    {program.heading}
                  </p>
                  <p className="text-neutral800 text-[16px]">
                    {program.description}
                  </p>
                  {program.refLink && (
                    <div className=" flex items-center justify-end text-infoMain font-medium text-[14px]">
                      <Link
                        href={program.refLink}
                        className="flex items-center"
                      >
                        Read more
                        <Image src={arrowUpRight} alt="arrowUpRight" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

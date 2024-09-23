'use client';
import React from 'react';

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
    </div>
  );
}

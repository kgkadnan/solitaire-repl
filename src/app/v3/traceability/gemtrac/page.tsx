import AnimationSection from '@/components/v3/animated-text/scroll';
import React from 'react';

const page = () => {
  return (
    <div>
      <div className="-[320px] pt-[160px] pb-[80px] flex items-center  bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
        <div className="scroll-container flex overflow-hidden  w-full justify-center">
          <div className="flex flex-col gap-2 flex-none w-full flex-shrink-0 snap-center items-center">
            <div className="text-neutral900 text-[52px] font-black text-center leading-[110px] custom-fadeIn">
              <AnimationSection>The GemTrac Platform</AnimationSection>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-3 flex-col items-center">
                <div className="text-neutral800 text-[16px] px-4 pt-[14px] w-[832px] text-center content">
                  <AnimationSection animationDelay={0.5}>
                    GemTrac by KGK is a cutting-edge traceability solution
                    designed to follow each diamond's journey with unmatched
                    accuracy and transparency. From the moment it is sourced to
                    its final certification, every step is meticulously
                    documented to ensure ethical sourcing, quality assurance,
                    and consumer trust. With GemTrac, buyers can have complete
                    confidence in the origin and authenticity of their diamonds,
                    backed by a system that delivers detailed insights through
                    an easy-to-use digital interface. Our goal is to set new
                    standards for transparency in the diamond industry, ensuring
                    every stone has a story worth telling.
                  </AnimationSection>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

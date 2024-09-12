'use client';
import React from 'react';
import AutoScrollImageGrid from './auto-scroll';
// import { CommonButton } from '../button';
// import { handleDownloadReport } from '@/utils/download-sustainability-report';
// import DownloadButton from '@public/v3/icons/button-variation.svg';
// import Image from 'next/image';
import AnimationSection from '../animated-text/scroll';
const MainLayout = ({ setCarouselIndex }: any) => {
  return (
    <div className="xl:px-[112px] lg:px-[32px] bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
      <div className="flex h-screen justify-between gap-1">
        <div className="flex-1 flex flex-col justify-center items-start max-w-[350px] gap-5">
          <h1 className="lg:text-headingM xl:text-headingL  font-bold text-neutral900 leading-10">
            <AnimationSection>
              UN Sustainable Development Goals
            </AnimationSection>
          </h1>
          <div className="text-mRegular text-neutral800 pb-8">
            <AnimationSection>
              At KGK, we believe in the brilliance of sustainability. Our
              diamonds are not just a symbol of elegance but also a testament to
              our commitment to ethical sourcing and environmentally responsible
              practices.
            </AnimationSection>
          </div>
          {/* <Image
            src={DownloadButton}
            alt={'button'}
            className="cursor-pointer -ml-[9px]"
            onClick={handleDownloadReport}
          /> */}

          {/* <CommonButton
            onClick={handleDownloadReport}
            variant={'primary'}
            size={'custom'}
            className="rounded-[8px] w-[280px] h-[44px]"
          >
            2024 Sustainability Report
          </CommonButton> */}
        </div>
        <div className="w-[750px]">
          <AutoScrollImageGrid setCarouselIndex={setCarouselIndex} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

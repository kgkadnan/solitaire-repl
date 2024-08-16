'use client';
import React from 'react';
import AutoScrollImageGrid from './auto-scroll';
// import { CommonButton } from '../button';
import { handleDownloadReport } from '@/utils/download-sustainability-report';
import DownloadButton from '@public/v3/icons/button-variation.svg';
import Image from 'next/image';
const MainLayout = ({ setCarouselIndex }: any) => {
  return (
    <div className="px-[112px] bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
      <div className="flex h-screen justify-between">
        <div className="flex-1 flex flex-col justify-center items-start max-w-[400px]">
          <h1 className="text-headingXL font-bold text-neutral900">
            Sustainability
          </h1>
          <p className="text-lRegular text-neutral800 pb-12">
            At KGK, we believe in the brilliance of sustainability. Our diamonds
            are not just a symbol of elegance but also a testament to our
            commitment to ethical sourcing and environmentally responsible
            practices.
          </p>
          <Image
            src={DownloadButton}
            alt={'button'}
            className="cursor-pointer -ml-[9px]"
            onClick={handleDownloadReport}
          />

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

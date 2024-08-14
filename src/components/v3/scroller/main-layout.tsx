'use client';
import React from 'react';
import AutoScrollImageGrid from './auto-scroll';
import { CommonButton } from '../button';

const MainLayout: React.FC = () => {
  return (
    <div className="px-[112px]">
      <div className="flex h-screen justify-between">
        <div className="flex-1 flex flex-col justify-center  max-w-[400px]">
          <h1 className="text-headingXL font-bold text-neutral900">
            Sustainability
          </h1>
          <p className="text-lRegular text-neutral800 pb-12">
            At KGK, we believe in the brilliance of sustainability. Our diamonds
            are not just a symbol of elegance but also a testament to our
            commitment to ethical sourcing and environmentally responsible
            practices.
          </p>
          <CommonButton
            onClick={() => {}}
            variant={'primary'}
            size={'custom'}
            className="rounded-[8px] w-[280px] h-[44px]"
          >
            2024 Sustainability Report
          </CommonButton>
        </div>
        <div className="w-[700px]">
          <AutoScrollImageGrid />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

'use client';

import MainLayout from '@/components/v3/scroller/main-layout';
import React, { useState } from 'react';
import Landscape from '@public/v3/sustainability/landscape.png';
import Image from 'next/image';
import DownloadReport from '@public/v3/sustainability/download-report.png';
import Download from '@public/v3/icons/download.svg';
import { handleDownloadReport } from '@/utils/download-sustainability-report';
import { sustainabilitySection } from '@/constants/v3/sustainability';

const App: React.FC = () => {
  const [carouselIndex, setCarouselIndex] = useState('15');
  return (
    <div className="flex flex-col gap-5">
      <MainLayout setCarouselIndex={setCarouselIndex} />

      {carouselIndex !== '' && (
        <div
          className={`flex justify-center flex-col text-headingXL bold items-center mt-[40px]`}
        >
          <p>A Journey Towards a Sustainable Future</p>
          <div className="w-full px-[112px]">
            <div className="flex h-screen justify-between w-full">
              <div className="flex-1 flex flex-col justify-center  max-w-[400px]">
                <h1 className="text-headingXL font-bold text-neutral900">
                  {
                    sustainabilitySection.filter(
                      data => data.id === carouselIndex
                    )[0].header
                  }
                </h1>
                <p className="text-lRegular text-neutral800 pb-12">
                  {
                    sustainabilitySection.filter(
                      data => data.id === carouselIndex
                    )[0].description
                  }
                </p>
              </div>
              <div className="w-[500px] flex flex-col">
                <div className="flex justify-between">
                  <p className="text-neutral900 text-[20px] w-[150px]">
                    {
                      sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].imageTitle
                    }
                  </p>
                  <p className="text-neutral300 text-headingXL mb-[-15px] flex items-end">
                    {
                      sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].id
                    }
                  </p>
                </div>
                <div className="flex justify-around">
                  <Image
                    src={
                      sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].images
                    }
                    alt={
                      sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].imageTitle
                    }
                    className="h-[600px] w-[500px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        <Image
          src={Landscape}
          alt="download report background"
          className="w-full "
        />
        <div
          className="absolute left-[38%] top-[15%] w-[350px] flex flex-col gap-2 text-neutral0 cursor-pointer"
          onClick={handleDownloadReport}
        >
          <Image src={DownloadReport} alt="download report" />
          <div className="ml-[25px] mt-[-40px]">
            <p className="text-[20px]">2024 Sustainability Report</p>
            <div className="flex gap-2">
              <p>Download</p>
              <Image src={Download} alt="download" />{' '}
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>Read the Latest Sustainability News</p>
      </div>
    </div>
  );
};

export default App;

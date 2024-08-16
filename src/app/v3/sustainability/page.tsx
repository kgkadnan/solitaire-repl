'use client';

import MainLayout from '@/components/v3/scroller/main-layout';
import React, { useEffect, useState } from 'react';
import Landscape from '@public/v3/sustainability/landscape.png';
import Image from 'next/image';
import DownloadReport from '@public/v3/sustainability/download-report.png';
import Download from '@public/v3/icons/download.svg';
import { handleDownloadReport } from '@/utils/download-sustainability-report';
import { sustainabilitySection } from '@/constants/v3/sustainability';
import prev from '@public/v3/icons/previous.svg';
import next from '@public/v3/icons/next.svg';

const App: React.FC = () => {
  const [carouselIndex, setCarouselIndex] = useState('');
  const [lastScrollY, setLastScrollY] = useState(0);

  const prevClick = (id: number) => {
    if (id > 0) {
      setCarouselIndex(sustainabilitySection[id - 1].id);
    }
  };

  const nextClick = (id: number) => {
    if (id < sustainabilitySection.length - 1) {
      setCarouselIndex(sustainabilitySection[id + 1].id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);

      if (scrollDifference > 500) {
        if (currentScrollY > lastScrollY && carouselIndex < '17') {
          // Scrolling down
          nextClick(
            sustainabilitySection.findIndex(
              section => section.id === carouselIndex
            )
          );
        } else if (currentScrollY < lastScrollY && carouselIndex > '0') {
          // Scrolling up
          prevClick(
            sustainabilitySection.findIndex(
              section => section.id === carouselIndex
            )
          );
        }
        setLastScrollY(currentScrollY); // Update lastScrollY only after a section change
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, carouselIndex, sustainabilitySection]);

  return (
    <div className="flex flex-col gap-5">
      <MainLayout setCarouselIndex={setCarouselIndex} />

      {carouselIndex !== '' && (
        <div
          className={`relative flex justify-center flex-col text-headingXL bold items-center mt-[40px] bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom`}
        >
          <p>A Journey Towards a Sustainable Future</p>
          <div className="w-full px-[112px] ">
            <div className="flex h-screen justify-between w-full">
              <div className="flex-1 flex flex-col justify-center max-w-[500px]">
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
          <div className="absolute left-[50%] top-[70%] flex flex-col gap-2">
            <Image
              src={prev}
              alt="previous"
              onClick={() =>
                prevClick(
                  sustainabilitySection.findIndex(
                    section => section.id === carouselIndex
                  )
                )
              }
            />
            <Image
              src={next}
              alt="next"
              onClick={() =>
                nextClick(
                  sustainabilitySection.findIndex(
                    section => section.id === carouselIndex
                  )
                )
              }
            />
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
              <Image src={Download} alt="download" />
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <p>Read the Latest Sustainability News</p>
      </div> */}
    </div>
  );
};

export default App;

'use client';

import MainLayout from '@/components/v3/scroller/main-layout';
import React, { useEffect, useState } from 'react';
import Landscape from '@public/v3/sustainability/landscape.png';
import Image from 'next/image';
import DownloadReport from '@public/v3/sustainability/download-report.png';
import { sustainabilitySection } from '@/constants/v3/sustainability';
import Prev from '@public/v3/icons/previous.svg?url';
import Next from '@public/v3/icons/next.svg?url';

const preloadImages = (imageUrls: any[]): Record<string, string> => {
  const preloaded: Record<string, string> = {};

  imageUrls.forEach(url => {
    const img = new window.Image();
    img.src = url.src;
    preloaded[url.src] = url; // Store the URL as a key-value pair
  });

  return preloaded;
};

const App: React.FC = () => {
  const [carouselIndex, setCarouselIndex] = useState('01'); // Default to the first index
  const [isHoveredNext, setIsHoveredNext] = useState(false);
  const [isHoveredPrev, setIsHoveredPrev] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<
    Record<string, string>
  >({});

  const prevClick = (id: number) => {
    if (id === 0) {
      setCarouselIndex(sustainabilitySection[15].id);
    }
    if (id > 0) {
      setCarouselIndex(sustainabilitySection[id - 1].id);
    }
  };

  const nextClick = (id: number) => {
    if (id === 15) {
      setCarouselIndex(sustainabilitySection[0].id);
    } else if (id < sustainabilitySection.length - 1) {
      setCarouselIndex(sustainabilitySection[id + 1].id);
    }
  };

  useEffect(() => {
    const imagesToPreload = sustainabilitySection.map(data => data.images);
    const preloaded = preloadImages(imagesToPreload);
    setPreloadedImages(preloaded);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 0);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <MainLayout setCarouselIndex={setCarouselIndex} />

      <div
        className={`relative flex justify-center flex-col text-headingXL bold items-center mt-[20px] bg-[length:200%_200%] bg-no-repeat `}
      >
        <p className="lg:text-headingM xl:text-headingXL font-bold">
          A Journey Towards a Sustainable Future
        </p>
        <div className="w-full  xl:px-[112px] lg:px-[32px] my-[20px]">
          <div className="flex  justify-between w-full ">
            <div className="flex-1 flex max-w-[450px] ">
              {typeof sustainabilitySection.filter(
                data => data.id === carouselIndex
              )[0].header === 'string' ? (
                <div
                  className={`flex flex-col  gap-5 ${
                    sustainabilitySection.filter(
                      data => data.id === carouselIndex
                    )[0].id === '03' ||
                    sustainabilitySection.filter(
                      data => data.id === carouselIndex
                    )[0].id === '16'
                      ? 'mt-[20px]'
                      : 'mt-[60px]'
                  }`}
                >
                  <div className="lg:text-headingM xl:text-headingL font-bold text-neutral900 leading-10">
                    {
                      sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].header
                    }
                  </div>
                  <div
                    className="lg:text-mRegular xl:text-lRegular  text-neutral800"
                    dangerouslySetInnerHTML={{
                      __html: sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].description
                    }}
                  ></div>
                  {sustainabilitySection.filter(
                    data => data.id === carouselIndex
                  )[0].metadata && (
                    <div
                      className={`flex flex-wrap  ${
                        carouselIndex === '16' ? 'gap-5 pr-5' : 'gap-10'
                      }`}
                    >
                      {sustainabilitySection
                        .filter(data => data.id === carouselIndex)[0]
                        .metadata?.map(figure => (
                          <div className="flex items-start" key={figure.key}>
                            {/* Gradient line */}
                            <div className="w-[2px] h-full bg-gradient-to-b from-[#FFAD05] via-[#168B85] to-[#5995ED] mr-2 rounded-full"></div>

                            {/* Text content */}
                            <div className="flex flex-col w-[150px]">
                              <p className="text-primaryMain text-headingM font-semiBold">
                                {figure.value}
                              </p>
                              <p className="text-[12px] text-neutral600">
                                {figure.key}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-center max-w-[500px] gap-5">
                  <h1 className="lg:text-headingM xl:text-headingL font-bold text-neutral900 leading-10">
                    {
                      sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].header[0]
                    }
                  </h1>
                  <div className="flex flex-col gap-1">
                    <p className="lg:text-mRegular xl:text-lRegular text-neutral800">
                      {
                        sustainabilitySection.filter(
                          data => data.id === carouselIndex
                        )[0].description[0]
                      }
                    </p>
                    <div className="lg:text-mRegular xl:text-lRegular text-neutral800 pb-1">
                      For more details, visit&nbsp;
                      <a
                        href="https://www.khiltipari.org/"
                        target="_blank"
                        className="underline text-infoMain"
                      >
                        Khilti Pari Foundation.
                      </a>
                    </div>

                    <p className="lg:text-mRegular xl:text-lRegular text-neutral800">
                      {
                        sustainabilitySection.filter(
                          data => data.id === carouselIndex
                        )[0].description[1]
                      }
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-10">
                    {/* {sustainabilitySection[0]} */}
                    {sustainabilitySection[4]?.metadata?.map(figure => (
                      <div className="flex items-start" key={figure.key}>
                        {/* Gradient line */}
                        <div className="w-[2px] h-full bg-gradient-to-b from-[#FFAD05] via-[#168B85] to-[#5995ED] mr-2 rounded-full"></div>

                        {/* Text content */}
                        <div className="flex flex-col w-[150px]">
                          <p className="text-primaryMain text-headingM font-semiBold">
                            {figure.value}
                          </p>
                          <p className="text-[12px] text-neutral600">
                            {figure.key}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div
              className=" flex flex-col rounded-[8px] px-[50px] pb-[50px] items-center pt-[20px] h-auto "
              style={{
                height: 'fit-content',
                width: 'calc(50% - 27px)',
                background: sustainabilitySection.filter(
                  data => data.id === carouselIndex
                )[0].color,
                minWidth: '500px !important'
              }}
            >
              <div className="flex justify-between w-full !px-[15px] mb-[-10px] h-[50px]">
                <div className="text-neutral900 lg:text-[16px] xl:text-[20px] font-bold  flex items-center ">
                  <div
                    style={{ lineHeight: '21px' }}
                    dangerouslySetInnerHTML={{
                      __html: sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].imageTitle
                    }}
                    // className=''
                  />
                </div>
                <p className="text-neutral400 lg:text-headingL xl:text-headingXL mb-[-4px] flex items-center">
                  {
                    sustainabilitySection.filter(
                      data => data.id === carouselIndex
                    )[0].id
                  }
                </p>
              </div>
              <div className="flex justify-around w-full ">
                <Image
                  src={
                    preloadedImages[
                      sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].images.src
                    ]
                  }
                  alt={
                    sustainabilitySection.filter(
                      data => data.id === carouselIndex
                    )[0].imageTitle
                  }
                  className={` w-full`}
                  style={
                    {
                      userSelect: 'none',
                      outline: 'none',
                      WebkitUserDrag: 'none',
                      userDrag: 'none'
                    } as any
                  }
                  draggable="false"
                  onContextMenu={e => e.preventDefault()} // Disable right-click
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-[50%] bottom-[40%] flex flex-col gap-2">
          <div
            className="cursor-pointer"
            onClick={() =>
              prevClick(
                sustainabilitySection.findIndex(
                  section => section.id === carouselIndex
                )
              )
            }
            onMouseEnter={() => setIsHoveredPrev(true)}
            onMouseLeave={() => setIsHoveredPrev(false)}
            style={{ userSelect: 'none', outline: 'none' }}
          >
            <Prev fill={isHoveredPrev ? '#F9FAFB' : '#E4E7EC'} />
          </div>
          <div
            className="cursor-pointer"
            onClick={() =>
              nextClick(
                sustainabilitySection.findIndex(
                  section => section.id === carouselIndex
                )
              )
            }
            onMouseEnter={() => setIsHoveredNext(true)}
            onMouseLeave={() => setIsHoveredNext(false)}
            style={{ userSelect: 'none', outline: 'none' }}
          >
            <Next fill={isHoveredNext ? '#5D6969' : '#343434'} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="relative">
          <Image
            src={Landscape}
            alt="download report background"
            className="w-full"
            style={
              {
                userSelect: 'none',
                outline: 'none',
                WebkitUserDrag: 'none',
                userDrag: 'none'
              } as any
            }
            draggable="false"
            onContextMenu={e => e.preventDefault()}
          />
          <div className="absolute left-[38%] lg:top-[8%] xl:top-[15%] lg:w-[300px] xl:w-[350px] flex flex-col gap-2 text-neutral0">
            <Image
              src={DownloadReport}
              alt="download report"
              style={
                {
                  userSelect: 'none',
                  outline: 'none',
                  WebkitUserDrag: 'none',
                  userDrag: 'none'
                } as any
              }
              draggable="false"
              onContextMenu={e => e.preventDefault()}
            />
            <div className="ml-[25px] mt-[-40px]">
              <p className="text-[16px]">The report will be available soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

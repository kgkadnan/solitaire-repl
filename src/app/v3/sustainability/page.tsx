'use client';

import MainLayout from '@/components/v3/scroller/main-layout';
import React, { useState } from 'react';
import Landscape from '@public/v3/sustainability/landscape.png';
import Image from 'next/image';
import DownloadReport from '@public/v3/sustainability/download-report.png';
// import { handleDownloadReport } from '@/utils/download-sustainability-report';
import { sustainabilitySection } from '@/constants/v3/sustainability';
import Prev from '@public/v3/icons/previous.svg?url';
import Next from '@public/v3/icons/next.svg?url';
// import { getAllPostsForHome } from '@/features/v3/api/blogs';
// import { BlogCarousel } from '@/components/v3/blog-carousel';
// import AnimationSection from '@/components/v3/animated-text/scroll';

const App: React.FC = () => {
  const [carouselIndex, setCarouselIndex] = useState('01'); // Default to the first index
  // const [allPosts, setAllPosts] = useState([]);
  const [isHoveredNext, setIsHoveredNext] = useState(false);
  const [isHoveredPrev, setIsHoveredPrev] = useState(false);

  const prevClick = (id: number) => {
    if (id === 0) {
      setCarouselIndex(sustainabilitySection[15].id);
    }
    if (id > 0) {
      setCarouselIndex(sustainabilitySection[id - 1].id);
      // setTimeout(() => {
      //   window.scrollTo({
      //     top: 780,
      //     behavior: 'smooth'
      //   });
      // }, 0);
    }
  };

  const nextClick = (id: number) => {
    if (id === 15) {
      setCarouselIndex(sustainabilitySection[0].id);
    } else if (id < sustainabilitySection.length - 1) {
      setCarouselIndex(sustainabilitySection[id + 1].id);
      // setTimeout(() => {
      //   window.scrollTo({
      //     top: 780,
      //     behavior: 'smooth'
      //   });
      // }, 0);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const posts = await getAllPostsForHome(false);
  //     setAllPosts(posts?.edges);
  //   };
  //   fetchData();
  // }, []);

  //   useEffect(() => {
  //     const handleScroll = (e: Event) => {
  //       e.preventDefault(); // Prevent default scroll behavior
  //       const currentScrollY = window.scrollY;
  //       const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
  //       // Only trigger carousel update if the scroll exceeds a threshold
  //       if (scrollDifference > 400 && carouselIndex < '17') {
  //         if (currentScrollY > lastScrollY.current) {
  //           // Scrolling down
  //           nextClick(
  //             sustainabilitySection.findIndex(
  //               section => section.id === carouselIndex
  //             )
  //           );
  //         } else if (currentScrollY < lastScrollY.current && carouselIndex > '01') {
  //           // Scrolling up
  //           prevClick(
  //             sustainabilitySection.findIndex(
  //               section => section.id === carouselIndex
  //             )
  //           );
  //         }
  //         lastScrollY.current = currentScrollY;
  //       }

  //       // Reset scroll position to prevent unwanted UI movement
  //       window.scrollTo(0, 0);
  //     };

  //     window.addEventListener('scroll', handleScroll, { passive: false });

  //     return () => {
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   }, [carouselIndex]);

  return (
    <div className="flex flex-col gap-5">
      {/* {carouselIndex === '01' && ( // Render the landscape section only when carouselIndex is '17' */}
      <MainLayout setCarouselIndex={setCarouselIndex} />
      {/* )} */}

      {/* {carouselIndex !== '' && ( */}
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
                    )[0].id === '03'
                      ? 'mt-[80px]'
                      : 'mt-[200px]'
                  }`}
                >
                  <div className="lg:text-headingM xl:text-headingL font-bold text-neutral900 leading-10">
                    {
                      sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].header
                    }
                  </div>
                  <div className="lg:text-mRegular xl:text-lRegular  text-neutral800">
                    {
                      sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].description
                    }
                  </div>
                  {sustainabilitySection.filter(
                    data => data.id === carouselIndex
                  )[0].metadata && (
                    <div className="flex flex-wrap gap-10">
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
                  <p className="lg:text-mRegular xl:text-lRegular text-neutral800">
                    {
                      sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].description[0]
                    }
                  </p>
                  <div className="lg:text-mRegular xl:text-lRegular text-neutral800">
                    For more details, visit&nbsp;
                    <a
                      href="https://www.khiltipari.org/"
                      target="_blank"
                      className="underline text-infoMain"
                    >
                      Khilti Pari Foundation.
                    </a>
                  </div>
                  <h1 className="lg:text-headingS xl:text-headingM font-bold text-neutral900 leading-8">
                    {
                      sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].header[1]
                    }
                  </h1>
                  <p className="text-lRegular text-neutral800">
                    {
                      sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].description[1]
                    }
                  </p>
                </div>
              )}
            </div>
            <div
              className=" flex flex-col rounded-[8px] px-[50px] pb-[50px] items-center pt-[20px] h-auto"
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
                    sustainabilitySection.filter(
                      data => data.id === carouselIndex
                    )[0].images
                  }
                  alt={
                    sustainabilitySection.filter(
                      data => data.id === carouselIndex
                    )[0].imageTitle
                  }
                  className={` w-full `}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-[50%] bottom-[25%] flex flex-col gap-2">
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
      {/* )} */}

      {/* {carouselIndex === '17' && ( // Render the landscape section only when carouselIndex is '17' */}
      <div className="flex flex-col gap-10">
        <div className="relative">
          <Image
            src={Landscape}
            alt="download report background"
            className="w-full"
          />
          <div className="absolute left-[38%] lg:top-[8%] xl:top-[15%] lg:w-[300px] xl:w-[350px] flex flex-col gap-2 text-neutral0">
            <Image src={DownloadReport} alt="download report" />
            <div className="ml-[25px] mt-[-40px]">
              <p className="text-[16px]">
                The report will be available starting in November 2024.
              </p>
              {/* <Image
                src={DownloadReportCTA}
                alt={'button'}
                className="cursor-pointer -ml-[9px] lg:!w-[250px]  xl:!w-[300px] "
                onClick={handleDownloadReport}
                // width={300}
              /> */}
              {/* <div className="flex gap-2">
                <p>Download</p>
                <Image src={Download} alt="download" />
              </div> */}
            </div>
          </div>
        </div>
        {/* <div className="flex w-full flex-col items-center gap-12">
          <p className="lg:text-headingM xl:text-headingXL font-bold flex text-center">
            <AnimationSection>
              Read the Latest Sustainability News
            </AnimationSection>
          </p>
          <div className="w-[1000px] pb-[48px]">
            {allPosts?.length > 0 && <BlogCarousel posts={allPosts} />}
          </div>
        </div> */}
      </div>
      {/* )} */}
    </div>
  );
};

export default App;

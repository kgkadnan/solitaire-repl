'use client';

import MainLayout from '@/components/v3/scroller/main-layout';
import React, { useState } from 'react';
import Landscape from '@public/v3/sustainability/landscape.png';
import Image from 'next/image';
import DownloadReport from '@public/v3/sustainability/download-report.png';
// import { handleDownloadReport } from '@/utils/download-sustainability-report';
import { sustainabilitySection } from '@/constants/v3/sustainability';
import prev from '@public/v3/icons/previous.svg';
import next from '@public/v3/icons/next.svg';
// import { getAllPostsForHome } from '@/features/v3/api/blogs';
// import { BlogCarousel } from '@/components/v3/blog-carousel';
// import AnimationSection from '@/components/v3/animated-text/scroll';

const App: React.FC = () => {
  const [carouselIndex, setCarouselIndex] = useState('01'); // Default to the first index
  // const [allPosts, setAllPosts] = useState([]);
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
  // // console.log(currentScrollY,lastScrollY.current)
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

  //   console.log(carouselIndex);

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
        <div className="w-full !h-[750px] xl:px-[112px] lg:px-[32px] mt-[20px]">
          <div className="flex !h-[750px] justify-between w-full ">
            <div className="flex-1 flex flex-col justify-center max-w-[450px] gap-5">
              {typeof sustainabilitySection.filter(
                data => data.id === carouselIndex
              )[0].header === 'string' ? (
                <>
                  <div className="lg:text-headingM xl:text-headingL font-bold text-neutral900 leading-10">
                    {
                      sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].header
                    }
                  </div>
                  <div className="lg:text-mRegular xl:text-lRegular  text-neutral800 pb-12">
                    {
                      sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].description
                    }
                  </div>
                </>
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
                    For more details, visit
                    <a
                      href="https://www.khiltipari.org/"
                      target="_blank"
                      className="underline text-infoMain"
                    >
                      Khilti Pari Foundation.
                    </a>
                  </div>
                  <h1 className="lg:text-mRegular xl:text-lRegular font-bold text-neutral900 leading-10">
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
              className=" flex flex-col rounded-[8px] h-full items-center justify-center"
              style={{
                width: 'calc(50% - 27px)',
                background: sustainabilitySection.filter(
                  data => data.id === carouselIndex
                )[0].color,
                minWidth: '500px !important'
              }}
            >
              <div className="flex justify-between w-[470px] mx-[15px]">
                <div className="text-neutral900 lg:text-[16px] xl:text-[20px] font-bold  flex items-baseline ">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sustainabilitySection.filter(
                        data => data.id === carouselIndex
                      )[0].imageTitle
                    }}
                    // className=''
                  />
                </div>
                <p className="text-neutral400 lg:text-headingL xl:text-headingXL mb-[-16px] flex items-baseline">
                  {
                    sustainabilitySection.filter(
                      data => data.id === carouselIndex
                    )[0].id
                  }
                </p>
              </div>
              <div className="flex justify-around ">
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
                  className={` w-[500px] ${
                    sustainabilitySection.filter(
                      data => data.id === carouselIndex
                    )[0].id === '16' && 'h-[600px]'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-[50%] bottom-[20%] flex flex-col gap-2">
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
                The report will be available starting in November.
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

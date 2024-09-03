import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ExploreNow from '@public/v3/home/explore.svg';
import { useRouter } from 'next/navigation';
import US from '@public/v3/home/map/usa.svg';
import India from '@public/v3/home/map/india.svg';
import Belgium from '@public/v3/home/map/belgium.svg';
import Dubai from '@public/v3/home/map/dubai.svg';
import Hongkong from '@public/v3/home/map/hongkong.png';

// import ShimmerButton from '../animated-button';

const HtmlAnimation = () => {
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const router = useRouter();

  const imageList = [
    '/v3/home/usa.png',
    '/v3/home/india.png',
    '/v3/home/belgium.png',
    '/v3/home/hongkong.png',
    '/v3/home/dubai.png'
  ];

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 0);
  }, []);

  useEffect(() => {
    const phoneTimer = setTimeout(() => {
      setPhoneVisible(true);
    }, 300); // Delay before the phone and cards start scrolling up

    const bannerTimer = setTimeout(() => {
      setShowBanner(true);
    }, 1500); // Delay to show the banner after the phone and cards scroll up

    return () => {
      clearTimeout(phoneTimer);
      clearTimeout(bannerTimer);
    };
  }, []);

  useEffect(() => {
    if (showBanner) {
      const scrollTimer = setInterval(() => {
        setScrollIndex(prevIndex => {
          if (prevIndex < imageList.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(scrollTimer);
            return prevIndex;
          }
        });
      }, 2000); // Time between each card scroll
      return () => clearInterval(scrollTimer);
    }
  }, [showBanner, imageList.length]);

  const leftContainer = [
    {
      name: 'U.S.',
      image: US
    },
    {
      name: 'INDIA',
      image: India
    },
    {
      name: 'BELGIUM',
      image: Belgium
    },
    {
      name: 'UAE',
      image: Dubai
    },
    {
      name: 'HONG KONG',
      image: Hongkong
    }
  ];

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 80px)' }}>
      <div className="flex justify-around relative px-[50px]">
        {/* Left div */}
        <div
          className={`flex flex-col gap-4 mt-[100px] w-[250px] transition-opacity duration-700 ease-in-out transform ${
            showBanner
              ? 'opacity-100 scale-100 translate-x-0'
              : 'opacity-0 scale-90 translate-x-1/2'
          }`}
        >
          <p className="text-[32px] font-semiBold text-neutral900 leading-[36px]">
            KGK Inventory Locations
          </p>
          <div className="flex gap-4 flex-wrap">
            {leftContainer.map(data => (
              <div
                key={data.name}
                className="w-fit flex justify-center flex-col items-center"
              >
                <div className="w-[44px] h-[44px]">
                  <Image src={data.image} alt={data.name} />
                </div>
                <p className="text-[20px] text-neutral900">{data.name}</p>
              </div>
            ))}
          </div>
        </div>
        {/* // phoneVisible
            //   ? 'translate-y-[-210px] 2xl:translate-y-[-210px] lg:translate-y-[-290px] 1600px:translate-y-[-180px] 1920px:translate-y-[-180px]'
            //   : // ? ' lg:translate-y-[-262px]  xl:translate-y-[-200px] 2xl:translate-y-[-200px] 3xl:translate-y-[-60px]'
                // 'translate-y-[calc(1200px - 100vh)]'
          // } */}
        {/* Phone Skeleton */}
        <div
          className={`relative w-[460px] h-[1200px] bg-no-repeat bg-contain transition-transform duration-700 ease-in-out z-10  `}
          style={{
            backgroundImage: `url('/v3/home/phone-skeleton.png')`,
            zIndex: 10, // Ensure phone skeleton is on top
            // transform: `${
            //   phoneVisible
            //     ? 'translateY(calc(100vh - 1000px))'
            //     : 'translateY(100vh)'
            // }`
            transform: phoneVisible
              ? window.innerWidth >= 1280 // xl breakpoint (1280px and above)
                ? 'translateY(calc(100vh - 950px))'
                : window.innerWidth >= 1024 // lg breakpoint (1024px and above)
                ? 'translateY(calc(100vh - 895px))'
                : 'translateY(calc(100vh - 800px))' // Default for smaller screens
              : 'translateY(100vh)'
          }}
        ></div>

        {/* Scrolling Cards */}
        {/* lg:top-[120px] xl:top-[180px] 2xl:top-[180px] 3xl:top-[330px]  */}
        {/* ${
            phoneVisible ? 'translate-y-[120px]' : 'translate-y-full'
          } */}
        <div
          className={`absolute  transform -translate-x-1/2 w-[370px] h-[700px] overflow-hidden transition-transform duration-700 ease-in-out z-0`}
          style={{
            zIndex: 0, // Ensure cards are beneath the phone skeleton
            // left:'35% !important',
            // transform: `${
            //   phoneVisible
            //     ? 'translateY(calc(100vh - 610px))'
            //     : 'translateY(100vh)'
            // }`
            transform: phoneVisible
              ? window.innerWidth >= 1280 // xl breakpoint (1280px and above)
                ? 'translateY(calc(100vh - 565px))'
                : window.innerWidth >= 1024 // lg breakpoint (1024px and above)
                ? 'translateY(calc(100vh - 510px))'
                : 'translateY(calc(100vh - 410px))' // Default for smaller screens
              : 'translateY(100vh)'
          }}
        >
          <ul
            className="list-none p-0 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateY(-${
                scrollIndex * (100 / imageList.length)
              }%)` // Adjust scroll position
            }}
          >
            {imageList.map((src, index) => (
              <li key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className={`w-full mx-auto py-[6px] ${
                    scrollIndex !== 0 && ''
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Right div */}
        <div
          className={`mt-[250px] w-[250px] transition-opacity duration-700 ease-in-out transform ${
            showBanner
              ? 'opacity-100 scale-100 translate-x-0'
              : 'opacity-0 scale-90 translate-x-1/2'
          }`}
        >
          <div className="w-[180px] text-neutral900">
            <span className="text-[48px] font-semiBold">2.0</span>
            <span className="text-[20px]">
              Points
              <br /> below
            </span>{' '}
            <span
              className="text-[20px] font-semiBold"
              style={{
                background: 'linear-gradient(90deg, #DBF2FC, #E8E8FF, #FFF4E3)',
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: 'transparent'
              }}
            >
              RAP Price
            </span>
          </div>
        </div>
      </div>

      {/* Banner that appears after the phone and cards scroll up */}
      <div
        className={`xl:h-[240px] lg:h-[190px] absolute bottom-0 w-full text-center bg-white flex justify-center shadow-lg transition-transform duration-700 ease-in-out ${
          showBanner ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          // height: '280px',
          zIndex: 10,
          boxShadow: '0 4px 20px rgba(44, 110, 110, 0.38)'
        }}
      >
        <div className="bg-white pt-5 h-full relative flex flex-col justify-center items-center">
          <h1 className="xl:text-[52px] lg:text-[42px] text-neutral900 font-black leading-[48px]">
            Direct Access to KGK’s Global Diamond Inventory
          </h1>
          <p className="xl:text-[36px] lg:text-[28px] text-neutral900  mb-[20px] font-semiBold">
            Create a Guest Account
          </p>
          <Image
            src={ExploreNow}
            alt="explore now"
            onClick={() => router.push('/v2/register')}
            className="cursor-pointer lg:w-[224px]"
          />
          {/* <ShimmerButton
            className="!rounded-[8px] w-[200px] h-[44px]"
            onClick={() => router.push('/v2/register')}
          >
            Explore Now!
          </ShimmerButton> */}
        </div>
      </div>
    </div>
  );
};

export default HtmlAnimation;

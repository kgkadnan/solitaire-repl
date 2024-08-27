import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ExploreNow from '@public/v3/home/explore.svg';
import { useRouter } from 'next/navigation';
import US from '@public/v3/home/map/usa.svg';
import India from '@public/v3/home/map/india.svg';
import Belgium from '@public/v3/home/map/belgium.svg';
import Dubai from '@public/v3/home/map/dubai.svg';

const HtmlAnimation = () => {
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const router = useRouter();

  const imageList = [
    '/v3/home/usa.png',
    '/v3/home/india.png',
    '/v3/home/belgium.png',
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
      }, 1000); // Time between each card scroll
      return () => clearInterval(scrollTimer);
    }
  }, [showBanner, imageList.length]);

  const leftContainer = [
    {
      name: 'U.S',
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
    }
  ];

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 50px)' }}>
      <div className="flex justify-around relative px-[50px]">
        {/* Left div */}
        <div
          className={`flex flex-col gap-4 mt-[100px] w-[265px] transition-opacity duration-700 ease-in-out transform ${
            showBanner
              ? 'opacity-100 scale-100 translate-x-0'
              : 'opacity-0 scale-90 translate-x-1/2'
          }`}
        >
          <p className="text-[30px] font-semiBold text-neutral900">
            KGK Inventory Locations
          </p>
          <div className="flex gap-4">
            {leftContainer.map(data => (
              <div key={data.name}>
                <div className="w-[44px] h-[44px]">
                  <Image src={data.image} alt={data.name} />
                </div>
                <p className="text-[14px] text-neutral900">{data.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Phone Skeleton */}
        <div
          className={`relative w-[460px] h-[1200px] bg-no-repeat bg-contain transition-transform duration-700 ease-in-out z-10 ${
            phoneVisible ? 'translate-y-[-210px]' : 'translate-y-full'
          }`}
          style={{
            backgroundImage: `url('/v3/home/phone-skeleton.png')`,
            zIndex: 10 // Ensure phone skeleton is on top
          }}
        ></div>

        {/* Scrolling Cards */}
        <div
          className={`absolute top-[180px] left-1/2 transform -translate-x-1/2 w-[370px] h-[700px] overflow-hidden transition-transform duration-700 ease-in-out z-0 ${
            phoneVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{
            zIndex: 0 // Ensure cards are beneath the phone skeleton
          }}
        >
          <ul
            className="list-none p-0 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateY(-${
                scrollIndex * (100 / (imageList.length + 1))
              }%)` // Adjust scroll position
            }}
          >
            {imageList.map((src, index) => (
              <li key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className={`w-full mx-auto mb-[12px] ${
                    scrollIndex !== 0 && ''
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Right div */}
        <div
          className={`mt-[250px] w-[265px] transition-opacity duration-700 ease-in-out transform ${
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
        className={`absolute bottom-0 w-full text-center bg-white flex justify-center shadow-lg transition-transform duration-700 ease-in-out ${
          showBanner ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          height: '40%',
          // boxShadow: '0 4px 20px #1F2F2F', // Increased shadow effect
          zIndex: 999,
          boxShadow: '0 4px 20px rgba(44, 110, 110, 0.38)'
          // borderTop: '1px solid #e5e7eb', // Customize border color and width
        }}
      >
        <div className="bg-white py-5 w-[800px] h-full relative flex flex-col justify-center items-center">
          <h1 className="text-[36px] text-neutral900 font-semiBold">
            Trusted by Thousands of Buyers and Sellers
          </h1>
          <p className="text-[20px] text-[#475467] mb-[20px] px-[75px]">
            The world’s largest and most trusted marketplace for diamonds!
          </p>
          <Image
            src={ExploreNow}
            alt="explore now"
            onClick={() => router.push('/v2/register')}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default HtmlAnimation;

import React, { useEffect, useState } from 'react';
import ShimmerButton from '../animated-button';

const HtmlAnimation = () => {
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);

  const imageList = [
    '/v3/home/usa.png',
    '/v3/home/india.png',
    '/v3/home/belgium.png',
    '/v3/home/dubai.png'
  ];

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

  return (
    <div className="h-screen relative w-full">
      <div className="flex justify-center relative">
        <div>kgk</div>

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
                scrollIndex * (100 / imageList.length)
              }%)` // Adjust scroll position
            }}
          >
            {imageList.map((src, index) => (
              <li key={index}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className={`w-full mx-auto mb-[12px] ${
                    scrollIndex !== 0 && 'mt-[-4px]'
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>kgk</div>
      </div>

      {/* Banner that appears after the phone and cards scroll up */}
      <div
        className={`absolute bottom-0 w-full text-center bg-white flex justify-center shadow-lg transition-transform duration-700 ease-in-out ${
          showBanner ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          height: '45%',
          boxShadow: 'var(--popups-shadow)',
          zIndex: 999
        }}
      >
        <div className="bg-white py-5 w-[800px] h-full relative">
          <h1 className="text-[36px] text-neutral900 font-semiBold">
            Trusted by Thousands of Buyers and Sellers
          </h1>
          <p className="text-[20px] text-[#475467] mb-[20px] px-[75px]">
            The world’s largest and most trusted marketplace for diamonds! Proud
            Members of Major Diamond and Jewelry Trade Organizations
          </p>
          <ShimmerButton
            className="!rounded-[8px] w-[200px] h-[44px]"
            onClick={() => {}}
          >
            Explore Now!
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
};

export default HtmlAnimation;

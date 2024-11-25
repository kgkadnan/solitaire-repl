import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ExploreNow from '@public/v3/home/explore.svg';
import { useRouter } from 'next/navigation';
import US from '@public/v3/home/map/usa.svg';
import India from '@public/v3/home/map/india.svg';
import Belgium from '@public/v3/home/map/belgium.svg';
import Dubai from '@public/v3/home/map/dubai.svg';
import Hongkong from '@public/v3/home/map/hongkong.png';
import {
  Tracking,
  Tracking_Click_RegisterPage
} from '@/constants/funnel-tracking';
import { isSessionValid } from '@/utils/manage-session';
import { useLazyRegisterFunnelQuery } from '@/features/api/funnel';
import { trackEvent } from '@/utils/ga';
import Script from 'next/script';
const HtmlAnimation = () => {
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState<any>(); // Track window width
  const [windowHeight, setWindowHeight] = useState<any>(); // Track window width

  const router = useRouter();
  let [funnelTrack] = useLazyRegisterFunnelQuery();

  const imageList = [
    '/v3/home/usa.png',
    '/v3/home/india.png',
    '/v3/home/belgium.png',
    '/v3/home/hongkong.png',
    '/v3/home/dubai.png'
  ];

  // useEffect(() => {
  //   if (
  //     typeof window !== 'undefined' &&
  //     typeof window?.Cookiebot !== 'undefined' &&
  //     typeof window?.Cookiebot?.consent !== 'undefined'
  //   ) {
  //     if (window?.Cookiebot?.consent?.stamp === '0') {
  //       window?.Cookiebot?.renew();
  //     }
  //   }
  // }, []); // Re-initialize on state change

  // }, [showBanner, phoneVisible, scrollIndex]); // Re-initialize on state change

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window?.innerWidth || 0); // Set window width on mount
      setWindowHeight(window?.innerHeight || 0); // Set window width on mount

      // Scroll to top on component mount
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    const phoneTimer = setTimeout(() => {
      setPhoneVisible(true);
    }, 300);

    const bannerTimer = setTimeout(() => {
      setShowBanner(true);
    }, 1500);

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
      }, 2000);
      return () => clearInterval(scrollTimer);
    }
  }, [showBanner, imageList.length]);

  const leftContainer = [
    { name: 'U.S.', image: US },
    { name: 'INDIA', image: India },
    { name: 'BELGIUM', image: Belgium },
    { name: 'UAE', image: Dubai },
    { name: 'HONG KONG', image: Hongkong }
  ];

  return (
    <>
    <div className="relative w-full" style={{ height: 'calc(100vh - 80px)' }}>
      <div className="flex justify-between relative xl:px-[112px] lg:px-[32px]">
        {/* Left div */}
        <div
          className={`flex flex-col gap-4 w-[250px] transition-opacity duration-700 ease-in-out transform ${
            showBanner
              ? 'opacity-100 scale-100 translate-x-0'
              : 'opacity-0 scale-90 translate-x-1/2'
          }`}
          style={{
            marginBottom:
              windowHeight >= 1080
                ? '28%'
                : windowHeight >= 900
                ? '55%'
                : windowHeight >= 850
                ? '52%'
                : windowHeight >= 700
                ? '60.5%'
                : windowHeight >= 600
                ? '68%'
                : '95%',
            marginTop: 'auto'
          }}
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

        {/* Phone Skeleton */}
        <div
          className={`relative w-[460px] h-[1200px] bg-no-repeat bg-contain transition-transform duration-700 ease-in-out z-10 flex justify-center`}
          style={{
            backgroundImage: `url('/v3/home/phone-skeleton.png')`,
            zIndex: '10 !important',
            transform: phoneVisible
              ? windowHeight <= 700
                ? 'translateY(calc(100vh - 880px))'
                : windowWidth >= 1280
                ? 'translateY(calc(100vh - 950px))'
                : windowWidth >= 1024
                ? 'translateY(calc(100vh - 895px))'
                : 'translateY(calc(100vh - 800px))'
              : 'translateY(100vh)'
          }}
        >
          <div
            className={`absolute transform -translate-x-1/2 w-[370px] h-[700px] overflow-hidden transition-transform duration-700 ease-in-out z-0 flex flex-col items-center`}
            style={{
              zIndex: -1,
              transform: phoneVisible
                ? 'translateY(385px)'
                : 'translateY(100vh)'
            }}
          >
            <ul
              className="list-none p-0 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateY(-${
                  scrollIndex * (100 / imageList.length)
                }%)`
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
        </div>

        {/* Right div */}
        <div
          className={`text-neutral900 w-[250px] transition-opacity duration-700 ease-in-out transform ${
            showBanner
              ? 'opacity-100 scale-100 translate-x-0'
              : 'opacity-0 scale-90 translate-x-1/2'
          }`}
          style={{
            marginBottom:
              windowHeight >= 1080
                ? '28%'
                : windowHeight >= 900
                ? '55%'
                : windowHeight >= 850
                ? '52%'
                : windowHeight >= 700
                ? '60.5%'
                : windowHeight >= 600
                ? '68%'
                : '95%',
            marginTop: 'auto'
          }}
        >
          <div className="flex flex-col text-neutral900">
            <span
              className="text-[48px] font-semiBold w-fit"
              style={{
                background: 'linear-gradient(90deg, #DBF2FC, #E8E8FF, #FFF4E3)',
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: 'transparent'
              }}
            >
              50K+
            </span>
            <p className="text-[20px] text-neutral900 pl-2">
              Stones in Inventory
            </p>
          </div>
        </div>
      </div>

      {/* Banner that appears after the phone and cards scroll up */}
      <div
        className={`xl:h-[240px] lg:h-[180px] absolute bottom-0 w-full text-center bg-white flex justify-center shadow-lg transition-transform duration-700 ease-in-out ${
          showBanner ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          zIndex: 10,
          boxShadow: '0 4px 20px rgba(44, 110, 110, 0.38)'
        }}
      >
        <div className="bg-white pt-5 h-full relative flex flex-col justify-center items-center">
          <h1 className="xl:text-[52px] lg:text-[42px] text-neutral900 font-black leading-[48px]">
            Access KGK’s Global Diamond Inventory
          </h1>
          <p className="xl:text-[36px] lg:text-[28px] text-neutral900 mb-[20px] font-semiBold">
            Create a Guest Account
          </p>
          <Image
            src={ExploreNow}
            alt="explore now"
            onClick={() => {
              funnelTrack({
                step: Tracking.Click_RegisterPage,
                entryPoint:
                  Tracking_Click_RegisterPage.LP_Home_Explore_Now_Register,
                sessionId: isSessionValid()
              }),
                trackEvent({
                  action: Tracking.Click_RegisterPage,
                  entry_point:
                    Tracking_Click_RegisterPage.LP_Home_Explore_Now_Register,
                  category: 'Registration'
                });
              localStorage.setItem(
                'entryPoint',
                Tracking_Click_RegisterPage.LP_Home_Explore_Now_Register
              );

              router.push('/v2/register');
            }}
            className="cursor-pointer lg:w-[224px]"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default HtmlAnimation;

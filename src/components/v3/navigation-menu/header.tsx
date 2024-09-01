'use client';
import React, { useEffect, useState, useRef } from 'react';
import { NavigationMenuDemo } from './navigation-menu';
import { CommonButton } from '../button';
import kgkLogo from '@public/v3/kgklogo.svg';
import { usePathname, useRouter } from 'next/navigation';
// import ShimmerButton from '../animated-button';
import Image from 'next/image';
// import Register from '@public/v3/home/register.svg';
import ShimmerButton from '../animated-button';

const CommonHeader = () => {
  const currentRoute = usePathname();
  const router = useRouter();
  const [selectedHeader, setSelectedHeader] = useState<string>('');
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (currentRoute === '/v3') setSelectedHeader('home');
    else if (currentRoute === '/v3/contact-us') setSelectedHeader('contactUs');
    else if (
      currentRoute === '/v3/about-us/our-story' ||
      currentRoute === '/v3/about-us/leadership'
    )
      setSelectedHeader('aboutUs');
    else if (currentRoute === '/v3/traceability')
      setSelectedHeader('traceability');
    else if (currentRoute === '/v3/sustainability')
      setSelectedHeader('sustainability');
  }, [currentRoute]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed w-full z-[99999] transition-transform duration-300 bg-neutral0 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex justify-between h-[80px] items-center xl:px-[112px] lg:px-[32px] border-b-[1px] border-[#F2F4F7]">
        <div className="flex gap-5">
          <Image
            src={kgkLogo}
            alt="KGK logo"
            onClick={() => router.push('/v3')}
          />
          {NavigationMenuDemo(selectedHeader, setSelectedHeader)}
        </div>
        <div className="flex gap-4 ">
          <CommonButton
            onClick={() => router.push('/v2/login')}
            variant={'secondary'}
            size={'custom'}
            className="rounded-[8px] w-[80px] h-[44px] border-primaryMain text-primaryMain"
            style={{ boxShadow: '0px 1px 2px 0px #1018281F' }}
          >
            Login
          </CommonButton>
          {/* <CommonButton
            onClick={() => router.push('/v2/register')}
            variant={'prima'}
            size={'custom'}
            className="rounded-[8px] w-[80px] h-[44px]"
          >
            Register
          </CommonButton> */}
          {/* <Image
            src={Register}
            alt="register"
            onClick={() => {
              router.push('/v2/register');
            }}
            className="cursor-pointer"
          /> */}

          <ShimmerButton
            className="!rounded-[8px] w-[120px] h-[44px]"
            onClick={() => router.push('/v2/register')}
            style={{ boxShadow: '0px 1px 2px 0px #1018281F' }}
          >
            Register
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
};

export default CommonHeader;

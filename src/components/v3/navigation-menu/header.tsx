'use client';
import React, { useEffect, useState } from 'react';
import { NavigationMenuDemo } from './navigation-menu';
import { CommonButton } from '../button';
import Image from 'next/image';
import kgkLogo from '@public/v3/kgklogo.svg';
import { usePathname, useRouter } from 'next/navigation';

const CommonHeader = () => {
  const currentRoute = usePathname();
  const router = useRouter();
  const [selectedHeader, setSelectedHeader] = useState<string>('');
  useEffect(() => {
    if (currentRoute === '/') setSelectedHeader('home');
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
  useEffect;
  return (
    <div className="flex justify-between h-[80px] items-center px-[112px] border-b-[1px] border-[#F2F4F7]">
      <div className="flex gap-5">
        <Image src={kgkLogo} alt="KGK logo" onClick={() => router.push('/')} />
        {NavigationMenuDemo(selectedHeader, setSelectedHeader)}
      </div>
      <CommonButton
        onClick={() => router.push('/v2/login')}
        variant={'primary'}
        size={'custom'}
        className="rounded-[8px] w-[80px] h-[44px]"
      >
        Login
      </CommonButton>
    </div>
  );
};

export default CommonHeader;

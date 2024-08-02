'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Linkedin from '@public/v3/social-media/linkedin.svg';
import { leadership } from '@/constants/v3/about-us';
import { CommonButton } from '@/components/v3/button';

export default function Leadership() {
  const [selectedProfile, setSelectedProfile] = useState<any>({});
  return (
    <div>
      <div className="min-h-[300px] flex items-center px-[112px] bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient">
        <div className="scroll-container flex overflow-hidden mt-8 w-full">
          <div className="flex gap-8 flex-none w-full flex-shrink-0 snap-center p-4">
            <div className="w-[600px] text-neutral900 text-headingXL font-bold">
              Meet KGK Leadership{' '}
            </div>
            <div className="flex gap-2">
              <div className="flex gap-3 flex-col w-[600px]">
                <p className="text-neutral800 text-lRegular">
                  At KGK Diamonds, our team is the backbone of our success. With
                  a wealth of experience and a shared passion for excellence,
                  each member plays a crucial role. Get to know the talented
                  individuals who make KGK Diamonds a leader in the diamond
                  industry.{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-around px-[80px] py-[64px] flex flex-wrap gap-[40px]">
        {Object.keys(selectedProfile).length === 0 ? (
          leadership.map(leader => (
            <div
              className="flex flex-col gap-2 cursor-pointer"
              onClick={() => setSelectedProfile(leader)}
              key={leader.name}
            >
              <div>
                {' '}
                <Image
                  src={leader.image}
                  alt={leader.name}
                  className="rounded-[8px] bg-[#D9D9D9]"
                />
              </div>
              <p className="text-neutral900 font-semiBold text-[20px]">
                {leader.name}
              </p>
              <p className="text-neutral500 text-lRegular">{leader.position}</p>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-6 px-[80px]">
            <div className="flex gap-6 items-end">
              <Image
                src={selectedProfile['image']}
                alt={selectedProfile['name']}
                className="rounded-[8px] bg-[#D9D9D9]"
              />
              <div className="border-b-[2px] border-neutral900">
                <p className="text-neutral900 font-semiBold text-[20px] ">
                  {selectedProfile['name']}
                </p>
                <p className="text-neutral500 text-lRegular">
                  {selectedProfile['position']}
                </p>
              </div>
            </div>
            <p className="text-neutral800 text-[20px]">
              {selectedProfile['description']}
            </p>
            <a href={`https://www.linkedin.com/${selectedProfile['linkedin']}`}>
              {' '}
              <Image src={Linkedin} alt={'Linkedin'} />
            </a>
            <CommonButton
              onClick={() => setSelectedProfile({})}
              variant={'secondary'}
              size={'custom'}
              className="rounded-[8px] w-[150px] h-[44px]"
            >
              &lt;- Back to Team
            </CommonButton>
          </div>
        )}
      </div>
    </div>
  );
}

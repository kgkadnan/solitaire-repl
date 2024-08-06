'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Linkedin from '@public/v3/social-media/linkedin.svg';
import { leadership } from '@/constants/v3/about-us';
import { CommonButton } from '@/components/v3/button';
import AnimationSection from '@/components/v3/animated-text/scroll';

export default function Leadership() {
  const [selectedProfile, setSelectedProfile] = useState<any>({});
  return (
    <div>
      {Object.keys(selectedProfile).length === 0 && (
        <div className="min-h-[300px] pt-[180px] pb-[80px] flex items-center px-[112px] bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient">
          <div className="scroll-container flex overflow-hidden mt-8 w-full">
            <div className="flex flex-col  gap-14 flex-none w-full flex-shrink-0 snap-center p-4">
              <div className=" text-neutral900 text-[108px] font-bold text-center line leading-[100px] custom-fadeIn">
                <AnimationSection>Meet KGK Leadership </AnimationSection>
              </div>
              <div className="flex gap-2">
                <div className="flex gap-3 flex-col">
                  <div className="text-neutral800 text-lRegular  px-4 pt-[14px]">
                    <AnimationSection>
                      At KGK Diamonds, our team is the backbone of our success.
                      With a wealth of experience and a shared passion for
                      excellence, each member plays a crucial role. Get to know
                      the talented individuals who make KGK Diamonds a leader in
                      the diamond industry.{' '}
                    </AnimationSection>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="justify-around px-[80px] py-[64px]  flex flex-wrap gap-[40px]">
        {Object.keys(selectedProfile).length === 0 ? (
          leadership.map(leader => (
            <div
              className="flex flex-col gap-2 cursor-pointer"
              onClick={() => {
                setSelectedProfile(leader),
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
              }}
              key={leader.name}
            >
              <div>
                {' '}
                <Image
                  src={leader.image}
                  alt={leader.name}
                  className="rounded-[8px] bg-[#D9D9D9] h-[375px] w-[375px]"
                />
              </div>
              <p className="text-neutral900 font-semiBold text-[20px]">
                {leader.name}
              </p>
              <p className="text-neutral500 text-lRegular">{leader.position}</p>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-6 px-[190px] mt-10">
            <div className="flex gap-6 items-end">
              <Image
                src={selectedProfile['image']}
                alt={selectedProfile['name']}
                className="rounded-[8px] bg-[#D9D9D9]"
              />
              <div className="border-b-[2px] border-neutral900 w-full">
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

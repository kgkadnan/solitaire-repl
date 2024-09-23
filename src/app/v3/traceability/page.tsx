'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Linkedin from '@public/v3/social-media/linkedin.svg';
import { leadership } from '@/constants/v3/about-us';
import { CommonButton } from '@/components/v3/button';
import AnimationSection from '@/components/v3/animated-text/scroll';

export default function Traceability() {
  const [selectedProfile, setSelectedProfile] = useState<any>({});
  return (
    <div>
      {Object.keys(selectedProfile).length === 0 && (
        <div className="min-h-[800px] pt-[160px] pb-[80px] flex items-center  bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
          <div className="scroll-container flex overflow-hidden  w-full justify-center">
            <div className="flex flex-col gap-12 flex-none w-full flex-shrink-0 snap-center items-center">
              <div className="text-neutral900 text-[96px] font-bold text-center leading-[110px] custom-fadeIn">
                <AnimationSection>Meet KGK Leadership</AnimationSection>
              </div>
              <div className="flex gap-2">
                <div className="flex gap-3 flex-col items-center">
                  <div className="text-neutral800 text-lRegular px-4 pt-[14px] w-[800px] text-center content">
                    <AnimationSection animationDelay={0.5}>
                      Our team is the backbone of our success. Get to know the
                      talented individuals who helped make KGK Diamonds what it
                      is today.
                    </AnimationSection>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className=" flex justify-center ">
        {Object.keys(selectedProfile).length === 0 ? (
          <div className="flex flex-col items-center ">
            <div
              className="flex flex-col gap-2 cursor-pointer xl:px-[112px] lg:px-[42px] "
              onClick={() => {
                setSelectedProfile(leadership[0]);
                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }, 0);
              }}
              key={leadership[0].name}
            >
              <div className="flex flex-col w-fit items-center">
                <div>
                  {' '}
                  <Image
                    src={leadership[0].image}
                    alt={leadership[0].name}
                    className="rounded-[8px] bg-[#D9D9D9] h-[375px] w-[375px]"
                  />
                </div>
                <div className="text-neutral900 font-semiBold text-[20px]">
                  {leadership[0].name}
                </div>
                <p className="text-neutral500 text-lRegular">
                  {leadership[0].position}
                </p>
              </div>
            </div>
            <div className="xl:px-[112px] lg:px-[42px] py-[64px]  flex flex-wrap  justify-center w-full gap-[60px]">
              {leadership.slice(1, 3).map(leader => (
                <div
                  className={`flex flex-col gap-2 cursor-pointer w-fit items-center`}
                  onClick={() => {
                    setSelectedProfile(leader);
                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }, 0);
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
                  <div className="text-neutral900 font-semiBold text-[20px]">
                    {leader.name}
                  </div>
                  <p className="text-neutral500 text-lRegular ">
                    {leader.position}
                  </p>
                </div>
              ))}
              {/* <div
                className="flex flex-col gap-2 cursor-pointer xl:invisible hidden xl:flex w-fit items-center"
                onClick={() => {
                  setSelectedProfile(leadership[0]);
                  setTimeout(() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    });
                  }, 0);
                }}
                key={leadership[0].name}
                // style={{visibility:window.innerWidth>1024?'none' :'hidden'}}
              >
                <div>
                  {' '}
                  <Image
                    src={leadership[0].image}
                    alt={leadership[0].name}
                    className="rounded-[8px] bg-[#D9D9D9] h-[375px] w-[375px]"
                  />
                </div>
                <div className="text-neutral900 font-semiBold text-[20px]">
                  {leadership[0].name}
                </div>
                <p className="text-neutral500 text-lRegular">
                  {leadership[0].position}
                </p>
              </div>{' '} */}
            </div>
            <div className="xl:px-[112px] lg:px-[42px] flex flex-wrap justify-center w-full gap-[60px]">
              {leadership.slice(3, 10).map(leader => (
                <div
                  className="flex flex-col gap-2 cursor-pointer pb-[64px] w-fit items-center"
                  onClick={() => {
                    setSelectedProfile(leader);
                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }, 0);
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
                  <div className="text-neutral900 font-semiBold text-[20px]">
                    {leader.name}
                  </div>
                  <p className="text-neutral500 text-lRegular">
                    {leader.position}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 px-[190px] mt-24 mb-4">
            <div className="flex gap-6 items-end">
              <Image
                src={selectedProfile['image']}
                alt={selectedProfile['name']}
                className="rounded-[8px] bg-[#D9D9D9]"
              />
              <div className="border-b-[2px] border-neutral900 w-full">
                <div className="text-neutral900 font-semiBold text-[20px] ">
                  <AnimationSection>{selectedProfile['name']}</AnimationSection>
                </div>
                <div className="text-neutral500 text-lRegular">
                  <AnimationSection animationDelay={0.5}>
                    {selectedProfile['position']}
                  </AnimationSection>
                </div>
              </div>
            </div>
            <div className="text-neutral800 text-[20px]">
              {/* <AnimationSection animationDelay={1}> */}
              {selectedProfile['description']}
              {/* </AnimationSection> */}
            </div>
            <a
              href={`https://www.linkedin.com/${selectedProfile['linkedin']}`}
              target="_blank"
            >
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

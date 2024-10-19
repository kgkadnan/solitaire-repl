'use client';
import AnchorLink from '@/components/v3/anchro-link';
import AnimationSection from '@/components/v3/animated-text/scroll';
import { CommonButton } from '@/components/v3/button';
import {
  traceabilityAnchorLink,
  traceabilityGemTrac
} from '@/constants/v3/traceability';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const page = () => {
  const router = useRouter();
  return (
    <div>
      <div className="-[320px] pt-[160px] pb-[80px] flex items-center  bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
        <div className="scroll-container flex overflow-hidden  w-full justify-center">
          <div className="flex flex-col gap-2 flex-none w-full flex-shrink-0 snap-center items-center">
            <div className="text-neutral900 text-[52px] font-black text-center leading-[110px]">
              <AnimationSection>The GemTrac Platform</AnimationSection>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-3 flex-col items-center">
                <div className="text-neutral800 lg:text-[16px] md:text-[14px] px-4 pt-[14px] w-[1020px] text-center content">
                  <AnimationSection animationDelay={0.5}>
                    GemTrac by KGK is a cutting-edge traceability solution
                    designed to follow each diamond's journey with unmatched
                    accuracy and transparency. From the moment it is sourced to
                    its final certification, every step is meticulously
                    documented to ensure ethical sourcing, quality assurance,
                    and consumer trust. With GemTrac, buyers can have complete
                    confidence in the origin and authenticity of their diamonds,
                    backed by a system that delivers detailed insights through
                    an easy-to-use digital interface. Our goal is to set new
                    standards for transparency in the diamond industry, ensuring
                    every stone has a story worth telling.
                  </AnimationSection>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:px-[112px] lg:px-[32px] bg-neutral25 flex flex-col  items-center justify-center">
        <div className="flex flex-col gap-2 text-center w-[950px] py-[40px] justify-center">
          <div className="flex flex-col gap-2">
            <p className="xl:text-[36px] lg:text-[30px] text-neutral900 font-black">
              Experience the Journey of a GemTrac Diamond
            </p>
            <p className="xl:text-[16px] lg:text-[14px] text-neutral800 ">
              With GemTrac, KGK provides a complete and transparent journey for
              each diamond, tracking every step from the mine to the market. Our
              advanced traceability program ensures that every diamond is
              accounted for at each stage, from sourcing to certification,
              offering unparalleled assurance of its authenticity and ethical
              journey. Here’s an example of how a diamond’s journey unfolds
              through the GemTrac platform:
            </p>
          </div>
        </div>
      </div>
      <div className="px-[32px] pt-[8px] border-[1px]  rounded-t-[8px] border-solid border-neutral200 bg-neutral0 flex flex-col  items-center justify-center">
        <AnchorLink anchorNavigations={traceabilityAnchorLink} />
      </div>

      <div
        className="border-b-[1px] border-solid border-neutral200 bg-neutral25"
        style={{ boxShadow: '0px 1px 2px 0px #1018281F' }}
      >
        <div className="flex flex-col items-center xl:px-[112px] lg:px-[50px] pt-[10px]">
          <div className="w-full flex flex-col gap-[8px]">
            {traceabilityGemTrac.map((gemTrac, index) => {
              return (
                <div
                  id={gemTrac.id}
                  className="flex  pb-[15px] items-start justify-between min-h-[420px]"
                  key={gemTrac.id}
                >
                  <div className="flex flex-col w-[528px]">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={gemTrac.icon}
                        alt="trace steps"
                        className="xl:w-[40px] xl:h-[40px] lg:w-[32px] lg:h-[32px] flex items-center"
                      />
                      <p className="lg:text-[24px] xl:text-[28px] text-primaryMain font-medium flex items-center">
                        {gemTrac.header}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {index !== traceabilityGemTrac.length - 1 && (
                        <div className="xl:pl-[20px] lg:pl-[15px]">
                          <div
                            className={`border-l border-dotted border-gray-400 ${
                              index === 0
                                ? 'xl:h-[165%] lg:h-[158%]'
                                : index === 2
                                ? 'xl:h-[129%] lg:h-[124%]'
                                : index === 4
                                ? 'xl:h-[120%] lg:h-[115%]'
                                : 'xl:h-[125%] lg:h-[120.5%]'
                            }  xl:mt-[-15px] lg:mt-[-10px]`}
                          ></div>
                        </div>
                      )}
                      <div
                        className={`flex flex-col gap-2 ${
                          index !== traceabilityGemTrac.length - 1
                            ? 'pl-[18px]'
                            : 'pl-[43px]'
                        } ${
                          index === traceabilityGemTrac.length - 1
                            ? 'lg:w-[474px]'
                            : 'lg:w-[450px]'
                        }   xl:w-full w-full`}
                      >
                        <div className="flex flex-col gap-2">
                          <p className="lg:text-[14px] xl:text-[16px] text-primaryMain font-medium">
                            {gemTrac.title}
                          </p>
                          <p className="lg:text-[14px] xl:text-[16px] font-regular text-neutral-900">
                            {gemTrac.description}
                          </p>
                        </div>
                        {gemTrac.chosenBy && gemTrac.details && (
                          <div className="flex flex-col gap-2 pt-4  ">
                            <div className="flex flex-col">
                              <p className="xl:text-[14px] lg:text-[12px] text-neutral700 font-regular">
                                Chosen by
                              </p>
                              <p className="xl:text-[16px] lg:text-[14px] text-primaryMain font-medium">
                                {gemTrac.chosenBy}
                              </p>
                            </div>
                            <p className="xl:text-[16px] lg:text-[14px] text-neutral900 font-medium">
                              {gemTrac.details}
                            </p>
                          </div>
                        )}

                        {gemTrac.metadata.length > 0 && (
                          <div className="flex  flex-wrap gap-28">
                            {/* Left Column */}
                            <div className="flex flex-col gap-6">
                              {gemTrac.metadata
                                ?.slice(
                                  0,
                                  Math.ceil(gemTrac.metadata.length / 2)
                                )
                                .map(figure => (
                                  <div
                                    className="flex items-start"
                                    key={figure.key}
                                  >
                                    {/* Gradient line */}
                                    <div className="w-[2px] h-full bg-gradient-to-b from-[#FFAD05] via-[#168B85] to-[#5995ED] mr-2 rounded-full"></div>

                                    {/* Text content */}
                                    <div className="flex flex-col">
                                      <p className="text-primaryMain text-headingM font-semiBold">
                                        {figure.value}
                                      </p>
                                      <p className="text-[12px] text-neutral600">
                                        {figure.key}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-6">
                              {gemTrac.metadata
                                ?.slice(Math.ceil(gemTrac.metadata.length / 2))
                                .map(figure => (
                                  <div
                                    className="flex items-start"
                                    key={figure.key}
                                  >
                                    {/* Gradient line */}
                                    <div className="w-[2px] h-full bg-gradient-to-b from-[#FFAD05] via-[#168B85] to-[#5995ED] mr-2 rounded-full"></div>

                                    {/* Text content */}
                                    <div className="flex flex-col">
                                      <p className="text-primaryMain text-headingM font-semiBold">
                                        {figure.value}
                                      </p>
                                      <p className="text-[12px] text-neutral600">
                                        {figure.key}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`h-[420px] ${
                      !(index === 2 || index === 3) ? 'w-[480px]' : 'w-[605px] '
                    }${index === 2 || (index === 3 && '')} `}
                  >
                    <Image
                      src={gemTrac.url}
                      alt="images"
                      //   width={580}
                      //   height={420}
                      className={`h-[420px] w-[605px] ${
                        index === 2 || index === 3
                          ? 'rounded-[5px]'
                          : 'rounded-[8px]'
                      } `}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-4 xl:px-[112px] lg:px-[32px]">
        <CommonButton
          onClick={() => {
            router.push('/v3/traceability');
          }}
          variant={'secondary'}
          size={'custom'}
          className="rounded-[8px] w-[97px] h-[40px]"
        >
          &lt;- Back
        </CommonButton>
      </div>
    </div>
  );
};

export default page;

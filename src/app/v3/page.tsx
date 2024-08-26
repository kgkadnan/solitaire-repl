'use client';
import ShimmerButton from '@/components/v3/animated-button';
import HtmlAnimation from '@/components/v3/section-3d/html';
// import AnimationSection from '@/components/v3/animated-text/scroll';
// import IphoneAnimation from '@/components/v3/section-3d/iphone';
import SmoothVideoPlayer from '@/components/v3/smooth-video';
import React, { useState } from 'react';

const Index = () => {
  const [isHtml, setIsHtml] = useState(true);
  const [isManufactureBlurred, setIsManufactureBlurred] = useState(true);
  const [isGlobalSalesBlurred, setIsGlobalSalesBlurred] = useState(true);

  return (
    <div className="relative ">
      {isHtml ? (
        <div className="flex flex-col">
          <div className="overflow-hidden	w-full flex justify-center pt-[100px] bg-[#FCFDFD] ">
            <HtmlAnimation />
          </div>
          <div className="xl:px-[112px] lg:px-[32px]  pb-[100px] flex flex-col bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom items-center">
            <div className="flex flex-col gap-5 text-center w-[840px] py-[40px]">
              <div className="flex flex-col">
                <p className="text-primaryMain text-[62px] font-bold">
                  Manufacturing
                </p>
                <p className="text-primaryMain text-[42px] font-semiBold mt-[-20px]">
                  Transforming Rough Diamonds
                </p>
              </div>
              <p className="text-neutral900 text-[16px]  leading-6">
                By manufacturing where the mines are located, we stimulate the
                regional economy. As a consequence, we're seen as a favorable
                company to work with in the eyes of the government and miners.
                We double down on this value by ensuring that all our goods are
                traceable and sustainably developed.
              </p>
            </div>
          </div>
          <div className="xl:px-[112px] lg:px-[32px]">
            <div className="h-[700px] bg-neutral100 rounded-[25px]">
              Traceability Carousel
            </div>
          </div>
          <div className="xl:px-[112px] lg:px-[32px]  pb-[100px] flex flex-col bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom items-center">
            <div className="flex flex-col gap-5 text-center w-[840px] py-[40px]">
              <div className="flex flex-col">
                <p className="text-primaryMain text-[62px] font-bold">
                  Global{' '}
                </p>
                <p className="text-primaryMain text-[42px] font-semiBold mt-[-20px]">
                  Manufacturing Units & Sales Offices{' '}
                </p>
              </div>
              <p className="text-neutral900 text-[16px]  leading-6">
                With sales offices in nearly every continent, we're ready to
                serve our clients wherever they are. We stay client-centric by
                accommodating to your needs, whether it's about terms, pricing,
                shipping, or QC. So don't be shy, give us a call or come meet us
                in-person!
              </p>
            </div>
          </div>
          <div className="bg-[#F2F4F7] flex items-center">
            <SmoothVideoPlayer />
          </div>
        </div>
      ) : (
        <div>
          <div className="relative">
            {/* Content with Blur Effect */}
            <div className="h-[100vh] xl:px-[112px] lg:px-[32px] pt-[160px] pb-[100px] flex flex-col ">
              <div
                className={` transition-all duration-300 ease-in-out ${
                  isManufactureBlurred ? 'filter blur-sm' : 'filter-none'
                } absolute inset-0`}
              >
                <div className="flex items-center justify-center flex-col h-full bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
                  <p>This content is initially blurred.</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus imperdiet, nulla nec auctor.
                  </p>
                  <p>This content is initially blurred.</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus imperdiet, nulla nec auctor.
                  </p>
                  <p>This content is initially blurred.</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus imperdiet, nulla nec auctor.
                  </p>
                  {/* More content here */}
                </div>
              </div>
              {/* Overlay with CTA */}
              {isManufactureBlurred && (
                <div className="relative z-10 flex justify-center items-center flex-col text-primaryMain gap-10">
                  <div className="flex flex-col gap-5 text-center w-[780px]">
                    <div className="flex flex-col">
                      <p className="text-primaryMain text-[62px] font-bold">
                        Manufacturing
                      </p>
                      <p className="text-primaryMain text-[42px] font-semiBold mt-[-20px]">
                        Transforming Rough Diamonds
                      </p>
                    </div>
                    <p className="text-primaryPressed text-[24px] font-semiBold leading-7">
                      By manufacturing where the mines are located, we stimulate
                      the regional economy. As a consequence, we're seen as a
                      favorable company to work with in the eyes of the
                      government and miners. We double down on this value by
                      ensuring that all our goods are traceable and sustainably
                      developed.
                    </p>
                  </div>

                  <ShimmerButton
                    className="!rounded-[8px] w-[120px] h-[44px]"
                    onClick={() =>
                      setIsManufactureBlurred(!isManufactureBlurred)
                    }
                  >
                    Explore
                  </ShimmerButton>
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="h-[100vh] xl:px-[112px] lg:px-[32px] pt-[160px] pb-[100px] flex flex-col ">
              <div
                className={` transition-all duration-300 ease-in-out ${
                  isGlobalSalesBlurred ? 'filter blur-sm' : 'filter-none'
                } absolute inset-0`}
              >
                <div className="flex items-center justify-center flex-col h-full bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
                  <p>This content is initially blurred.</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus imperdiet, nulla nec auctor.
                  </p>
                  <p>This content is initially blurred.</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus imperdiet, nulla nec auctor.
                  </p>
                  <p>This content is initially blurred.</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus imperdiet, nulla nec auctor.
                  </p>
                  {/* More content here */}
                </div>
              </div>
              {/* Overlay with CTA */}
              {isGlobalSalesBlurred && (
                <div className="relative z-10 flex justify-center items-center flex-col text-primaryMain gap-10">
                  <div className="flex flex-col gap-5 text-center w-[780px]">
                    <div className="flex flex-col">
                      <p className="text-primaryMain text-[62px] font-bold">
                        Global
                      </p>
                      <p className="text-primaryMain text-[42px] font-semiBold mt-[-20px]">
                        Manufacturing Units & Sales Offices
                      </p>
                    </div>
                    <p className="text-primaryPressed text-[24px] font-semiBold leading-7">
                      With sales offices in nearly every continent, we're ready
                      to serve our clients wherever they are. We stay
                      client-centric by accommodating to your needs, whether
                      it's about terms, pricing, shipping, or QC. So don't be
                      shy, give us a call or come meet us in-person!
                    </p>
                  </div>

                  <ShimmerButton
                    className="!rounded-[8px] w-[120px] h-[44px]"
                    onClick={() =>
                      setIsGlobalSalesBlurred(!isGlobalSalesBlurred)
                    }
                  >
                    Explore
                  </ShimmerButton>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <div className="fixed bottom-2 left-2 right-0 ">
        <button
          onClick={() => setIsHtml(!isHtml)}
          className=" rounded text-neutral600 text-[12px]"
        >
          Switch to {isHtml ? '3D' : 'HTML'} version
        </button>
      </div>
    </div>
  );
};

export default Index;

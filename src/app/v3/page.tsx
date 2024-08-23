'use client';
import AnimationSection from '@/components/v3/animated-text/scroll';
import SuperfastWireless from '@/components/v3/section-3d';
import SmoothVideoPlayer from '@/components/v3/smooth-video';
import React, { useState } from 'react';

const Index = () => {
  const [isHtml, setIsHtml] = useState(false);
  const [isManufactureBlurred, setIsManufactureBlurred] = useState(true);

  return (
    <div className="relative ">
      {isHtml ? (
        <div className="flex flex-col gap-5">
          <div className="xl:px-[112px] lg:px-[32px] pt-[160px] pb-[100px] flex flex-col bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
            <div className="text-neutral400 text-[118px]">
              <AnimationSection>01 </AnimationSection>
            </div>
            <div className="text-neutral900 flex justify-between">
              <div className="text-headingXL font-bold max-w-[700px]">
                <AnimationSection animationDelay={0.5}>
                  Manufacturing Transforming Rough Diamonds
                </AnimationSection>
              </div>
              <div className="text-[16px] w-[500px] mt-5">
                <AnimationSection animationDelay={0.5}>
                  By manufacturing where the mines are located, we stimulate the
                  regional economy. As a consequence, we're seen as a favorable
                  company to work with in the eyes of the government and miners.
                  We double down on this value by ensuring that all our goods
                  are traceable and sustainably developed.
                </AnimationSection>
              </div>
            </div>
          </div>
          <div className="xl:px-[112px] lg:px-[32px]">
            <div className="h-[700px] bg-neutral100 rounded-[25px]">
              Traceability Carousel
            </div>
          </div>
          <div className="xl:px-[112px] lg:px-[32px] pt-[80px] pb-[100px] flex flex-col bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
            <div className="text-neutral400 text-[118px] text-right">02</div>
            <div className="text-neutral900 flex justify-between">
              <div className="text-headingXL font-bold max-w-[700px]">
                Global Manufacturing Units & Sales Offices
              </div>
              <div className="text-[16px] w-[500px] mt-5">
                With sales offices in nearly every continent, we're ready to
                serve our clients wherever they are. We stay client-centric by
                accommodating to your needs, whether it's about terms, pricing,
                shipping, or QC. So don't be shy, give us a call or come meet us
                in-person!
              </div>
            </div>
          </div>
          <div className="bg-[#F2F4F7] flex items-center">
            <SmoothVideoPlayer />
          </div>
          <div className="xl:px-[112px] lg:px-[32px] pt-[80px] pb-[100px] flex flex-col bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
            <div className="text-neutral400 text-[118px] text-left">03</div>
            <div className="text-neutral900 flex justify-between">
              <div className="text-headingXL font-bold max-w-[700px]">
                {' '}
                E-commerce platform
              </div>
              <div className="text-[16px] w-[500px] mt-5">
                To empower our physical sales offices, we've streamlined
                internal policies to provide clients across the world with a
                unified experience. This means we're able to serve smaller
                clients with similar levels of care through promotions such as
                volume discount, bid to buy, and new arrivals. To learn more,
                make a guest account and we'll reach out to you shortly!
              </div>
            </div>
          </div>
          <div className="overflow-auto	w-full flex justify-center">
            <SuperfastWireless />
          </div>
        </div>
      ) : (
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
                    favorable company to work with in the eyes of the government
                    and miners. We double down on this value by ensuring that
                    all our goods are traceable and sustainably developed.
                  </p>
                </div>

                <button
                  className="cta-button px-6 py-3 bg-primaryMain text-white rounded shadow-lg  transition"
                  onClick={() => setIsManufactureBlurred(!isManufactureBlurred)}
                >
                  {isManufactureBlurred && 'Explore'}
                </button>
              </div>
            )}
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

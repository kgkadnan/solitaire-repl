import AnimationSection from '@/components/v3/animated-text/scroll';
import SmoothVideoPlayer from '@/components/v3/smooth-video';
import React from 'react';

const index = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="xl:px-[112px] lg:px-[32px] pt-[160px] pb-[100px] flex flex-col   bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
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
              company to work with in the eyes of the government and miners. We
              double down on this value by ensuring that all our goods are
              traceable and sustainably developed.
            </AnimationSection>
          </div>
        </div>
      </div>
      <div className="xl:px-[112px] lg:px-[32px]">
        <div className="h-[700px]  bg-neutral100 rounded-[25px]">Carousel</div>
      </div>
      <div className="xl:px-[112px] lg:px-[32px] pt-[80px] pb-[100px] flex flex-col   bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
        <div className="text-neutral400 text-[118px] text-right">
          <AnimationSection>02</AnimationSection>
        </div>
        <div className="text-neutral900 flex justify-between">
          <div className="text-headingXL font-bold max-w-[700px]">
            <AnimationSection animationDelay={0.5}>
              Global Manufacturing Units & Sales Offices
            </AnimationSection>
          </div>
          <div className="text-[16px] w-[500px] mt-5">
            <AnimationSection animationDelay={0.5}>
              With sales offices in nearly every continent, we're ready to serve
              our clients wherever they are. We stay client-centric by
              accommodating to your needs, whether it's about terms, pricing,
              shipping, or QC. So don't be shy, give us a call or come meet us
              in-person!
            </AnimationSection>
          </div>
        </div>
      </div>
      <div className="bg-[#F2F4F7] flex items-center">
        <SmoothVideoPlayer />
        {/* <CustomVideoPlayer /> */}
      </div>

      <div className="xl:px-[112px] lg:px-[32px] pt-[80px] pb-[100px] flex flex-col   bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
        <div className="text-neutral400 text-[118px] text-left">
          <AnimationSection>03</AnimationSection>
        </div>
        <div className="text-neutral900 flex justify-between">
          <div className="text-headingXL font-bold max-w-[700px]">
            <AnimationSection animationDelay={0.5}>
              {' '}
              E-commerce platform
            </AnimationSection>
          </div>
          <div className="text-[16px] w-[500px] mt-5">
            <AnimationSection animationDelay={0.5}>
              To empower our physical sales offices, we've streamlined internal
              policies to provide clients across the world with a unified
              experience. This means we're able to serve smaller clients with
              similar levels of care through promotions such as volume discount,
              bid to buy, and new arrivals. To learn more, make a guest account
              and we'll reach out to you shortly!
            </AnimationSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

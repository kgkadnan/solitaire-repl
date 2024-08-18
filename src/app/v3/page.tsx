import SmoothVideoPlayer from '@/components/v3/smooth-video';
import CustomVideoPlayer from '@/components/v3/video-player';
import React from 'react';

const index = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="px-[112px] pt-[160px] pb-[100px] flex flex-col   bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
        <p className="text-neutral400 text-[118px]">01</p>
        <div className="text-neutral900 flex justify-between">
          <p className="text-headingXL font-bold max-w-[700px]">
            Manufacturing Transforming Rough Diamonds
          </p>
          <p className="text-[16px] w-[500px] mt-5">
            By manufacturing where the mines are located, we stimulate the
            regional economy. As a consequence, we're seen as a favorable
            company to work with in the eyes of the government and miners. We
            double down on this value by ensuring that all our goods are
            traceable and sustainably developed.
          </p>
        </div>
      </div>
      <div className="px-[112px]">
        <div className="h-[700px]  bg-neutral100 rounded-[25px]">Carousel</div>
      </div>
      <div className="px-[112px] pt-[80px] pb-[100px] flex flex-col   bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
        <p className="text-neutral400 text-[118px] text-right">02</p>
        <div className="text-neutral900 flex justify-between">
          <p className="text-headingXL font-bold max-w-[700px]">
            Global Manufacturing Units & Sales Offices
          </p>
          <p className="text-[16px] w-[500px] mt-5">
            With sales offices in nearly every continent, we're ready to serve
            our clients wherever they are. We stay client-centric by
            accommodating to your needs, whether it's about terms, pricing,
            shipping, or QC. So don't be shy, give us a call or come meet us
            in-person!
          </p>
        </div>
      </div>
      <div className="bg-[#F2F4F7] flex items-center">
        <SmoothVideoPlayer />
        {/* <CustomVideoPlayer /> */}
      </div>
      <div className="bg-[#F2F4F7] flex items-center ">
        {/* <SmoothVideoPlayer/> */}
        <CustomVideoPlayer />
      </div>
      <div className="px-[112px] pt-[80px] pb-[100px] flex flex-col   bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom">
        <p className="text-neutral400 text-[118px]">03</p>
        <div className="text-neutral900 flex justify-between">
          <p className="text-headingXL font-bold max-w-[700px]">
            E-commerce platform{' '}
          </p>
          <p className="text-[16px] w-[500px] mt-5">
            To empower our physical sales offices, we've streamlined internal
            policies to provide clients across the world with a unified
            experience. This means we're able to serve smaller clients with
            similar levels of care through promotions such as volume discount,
            bid to buy, and new arrivals. To learn more, make a guest account
            and we'll reach out to you shortly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;

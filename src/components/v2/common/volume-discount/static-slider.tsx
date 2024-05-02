import { VOLUME_DISCOUNT_LIMIT } from '@/constants/business-logic';
import React from 'react';

const StaticSlider = ({ filledRange }: any) => {
  return (
    <div>
      {/* Slider Track */}
      <div className="bg-[#F9FAFB] rounded-[18px] h-[35px] flex px-2 items-center gap-1 relative">
        <span className="text-sRegular text-neutral900">$0K</span>
        <input
          type="range"
          min={0}
          max={VOLUME_DISCOUNT_LIMIT}
          value={filledRange}
          className="slider appearance-none h-2 w-full rounded-full relative"
          readOnly
          style={{
            background: `linear-gradient(to right, #5995ED 0%, #FFAD05 ${
              filledRange / 3000
            }%, #E4E7EC ${filledRange / 3000}%, #E4E7EC 100%)`
          }}
        />
        <span className="text-sRegular text-neutral900">$300K</span>
        {/* Pinpoint circle at end of filled range */}
        <div
          className="absolute bottom-9 text-center w-16 mx-auto left-0 right-0"
          style={{ left: `calc(${100}% - 110px)` }}
        >
          <div>
            <p>${Math.floor((VOLUME_DISCOUNT_LIMIT - filledRange) / 1000)}K</p>
            <div className="w-8 h-8 bg-[#FFAD05]  mx-auto transform rotate-45 rounded-t-[16px] rounded-bl-[16px]"></div>
          </div>
        </div>
        <div
          className="absolute top-9 text-center"
          style={{
            left: `calc(${(filledRange / VOLUME_DISCOUNT_LIMIT) * 100}% - ${
              (filledRange / 50000) * 6 - 10
            }%)`
          }}
        >
          <div>
            <div className="w-8 h-8 bg-[#5995ED] transform rotate-45 rounded-b-[16px]  rounded-tr-[16px]"></div>
            <p>${Math.floor(filledRange / 1000)}K</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticSlider;

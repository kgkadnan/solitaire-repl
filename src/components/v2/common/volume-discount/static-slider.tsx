import { VOLUME_DISCOUNT_LIMIT } from '@/constants/business-logic';
import React from 'react';
import Tooltip from '../tooltip';

const StaticSlider = ({ totalSpent }: any) => {
  let filledRange =
    totalSpent < VOLUME_DISCOUNT_LIMIT ? totalSpent : VOLUME_DISCOUNT_LIMIT;
  return (
    <div className="pt-2">
      {/* Slider Track */}

      <div
        className={`bg-[#F9FAFB] rounded-[18px] h-[35px] flex px-2 items-center gap-1 relative ${
          totalSpent >= VOLUME_DISCOUNT_LIMIT && 'mb-[60px]'
        }`}
      >
        <div className="absolute top-[17px] left-[34px] transform -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-[#5995ED] rounded-full"></div>

        <span className="text-sRegular text-neutral900">$0K</span>
        <input
          type="range"
          min={0}
          max={VOLUME_DISCOUNT_LIMIT}
          value={filledRange}
          className="slider appearance-none h-1 w-full rounded-full relative customStaticSlider"
          readOnly
          style={{
            background: `linear-gradient(to right, #5995ED 0%,#168B85, #FFAD05 ${
              filledRange / 3000
            }%, #E4E7EC ${filledRange / 3000}%, #E4E7EC 100%)`
          }}
        />
        <style jsx>{`
          input[type='range']::-webkit-slider-thumb {
            display: none;
          }

          input[type='range']::-moz-range-thumb {
            display: none;
          }
        `}</style>
        <span className="text-sRegular text-neutral900">$300K</span>
        <div
          className="absolute top-[17px]  transform -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-[#FFAD05] rounded-full"
          style={{
            left: `calc(${(filledRange / VOLUME_DISCOUNT_LIMIT) * 100}% - ${
              (filledRange / 50000) * 6 -
              (filledRange > VOLUME_DISCOUNT_LIMIT / 2 ? 13 : 11)
            }%)`
          }}
        ></div>

        {/* Pinpoint circle at end of filled range */}
        {filledRange < VOLUME_DISCOUNT_LIMIT ? (
          <>
            <div
              className="absolute bottom-9 text-center w-16 mx-auto left-0 right-0"
              style={{ left: `calc(${100}% - 110px)` }}
            >
              <Tooltip
                tooltipTrigger={
                  <div className="text-center">
                    <p className="text-sRegular font-semiBold text-[#FFAD05]">
                      $
                      {((VOLUME_DISCOUNT_LIMIT - filledRange) / 1000).toFixed(
                        2
                      )}
                      K
                    </p>
                    <div className="w-8 h-8 bg-[#FFAD05]  mx-auto transform rotate-45 rounded-t-[16px] rounded-bl-[16px]"></div>
                  </div>
                }
                tooltipContent={`Need to Spend $${Math.floor(
                  (VOLUME_DISCOUNT_LIMIT - filledRange) / 1000
                )}K`}
                tooltipContentStyles={'z-[1000]'}
              />
            </div>

            <div
              className="absolute top-9 text-center"
              style={{
                left: `calc(${(filledRange / VOLUME_DISCOUNT_LIMIT) * 100}% - ${
                  (filledRange / 50000) * 6 -
                  (filledRange > VOLUME_DISCOUNT_LIMIT / 2 ? 10 : 8)
                }%)`
              }}
            >
              <Tooltip
                tooltipTrigger={
                  <div className="text-center">
                    <div className="w-8 h-8 bg-[#5995ED] transform rotate-45 rounded-b-[16px]  rounded-tr-[16px]"></div>
                    <p className="text-sRegular font-semiBold text-[#5995ED]">
                      ${(filledRange / 1000).toFixed(2)}K
                    </p>
                  </div>
                }
                tooltipContent={`Your Current Spending $${
                  Number.isInteger(filledRange / 1000)
                    ? filledRange / 1000
                    : (filledRange / 1000).toFixed(2)
                }K`}
                tooltipContentStyles={'z-[1000]'}
              />
            </div>
          </>
        ) : (
          <div
            className="absolute top-9 text-center w-16 mx-auto left-0 right-0"
            style={{ left: `calc(${100}% - 110px)` }}
          >
            <div className="text-center">
              <div className="w-8 h-8 bg-[#FFAD05]  mx-auto transform rotate-45 rounded-b-[16px]  rounded-tr-[16px]"></div>
              <div className="flex  left-[-110px] absolute">
                {' '}
                <span className="text-[#98A2B3] text-[10px] font-medium pt-[2px]">
                  {'Your Current Spending >='}
                </span>
                <p className="text-sRegular font-semiBold text-[#FFAD05]">
                  $300K
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaticSlider;

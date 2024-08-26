import { Skeleton } from '@mui/material';
import React from 'react';

const BookAppointmentSkeleton = () => {
  return (
    <div>
      {' '}
      <div className="flex justify-center mt-[16px]">
        <div className="rounded-[4px] w-[571px]">
          {/* kam and location  */}
          <div className="flex bg-neutral50 py-[8px] px-[16px] rounded-[4px] gap-4">
            {/* Contact & Mode */}
            <div className="flex flex-col gap-1 w-[250px] ">
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'var(--neutral-200)' }}
                height={'16px'}
                width={'78px'}
                animation="wave"
                className="rounded-[4px]"
              />
              <div className="flex items-center bg-neutral0 h-[72px] gap-3 border-solid border-[1px] p-[16px] border-neutral200 rounded-[4px] shadow-sm">
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'40px'}
                  width={'40px'}
                  animation="wave"
                  className="rounded-[50%]"
                />
                <div className="flex flex-col gap-1 text-sRegular font-normal">
                  <Skeleton
                    variant="rectangular"
                    sx={{ bgcolor: 'var(--neutral-200)' }}
                    height={'16px'}
                    width={'106px'}
                    animation="wave"
                    className="rounded-[4px]"
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{ bgcolor: 'var(--neutral-200)' }}
                    height={'16px'}
                    width={'44px'}
                    animation="wave"
                    className="rounded-[4px]"
                  />
                </div>
              </div>
            </div>
            {/* Location */}
            <div className="flex flex-col gap-1 w-[350px] ">
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'var(--neutral-200)' }}
                height={'16px'}
                width={'78px'}
                animation="wave"
                className="rounded-[4px]"
              />
              <div className="flex items-center bg-neutral0 h-[72px] gap-3 border-solid border-[1px] p-[16px] border-neutral200 rounded-[4px] shadow-sm">
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'20px'}
                  width={'20px'}
                  animation="wave"
                  className="rounded-[4px]"
                />
                <div className="flex flex-col gap-1">
                  <Skeleton
                    variant="rectangular"
                    sx={{ bgcolor: 'var(--neutral-200)' }}
                    height={'16px'}
                    width={'234px'}
                    animation="wave"
                    className="rounded-[4px]"
                  />
                  <Skeleton
                    variant="rectangular"
                    sx={{ bgcolor: 'var(--neutral-200)' }}
                    height={'16px'}
                    width={'167px'}
                    animation="wave"
                    className="rounded-[4px]"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* select data */}
          <div className=" p-[16px]">
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={'16px'}
              width={'78px'}
              animation="wave"
              className="rounded-[4px]"
            />
            <div className="flex justify-between bg-neutral0 p-[8px] rounded-[4px]">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'79px'}
                  width={'76px'}
                  animation="wave"
                  className="rounded-[4px]"
                />
              ))}
            </div>
          </div>
          {/* Select Time Slot */}
          <div className="px-[16px] flex flex-col gap-1 w-full">
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={'16px'}
              width={'106px'}
              animation="wave"
              className="rounded-[4px]"
            />
            <div className="flex justify-between gap-[49px]">
              {Array.from({ length: 2 }).map((_, keyIndex) => {
                // Simulate keys for Morning and Evening (or any other time slots)
                const keys = ['Morning', 'Evening']; // Adjust as needed
                const currentKey = keys[keyIndex];

                return (
                  <div
                    key={keyIndex}
                    className={`flex flex-col gap-[4px] font-normal ${
                      currentKey === 'Morning' ? 'w-[40%]' : 'w-[60%]'
                    }`}
                  >
                    <Skeleton
                      variant="rectangular"
                      sx={{ bgcolor: 'var(--neutral-200)' }}
                      height={'16px'}
                      width={'44px'}
                      animation="wave"
                      className="rounded-[4px]"
                    />
                    <div className="flex flex-wrap gap-2 bg-neutral0 rounded-[4px] p-[8px]">
                      {Array.from({
                        length: currentKey === 'Morning' ? 6 : 8
                      }).map((_, index) => (
                        <Skeleton
                          key={index}
                          variant="rectangular"
                          sx={{ bgcolor: 'var(--neutral-200)' }}
                          height={'32px'}
                          width={'84px'}
                          animation="wave"
                          className="rounded-[4px]"
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Add Comment */}
          <div className=" flex flex-col gap-1 px-[16px] py-[8px]">
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={'16px'}
              width={'106px'}
              animation="wave"
              className="rounded-[4px]"
            />
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={'40px'}
              width={'520px'}
              animation="wave"
              className="rounded-[4px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentSkeleton;

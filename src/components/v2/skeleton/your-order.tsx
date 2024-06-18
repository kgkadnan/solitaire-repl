import { Skeleton } from '@mui/material';
import React from 'react';

const YourOrderSkeleton = () => {
  return (
    <div className="rounded-[4px]">
      <div className="h-[58px] bg-neutral0 flex  items-center px-2 border-b border-neutral200 rounded-t-[8px]">
        <div className="flex gap-1">
          <Skeleton
            variant="rectangular"
            height={'40px'}
            width={'138px'}
            animation="wave"
            className="rounded-l-[4px]"
          />
          <Skeleton
            variant="rectangular"
            height={'40px'}
            width={'138px'}
            animation="wave"
            className=""
          />
          <Skeleton
            variant="rectangular"
            height={'40px'}
            width={'138px'}
            animation="wave"
            className="rounded-r-[4px]"
          />
        </div>
      </div>
      <div>
        <div className="bg-[#E3E3E3] flex items-center h-[47px] px-2"></div>

        {[1, 2, 3, 4, 5].map(data => {
          return (
            <div
              className={`p-4 flex h-[88px] items-center justify-start bg-neutral0  border-b-[1px] border-neutral200 ${
                data === 5 && 'rounded-b-[8px]'
              } `}
              key={data}
            >
              <div className="flex items-center gap-2 w-[33.3%]">
                <Skeleton
                  variant="rectangular"
                  height={'64px'}
                  width={'64px'}
                  animation="wave"
                  className="rounded-l-[4px]"
                />
                <Skeleton
                  variant="rectangular"
                  height={'19px'}
                  width={'102px'}
                  animation="wave"
                  className=""
                />
              </div>

              <div className="w-[33.3%]">
                <Skeleton
                  variant="rectangular"
                  height={'19px'}
                  width={'204px'}
                  animation="wave"
                  className="rounded-l-[4px]"
                />
              </div>
              <div className="w-[33.3%]">
                <Skeleton
                  variant="rectangular"
                  height={'19px'}
                  width={'102px'}
                  animation="wave"
                  className="rounded-l-[4px]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YourOrderSkeleton;

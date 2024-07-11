import { Skeleton } from '@mui/material';
import React from 'react';

const YourOrderSkeleton = () => {
  return (
    <div className="rounded-[4px]">
      <div className="h-[58px] bg-neutral0 flex justify-between  items-center px-2 border-b border-neutral200 rounded-t-[8px]">
        <div className="flex gap-1">
          <Skeleton
            variant="rectangular"
            height={'40px'}
            sx={{ bgcolor: 'var(--neutral-200)' }}
            width={'138px'}
            animation="wave"
            className="rounded-l-[4px]"
          />
          <Skeleton
            variant="rectangular"
            sx={{ bgcolor: 'var(--neutral-200)' }}
            height={'40px'}
            width={'138px'}
            animation="wave"
            className=""
          />
          <Skeleton
            sx={{ bgcolor: 'var(--neutral-200)' }}
            variant="rectangular"
            height={'40px'}
            width={'138px'}
            animation="wave"
            className="rounded-r-[4px]"
          />
        </div>
        <div className="flex gap-1">
          <Skeleton
            variant="rectangular"
            height={'40px'}
            sx={{ bgcolor: 'var(--neutral-200)' }}
            width={'375px'}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            sx={{ bgcolor: 'var(--neutral-200)' }}
            height={'40px'}
            width={'250px'}
            animation="wave"
            className=""
          />
        </div>
      </div>
      <div>
        <div className="bg-neutral50 flex items-center border-b-[1px] border-solid border-neutral200  justify-between h-[47px] ">
          {[1, 2, 3].map(data => {
            return (
              <div
                className={`py-4 flex   items-center  w-[40%] ${
                  data === 1 ? 'pl-4' : data === 3 ? 'ml-[-27px] ' : ''
                }`}
                key={data}
              >
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'19px'}
                  width={'100px'}
                  animation="wave"
                  className="rounded-[4px]"
                />
              </div>
            );
          })}
        </div>

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
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'64px'}
                  width={'64px'}
                  animation="wave"
                  className="rounded-l-[4px]"
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'19px'}
                  width={'102px'}
                  animation="wave"
                  className=""
                />
              </div>

              <div className="w-[33.3%]">
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'19px'}
                  width={'204px'}
                  animation="wave"
                  className="rounded-l-[4px]"
                />
              </div>
              <div className="w-[33.3%]">
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
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

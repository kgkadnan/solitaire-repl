import { Skeleton } from '@mui/material';
import React from 'react';

const NotificationSkeleton = () => {
  return (
    <div className="bg-neutral25 w-[447px] border-[1px] border-solid border-primaryBorder  shadow-popupsShadow  rounded-[8px] relative top-[5px] right-[13%]">
      <div className="border-solid border-b-[1px] border-neutral200">
        <h1 className="px-[24px] py-[16px]">
          <Skeleton
            variant="rectangular"
            height={'26px'}
            width={'122px'}
            animation="wave"
            className="w-full rounded-[4px]"
            sx={{ bgcolor: 'var(--neutral-200)' }}
          />
        </h1>
      </div>

      <div className="max-h-[70vh] overflow-y-scroll">
        {new Array(8).fill(null).map((_, index) => (
          <div
            key={index}
            className={`flex p-[16px] w-[100%] gap-[15px] cursor-pointer border-b-[1px] border-neutral200 hover:bg-neutral50 `}
          >
            <div
              className={` w-[40px] h-[40px] flex items-center justify-center rounded-[4px] bg-neutral0 `}
            >
              <Skeleton
                variant="rectangular"
                height={'40px'}
                width={'40px'}
                animation="wave"
                className="w-full rounded-[4px]"
                sx={{ bgcolor: 'var(--neutral-200)' }}
              />
            </div>
            <div className="flex flex-col w-[85%]">
              <div className=" bg-neutral200  ">
                <Skeleton
                  variant="rectangular"
                  height={'16px'}
                  width={'360px'}
                  animation="wave"
                  className="w-full rounded-[4px]"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                />
              </div>
              <span className="mt-[10px]">
                <Skeleton
                  variant="rectangular"
                  height={'11px'}
                  width={'41px'}
                  animation="wave"
                  className="w-full rounded-[4px]"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between px-[16px] pb-[20px] pt-[20px] border-t-[1px] border-neutral200">
        <div className="flex items-center gap-2">
          <Skeleton
            variant="rectangular"
            height={'20px'}
            width={'20px'}
            animation="wave"
            className="w-full rounded-[4px]"
            sx={{ bgcolor: 'var(--neutral-200)' }}
          />
          <Skeleton
            variant="rectangular"
            height={'16px'}
            width={'60px'}
            animation="wave"
            className="w-full rounded-[4px]"
            sx={{ bgcolor: 'var(--neutral-200)' }}
          />
        </div>
        <div className="flex items-center gap-2 ">
          <Skeleton
            variant="rectangular"
            height={'20px'}
            width={'20px'}
            animation="wave"
            className="w-full rounded-[4px]"
            sx={{ bgcolor: 'var(--neutral-200)' }}
          />
          <Skeleton
            variant="rectangular"
            height={'16px'}
            width={'60px'}
            animation="wave"
            className="w-full rounded-[4px]"
            sx={{ bgcolor: 'var(--neutral-200)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSkeleton;

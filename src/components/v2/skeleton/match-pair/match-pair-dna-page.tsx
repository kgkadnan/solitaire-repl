import React from 'react';
import { Skeleton } from '@mui/material';
const MatchPairDnaSkeleton = () => {
  return (
    <div>
      <div className=" py-[16px]">
        <div className={`flex justify-between`}>
          <div className={`mr-5 flex gap-[2px]`}>
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={'41px'}
              width={'132px'}
              animation="wave"
              className="rounded-l-[8px]"
            />
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={'41px'}
              width={'132px'}
              animation="wave"
              className=""
            />
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={'41px'}
              width={'132px'}
              animation="wave"
              className=""
            />
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={'41px'}
              width={'132px'}
              animation="wave"
              className="rounded-r-[8px]"
            />
          </div>
          <div className="flex  justify-center  mr-[10px] items-center">
            <div className="flex gap-3 items-center">
              <div>
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'40px'}
                  width={'148px'}
                  animation="wave"
                  className="rounded-[4px]"
                />
              </div>

              <div className="flex gap-1">
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'40px'}
                  width={'40px'}
                  animation="wave"
                  className="rounded-[4px]"
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'40px'}
                  width={'40px'}
                  animation="wave"
                  className="rounded-[4px]"
                />
              </div>
              <div className="border-r-[1px] h-[40px] border-neutral200"></div>

              <div className="flex gap-1">
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'40px'}
                  width={'40px'}
                  animation="wave"
                  className="rounded-[4px]"
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'40px'}
                  width={'40px'}
                  animation="wave"
                  className="rounded-[4px]"
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'40px'}
                  width={'40px'}
                  animation="wave"
                  className="rounded-[4px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-neutral200 w-[1120px] bg-neutral0 border-solid border-[0.5px]">
        <div className="">
          <div className="h-[415px] flex border-solid border-b-[0.5px] border-neutral200">
            <div className="h-full px-4 flex flex-col justify-center bg-neutral50 w-[200px] border-r-[0.5px] border-neutral200 border-solid">
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'var(--neutral-200)' }}
                height={'20px'}
                width={'60px'}
                animation="wave"
                className=""
              />
            </div>
            <div className="h-full flex flex-col items-center gap-6 p-2 border-r-[0.5px] border-neutral200 border-solid  w-[460px] ">
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'var(--neutral-200)' }}
                height={'291px'}
                width={'370px'}
                animation="wave"
                className=""
              />

              <Skeleton
                width={88}
                variant="rectangular"
                height={20}
                animation="wave"
                sx={{ bgcolor: 'var(--neutral-200)' }}
              />
            </div>
            <div className="h-full flex flex-col items-center gap-6 pt-2  border-r-[0.5px] border-neutral200 border-solid w-[460px]">
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'var(--neutral-200)' }}
                height={'291px'}
                width={'370px'}
                animation="wave"
                className=""
              />
              <Skeleton
                width={88}
                variant="rectangular"
                height={20}
                animation="wave"
                sx={{ bgcolor: 'var(--neutral-200)' }}
              />
            </div>
          </div>
          <div className="h-[36px] flex border-solid border-b-[0.5px] border-neutral200">
            <div className="h-full px-4 flex flex-col justify-center bg-neutral50 w-[200px] border-r-[0.5px] border-neutral200 border-solid">
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'var(--neutral-200)' }}
                height={'20px'}
                width={'60px'}
                animation="wave"
                className=""
              />
            </div>
            <div className="h-full flex justify-start px-4 items-center border-r-[0.5px] border-neutral200 border-solid  w-[460px] ">
              <div>
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'24px'}
                  width={'73px'}
                  animation="wave"
                  className=""
                />
              </div>
            </div>
            <div className="h-full flex justify-start px-4 items-center   border-r-[0.5px] border-neutral200 border-solid w-[460px]">
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'var(--neutral-200)' }}
                height={'24px'}
                width={'73px'}
                animation="wave"
                className=""
              />
            </div>
          </div>
          <div className="h-[36px] flex">
            <div className="h-full px-4 flex flex-col justify-center bg-neutral50 w-[200px] border-r-[0.5px] border-neutral200 border-solid">
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'var(--neutral-200)' }}
                height={'20px'}
                width={'60px'}
                animation="wave"
                className=""
              />
            </div>
            <div className="h-full flex justify-start px-4 items-center border-r-[0.5px] border-neutral200 border-solid  w-[460px] ">
              <div>
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'24px'}
                  width={'73px'}
                  animation="wave"
                  className=""
                />
              </div>
            </div>
            <div className="h-full flex justify-start px-4 items-center   border-r-[0.5px] border-neutral200 border-solid w-[460px]">
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'var(--neutral-200)' }}
                height={'24px'}
                width={'73px'}
                animation="wave"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPairDnaSkeleton;

import { traceabilityGemTrac } from '@/constants/v3/traceability';
import { Skeleton } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const GemTracSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        {/* Heading */}
        <Skeleton
          variant="rectangular"
          sx={{ bgcolor: 'var(--neutral-200)' }}
          height="21px"
          width="250px"
          animation="wave"
          className="rounded-[4px] "
        />
        <div className="flex items-ceter gap-[60px]">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="flex items-start">
              {/* Gradient line */}
              <div className="w-[2px] h-full bg-neutral200 mr-2 rounded-full"></div>

              {/* Text content */}
              <div className="flex flex-col gap-4">
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'25px'}
                  width={'118px'}
                  animation="wave"
                  className="rounded-[4px]"
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={'13px'}
                  width={'63px'}
                  animation="wave"
                  className="rounded-[4px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 h-[54px] border-b-[1px] pl-2  border-neutral200">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{ bgcolor: 'var(--neutral-200)' }}
            height="13px"
            width="82px"
            animation="wave"
            className="rounded-[4px] mt-3"
          />
        ))}
      </div>
      <div
        className="border-b-[1px] border-solid border-neutral200 bg-neutral25"
        style={{ boxShadow: '0px 1px 2px 0px #1018281F' }}
      >
        <div className="flex flex-col items-center pt-[10px]">
          <div className="w-full flex flex-col gap-[8px]">
            {traceabilityGemTrac.map((gemTrac, index) => {
              return (
                <div
                  id={gemTrac.id}
                  className="flex  pb-[15px] items-start justify-between min-h-[420px]"
                  key={gemTrac.id}
                >
                  <div className="flex flex-col w-[528px]">
                    <div className="flex gap-[10px] items-center">
                      <Image
                        src={gemTrac.icon}
                        alt="trace steps"
                        className="xl:w-[40px] xl:h-[40px] lg:w-[32px] lg:h-[32px] flex items-center"
                      />
                      <p className="flex items-center">
                        <Skeleton
                          variant="rectangular"
                          sx={{ bgcolor: 'var(--neutral-200)' }}
                          height={'35px'}
                          width={'118px'}
                          animation="wave"
                          className="rounded-[4px]"
                        />
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {index !== traceabilityGemTrac.length - 1 && (
                        <div className="xl:pl-[20px] lg:pl-[15px]">
                          <div
                            className={`border-l border-dotted border-gray-400 ${
                              index === 0
                                ? 'h-[175%]'
                                : index === 2
                                ? 'h-[124%]'
                                : index === 4
                                ? 'h-[120%]'
                                : 'h-[120.5%]'
                            }  xl:mt-[-12px] lg:mt-[-10px]`}
                          ></div>
                        </div>
                      )}
                      <div
                        className={`flex flex-col pt-2 gap-2 ${
                          index !== traceabilityGemTrac.length - 1
                            ? 'pl-[18px]'
                            : 'pl-[43px]'
                        } ${
                          index === traceabilityGemTrac.length - 1
                            ? 'lg:w-[474px]'
                            : 'lg:w-[450px]'
                        }   xl:w-full w-full`}
                      >
                        <div className="flex flex-col gap-2 pt-3">
                          <p className="">
                            <Skeleton
                              variant="rectangular"
                              sx={{ bgcolor: 'var(--neutral-200)' }}
                              height={'20px'}
                              width={'133px'}
                              animation="wave"
                              className="rounded-[4px]"
                            />
                          </p>
                          <div className="flex flex-col gap-1">
                            <Skeleton
                              variant="rectangular"
                              sx={{ bgcolor: 'var(--neutral-200)' }}
                              height={'20px'}
                              width={'528px'}
                              animation="wave"
                              className="rounded-[4px]"
                            />
                            <Skeleton
                              variant="rectangular"
                              sx={{ bgcolor: 'var(--neutral-200)' }}
                              height={'20px'}
                              width={'454px'}
                              animation="wave"
                              className="rounded-[4px]"
                            />
                            <Skeleton
                              variant="rectangular"
                              sx={{ bgcolor: 'var(--neutral-200)' }}
                              height={'20px'}
                              width={'399px'}
                              animation="wave"
                              className="rounded-[4px]"
                            />
                          </div>
                        </div>
                        {gemTrac.chosenBy && gemTrac.details && (
                          <div className="flex flex-col pt-3 gap-2">
                            <p className="">
                              <Skeleton
                                variant="rectangular"
                                sx={{ bgcolor: 'var(--neutral-200)' }}
                                height={'20px'}
                                width={'133px'}
                                animation="wave"
                                className="rounded-[4px]"
                              />
                            </p>
                            <div className="flex flex-col gap-1">
                              <Skeleton
                                variant="rectangular"
                                sx={{ bgcolor: 'var(--neutral-200)' }}
                                height={'20px'}
                                width={'528px'}
                                animation="wave"
                                className="rounded-[4px]"
                              />
                              <Skeleton
                                variant="rectangular"
                                sx={{ bgcolor: 'var(--neutral-200)' }}
                                height={'20px'}
                                width={'454px'}
                                animation="wave"
                                className="rounded-[4px]"
                              />
                              <Skeleton
                                variant="rectangular"
                                sx={{ bgcolor: 'var(--neutral-200)' }}
                                height={'20px'}
                                width={'399px'}
                                animation="wave"
                                className="rounded-[4px]"
                              />
                            </div>
                          </div>
                        )}

                        {gemTrac.metadata.length > 0 && (
                          <div className="flex  flex-wrap gap-28 pt-2">
                            {/* Left Column */}
                            <div className="flex flex-col gap-6 ">
                              {gemTrac.metadata
                                ?.slice(
                                  0,
                                  Math.ceil(gemTrac.metadata.length / 2)
                                )
                                .map(figure => (
                                  <div
                                    className="flex items-start"
                                    key={figure.key}
                                  >
                                    {/* Gradient line */}
                                    <div className="w-[2px] h-full bg-neutral200 mr-2 rounded-full"></div>

                                    {/* Text content */}
                                    <div className="flex flex-col gap-4">
                                      <Skeleton
                                        variant="rectangular"
                                        sx={{ bgcolor: 'var(--neutral-200)' }}
                                        height={'25px'}
                                        width={'118px'}
                                        animation="wave"
                                        className="rounded-[4px]"
                                      />
                                      <Skeleton
                                        variant="rectangular"
                                        sx={{ bgcolor: 'var(--neutral-200)' }}
                                        height={'13px'}
                                        width={'63px'}
                                        animation="wave"
                                        className="rounded-[4px]"
                                      />
                                    </div>
                                  </div>
                                ))}
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-6">
                              {gemTrac.metadata
                                ?.slice(Math.ceil(gemTrac.metadata.length / 2))
                                .map(figure => (
                                  <div
                                    className="flex items-start"
                                    key={figure.key}
                                  >
                                    {/* Gradient line */}
                                    <div className="w-[2px] h-full bg-neutral200 mr-2 rounded-full"></div>

                                    {/* Text content */}
                                    <div className="flex flex-col gap-4">
                                      <Skeleton
                                        variant="rectangular"
                                        sx={{ bgcolor: 'var(--neutral-200)' }}
                                        height={'25px'}
                                        width={'118px'}
                                        animation="wave"
                                        className="rounded-[4px]"
                                      />
                                      <Skeleton
                                        variant="rectangular"
                                        sx={{ bgcolor: 'var(--neutral-200)' }}
                                        height={'13px'}
                                        width={'63px'}
                                        animation="wave"
                                        className="rounded-[4px]"
                                      />
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`lg:h-[397px] ] xl:h-[420px] lg:w-[580px] xl:w-[605px] ${
                      index === 2 || (index === 3 && '')
                    } `}
                  >
                    <Skeleton
                      variant="rectangular"
                      sx={{ bgcolor: 'var(--neutral-200)' }}
                      width={'550px'}
                      height={'415px'}
                      animation="wave"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GemTracSkeleton;

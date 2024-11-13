import { traceabilityGemTrac } from '@/constants/v3/traceability';
import Image from 'next/image';
import React from 'react';
import GemTracAnchorLink from '../gem-trac-anchor-link';
import { gemTracAnchorLink } from '@/constants/v2/gem-trac';
import { Skeleton } from '@mui/material';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import GemTracSkeleton from '../../skeleton/gemtrac';

const keysToDisplay = [
  {
    key: 'lot_id',
    value: 'Stock No.'
  },
  {
    key: 'shape',
    value: 'Shape'
  },
  {
    key: 'carats',
    value: 'Carat'
  },
  {
    key: 'color',
    value: 'Color'
  },
  {
    key: 'clarity',
    value: 'Clarity'
  },
  {
    key: 'cut',
    value: 'Cut'
  }
];

const GemTracPage = ({
  breadCrumLabel,
  setIsGemTrac,
  setGemTracData,
  gemTracData,
  goBackToListView
}: {
  breadCrumLabel: string;
  setIsGemTrac: React.Dispatch<React.SetStateAction<boolean>>;
  setGemTracData: any;
  gemTracData: any;
  goBackToListView: any;
}) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center bg-neutral0 py-1">
        <Image
          src={backWardArrow}
          alt="backWardArrow"
          onClick={() => {
            setIsGemTrac(false);
            setGemTracData([]);
          }}
          className="cursor-pointer"
        />
        <div className="flex gap-[8px] items-center">
          {Object.keys(gemTracData).length > 0 ? (
            <button
              className="text-neutral600 text-sMedium font-regular cursor-pointer"
              onClick={() => {
                setIsGemTrac(false);
                setGemTracData([]);
                goBackToListView();
              }}
            >
              {breadCrumLabel}
            </button>
          ) : (
            <Skeleton
              width={65}
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={18}
              variant="rectangular"
              animation="wave"
              className="rounded-[4px]"
            />
          )}

          <span className="text-neutral600">/</span>

          {Object.keys(gemTracData).length > 0 ? (
            <p
              onClick={() => {
                setIsGemTrac(false);
                setGemTracData([]);
              }}
              className="text-neutral700 p-[8px] cursor-pointer bg-neutral100 rounded-[4px] text-sMedium font-extrabold"
            >
              ...
            </p>
          ) : (
            <Skeleton
              width={40}
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={34}
              variant="rectangular"
              animation="wave"
              className="rounded-[4px]"
            />
          )}

          <span className="text-neutral600">/</span>

          {Object.keys(gemTracData).length > 0 ? (
            <p className="text-neutral700 p-[8px] bg-neutral100 rounded-[4px] text-sMedium font-medium">
              Diamond Report
            </p>
          ) : (
            <Skeleton
              width={134}
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={34}
              variant="rectangular"
              animation="wave"
              className="rounded-[4px]"
            />
          )}
        </div>
      </div>
      {Object.keys(gemTracData).length > 0 ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-6">
            {/* Heading */}
            <div className="text-neutral900 font-medium">
              Your Natural Diamond Report
            </div>
            <div className="flex items-ceter gap-[60px]">
              {keysToDisplay.map(({ key, value }) => {
                return (
                  <div className="flex items-start">
                    {/* Gradient line */}
                    <div className="w-[2px] h-full bg-gradient-to-b from-[#FFAD05] via-[#168B85] to-[#5995ED] mr-2 rounded-full"></div>

                    {/* Text content */}
                    <div className="flex flex-col gap-4">
                      <p className="text-primaryMain text-headingM font-semiBold">
                        {gemTracData.product[key]}
                      </p>
                      <p className="text-[12px] text-neutral600">{value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className=" pt-[8px] border-[1px]  rounded-t-[8px] border-solid border-neutral200 bg-neutral0 flex flex-col  items-center justify-center">
              <GemTracAnchorLink anchorNavigations={gemTracAnchorLink} />
            </div>

            <div
              className="border-b-[1px] border-solid border-neutral200 bg-neutral25"
              style={{ boxShadow: '0px 1px 2px 0px #1018281F' }}
            >
              <div className="flex flex-col items-center px-[10px] pt-[10px]">
                <div className="w-full flex flex-col gap-[8px]">
                  {gemTracData.traceability.map(
                    (gemTrac: any, index: number) => {
                      return (
                        <div
                          id={gemTrac.id}
                          className="flex  pb-[15px] items-start justify-between min-h-[420px]"
                          key={gemTrac.id}
                        >
                          <div className="flex flex-col w-[528px]">
                            <div className="flex gap-2 items-center">
                              <img
                                src={gemTrac.icon.src}
                                alt="trace steps"
                                className="xl:w-[40px] xl:h-[40px] lg:w-[32px] lg:h-[32px] flex items-center"
                              />
                              <p className="lg:text-[24px] xl:text-[28px] text-primaryMain font-medium flex items-center">
                                {gemTrac.header}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              {index !== traceabilityGemTrac.length - 1 && (
                                <div className="xl:pl-[20px] lg:pl-[15px]">
                                  <div
                                    className={`border-l border-dotted border-gray-400 ${
                                      index === 0
                                        ? 'xl:h-[139%] lg:h-[158%]'
                                        : index === 2
                                        ? 'xl:h-[120%] lg:h-[124%]'
                                        : index === 4
                                        ? 'xl:h-[116%] lg:h-[121%]'
                                        : 'xl:h-[120%] lg:h-[120.5%]'
                                    }  xl:mt-[-12px] lg:mt-[-10px]`}
                                  ></div>
                                </div>
                              )}
                              <div
                                className={`flex flex-col gap-2 ${
                                  index !== traceabilityGemTrac.length - 1
                                    ? 'pl-[18px]'
                                    : 'pl-[43px]'
                                } ${
                                  index === traceabilityGemTrac.length - 1
                                    ? 'lg:w-[474px]'
                                    : 'lg:w-[450px]'
                                }   xl:w-full w-full`}
                              >
                                <div className="flex flex-col gap-2">
                                  <p className="lg:text-[14px] xl:text-[16px] text-primaryMain font-medium">
                                    {gemTrac.title}
                                  </p>
                                  <p className="lg:text-[14px] xl:text-[16px] font-regular text-neutral-900">
                                    {gemTrac.description}
                                  </p>
                                </div>
                                {gemTrac.chosenBy && gemTrac.details && (
                                  <div className="flex flex-col gap-2 pt-4  ">
                                    <div className="flex flex-col">
                                      <p className="xl:text-[14px] lg:text-[12px] text-neutral700 font-regular">
                                        Chosen by
                                      </p>
                                      <p className="xl:text-[16px] lg:text-[14px] text-primaryMain font-medium">
                                        {gemTrac.chosenBy}
                                      </p>
                                    </div>
                                    <p className="xl:text-[16px] lg:text-[14px] text-neutral900 font-medium">
                                      {gemTrac.details}
                                    </p>
                                  </div>
                                )}

                                {gemTrac.metadata.length > 0 && (
                                  <div className="flex  flex-wrap gap-28">
                                    {/* Left Column */}
                                    <div className="flex flex-col gap-6">
                                      {gemTrac.metadata
                                        ?.slice(
                                          0,
                                          Math.ceil(gemTrac.metadata.length / 2)
                                        )
                                        .map((figure: any) => (
                                          <div
                                            className="flex items-start"
                                            key={figure.key}
                                          >
                                            {/* Gradient line */}
                                            <div className="w-[2px] h-full bg-gradient-to-b from-[#FFAD05] via-[#168B85] to-[#5995ED] mr-2 rounded-full"></div>

                                            {/* Text content */}
                                            <div className="flex flex-col">
                                              <p className="text-primaryMain text-headingM font-semiBold">
                                                {figure.value}
                                              </p>
                                              <p className="text-[12px] text-neutral600">
                                                {figure.key}
                                              </p>
                                            </div>
                                          </div>
                                        ))}
                                    </div>

                                    {/* Right Column */}
                                    <div className="flex flex-col gap-6">
                                      {gemTrac.metadata
                                        ?.slice(
                                          Math.ceil(gemTrac.metadata.length / 2)
                                        )
                                        .map((figure: any) => (
                                          <div
                                            className="flex items-start"
                                            key={figure.key}
                                          >
                                            {/* Gradient line */}
                                            <div className="w-[2px] h-full bg-gradient-to-b from-[#FFAD05] via-[#168B85] to-[#5995ED] mr-2 rounded-full"></div>

                                            {/* Text content */}
                                            <div className="flex flex-col">
                                              <p className="text-primaryMain text-headingM font-semiBold">
                                                {figure.value}
                                              </p>
                                              <p className="text-[12px] text-neutral600">
                                                {figure.key}
                                              </p>
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
                            className={`lg:h-[397px] xl:h-[420px] lg:w-[580px] xl:w-[605px] ${
                              index === 2 || (index === 3 && '')
                            } `}
                          >
                            <Image
                              src={gemTrac.url}
                              alt="images"
                              width={397}
                              height={420}
                              className={`lg:h-[397px] xl:h-[420px] object-fill lg:w-[580px] xl:w-[605px] ${
                                index === 2 || index === 3
                                  ? 'rounded-[5px]'
                                  : 'rounded-[8px]'
                              } `}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <GemTracSkeleton />
      )}
    </div>
  );
};

export default GemTracPage;

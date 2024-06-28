import Pill from '@/components/v2/common/search-breadcrum/pill';
import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Arrow from '@public/v2/assets/icons/chevron.svg';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { setStartTime } from '@/features/track-page-event/track-page-event-slice';
import { useAppDispatch } from '@/hooks/hook';

const Breadcrum = ({
  searchParameters,
  activeTab,
  handleCloseSpecificTab
}: {
  searchParameters: any;
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  handleCloseSpecificTab: (_id: number) => void;
  setIsLoading?: any;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <>
      {searchParameters.length > 0 && (
        <div className=" text-neutral600 text-mMedium flex gap-[8px] ">
          <Link
            className={'flex items-center cursor-pointer'}
            href={`${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`}
            onClick={() => {
              dispatch(setStartTime(new Date().toISOString()));
            }}
          >
            Search
          </Link>
          <Image src={Arrow} alt={'search-breadcrum'} />
        </div>
      )}
      {searchParameters.map((result: any, index: number) => {
        return (
          // Object.keys(result).length > 0 && (
          <div key={`breadcrum-${index}`} className="flex items-center">
            <Pill
              isActive={activeTab === index + 1}
              label={
                result.saveSearchName !== ''
                  ? result.saveSearchName
                  : `Result ${index + 1}`
              }
              handlePillClick={() => {
                // setIsLoading(true);
                router.push(
                  `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${index + 1}`
                );
              }}
              handlePillEdit={() => {
                // setIsLoading(true);
                router.push(
                  `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${
                    index + 1
                  }&edit=${SubRoutes.RESULT}`
                );
              }}
              handlePillDelete={() => {
                handleCloseSpecificTab(index + 1);
              }}
            />
          </div>
        );
        // );
      })}
    </>
  );
};

export default Breadcrum;

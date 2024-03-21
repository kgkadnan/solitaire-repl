import Pill from '@/components/v2/common/search-breadcrum/pill';
import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Arrow from '@public/v2/assets/icons/chevron.svg';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Breadcrum = ({
  searchParameters,
  activeTab,
  // setActiveTab,
  handleCloseSpecificTab,
  setIsLoading
}: {
  searchParameters: any;
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  handleCloseSpecificTab: (id: number) => void;
  setIsLoading?: any;
}) => {
  const router = useRouter();

  return (
    <>
      {searchParameters.length > 0 && (
        <div className=" text-neutral600 text-mMedium flex gap-[8px] ">
          <Link
            className={'flex items-center cursor-pointer'}
            href={`${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`}
          >
            Search
          </Link>
          <Image src={Arrow} alt={'search-breadcrum'} />
        </div>
      )}
      {searchParameters.map((result: any, index: number) => {
        return (
          <div key={`breadcrum-${index}`} className="flex items-center">
            <Pill
              isActive={activeTab === index + 1}
              label={
                result.saveSearchName !== ''
                  ? result.saveSearchName
                  : `Result ${index + 1}`
              }
              handlePillClick={() => {
                // setActiveTab(index + 1);
                setIsLoading(true);
                router.push(
                  `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${index + 1}`
                );
              }}
              handlePillEdit={() => {
                setIsLoading(true);
                router.push(
                  `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${
                    index + 1
                  }&edit=${SubRoutes.RESULT}`
                );
              }}
              handlePillDelete={() => {
                // setIsLoading(true)
                handleCloseSpecificTab(index + 1);
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default Breadcrum;

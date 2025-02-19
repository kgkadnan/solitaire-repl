import Pill from '@/components/v2/common/search-breadcrum/pill';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import Arrow from '@public/v2/assets/icons/chevron.svg';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { setStartTime } from '@/features/track-page-event/track-page-event-slice';
import { useAppDispatch } from '@/hooks/hook';
import { Dropdown } from '../dropdown-menu';

import dropdownIcon from '@public/v2/assets/png/data-table/dropdown.png';
const MAX_VISIBLE_PILLS = 4;

const Breadcrum = ({
  searchParameters,
  activeTab,
  handleCloseSpecificTab,
  isMatchingPair,
  setGlobalFilter
}: {
  searchParameters: any[];
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  setGlobalFilter?: Dispatch<SetStateAction<string>>;
  handleCloseSpecificTab: (_id: number) => void;
  setIsLoading?: any;
  isMatchingPair?: boolean;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [visiblePills, setVisiblePills] = useState(
    searchParameters.slice(0, MAX_VISIBLE_PILLS)
  );
  const [dropdownPills, setDropdownPills] = useState(
    searchParameters.slice(MAX_VISIBLE_PILLS)
  );
  useEffect(() => {
    setVisiblePills(searchParameters.slice(0, MAX_VISIBLE_PILLS));
    setDropdownPills(searchParameters.slice(MAX_VISIBLE_PILLS));
  }, [searchParameters]);

  const handleDropdownSelect = (selectedIndex: any) => {
    // Get the selected item from dropdownPills
    const selectedPill = dropdownPills[selectedIndex];

    // Create new visiblePills and dropdownPills arrays
    const newVisiblePills = [...visiblePills];
    const newDropdownPills = [...dropdownPills];

    // Replace the last visible pill (Result 4) with the selected dropdown pill
    newDropdownPills[selectedIndex] = newVisiblePills[MAX_VISIBLE_PILLS - 1];
    newVisiblePills[MAX_VISIBLE_PILLS - 1] = selectedPill;

    // Update the state
    setVisiblePills(newVisiblePills);
    setDropdownPills(newDropdownPills);
  };

  useEffect(() => {
    if (dropdownPills.length > 0 && activeTab > MAX_VISIBLE_PILLS - 1) {
      const index = dropdownPills.findIndex(
        (item: any) =>
          item?.searchId == searchParameters[activeTab - 1]?.searchId
      );
      if (index >= 0) {
        handleDropdownSelect(index);
      }
    }
  }, [searchParameters]);
  return (
    <>
      {searchParameters.length > 0 && (
        <div className=" text-neutral600 text-mMedium flex gap-[8px] ">
          <Link
            className={'flex items-center cursor-pointer'}
            href={`${
              isMatchingPair ? Routes.MATCHING_PAIR : Routes.SEARCH
            }?active-tab=${SubRoutes.NEW_SEARCH}`}
            onClick={() => {
              dispatch(setStartTime(new Date().toISOString()));
            }}
          >
            Search
          </Link>
          <Image src={Arrow} alt={'search-breadcrum'} />
        </div>
      )}
      {visiblePills.map((result: any, index: number) => {
        const activePill =
          searchParameters[activeTab - 1]?.searchId == result.searchId;
        const activeIndex =
          searchParameters.findIndex(x => x.searchId == result.searchId) + 1;
        return (
          // Object.keys(result).length > 0 && (
          <div key={`breadcrum-${index}`} className="flex items-center">
            <Pill
              isActive={activePill}
              label={
                result.saveSearchName !== ''
                  ? result.saveSearchName
                  : result.label
              }
              handlePillClick={() => {
                // setIsLoading(true);
                router.push(
                  `${
                    isMatchingPair ? Routes.MATCHING_PAIR : Routes.SEARCH
                  }?active-tab=${SubRoutes.RESULT}-${activeIndex}`
                );
                setGlobalFilter && setGlobalFilter('');
              }}
              handlePillEdit={() => {
                // setIsLoading(true);
                setGlobalFilter && setGlobalFilter('');
                router.push(
                  `${
                    isMatchingPair ? Routes.MATCHING_PAIR : Routes.SEARCH
                  }?active-tab=${SubRoutes.RESULT}-${activeIndex}&edit=${
                    SubRoutes.RESULT
                  }`
                );
              }}
              handlePillDelete={() => {
                setGlobalFilter && setGlobalFilter('');
                handleCloseSpecificTab(activeIndex - 1);
              }}
            />
          </div>
        );
        // );
      })}
      {dropdownPills.length > 0 && (
        <Dropdown
          dropdownTrigger={
            <button
              className={`rounded-[4px] hover:bg-neutral50 flex items-center gap-1 justify-center w-[100px] h-[37px] text-center`}
            >
              <div className="pb-1"> +{dropdownPills.length} More</div>
              <Image src={dropdownIcon} alt="dropdownIcon" />
            </button>
          }
          dropdownMenu={dropdownPills.map((result: any, index: any) => ({
            label: result.saveSearchName || result.label,
            handler: () => {
              setGlobalFilter && setGlobalFilter('');
              handleDropdownSelect(index);
              router.push(
                `${
                  isMatchingPair ? Routes.MATCHING_PAIR : Routes.SEARCH
                }?active-tab=${SubRoutes.RESULT}-${
                  searchParameters.findIndex(
                    x => x.searchId == result.searchId
                  ) + 1
                }`
              );
            }
          }))}
        />
      )}
    </>
  );
};

export default Breadcrum;

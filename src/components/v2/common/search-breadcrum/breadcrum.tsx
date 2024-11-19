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
const MAX_VISIBLE_PILLS = 5;

const Breadcrum = ({
  searchParameters ,
  activeTab,
  handleCloseSpecificTab,
  isMatchingPair
}: {
  searchParameters: any[];
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  handleCloseSpecificTab: (_id: number) => void;
  setIsLoading?: any;
  isMatchingPair?: boolean;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  console.log('searchParameters', searchParameters);
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
  console.log('activeTab', activeTab);
  if(dropdownPills.length > 0 && activeTab > (MAX_VISIBLE_PILLS - 1)) {
    const activelabel = ('Result ' + activeTab); 
    const index = dropdownPills.findIndex((item: any) => item?.saveSearchName != '' ? (item?.label === item?.saveSearchName.replace(/\s+/g, '') + ' ' + activeTab) : item?.label === activelabel);
    if(index != -1)
    {
     handleDropdownSelect(index);
    }    
  }  
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
        console.log('index > MAX_VISIBLE_PILLS', result?.label?.split(' ')[1]);
        const activePill = (result?.saveSearchName !== '') ? ((result.label) === (result?.saveSearchName.replace(/\s+/g, '') + ' ' +  activeTab)) : (activeTab === Number(result?.label?.split(' ')[1]));
        const activeIndex = (Number(result?.label?.split(' ')[1]));
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
              }}
              handlePillEdit={() => {
                // setIsLoading(true);
                router.push(
                  `${
                    isMatchingPair ? Routes.MATCHING_PAIR : Routes.SEARCH
                  }?active-tab=${SubRoutes.RESULT}-${activeIndex}&edit=${
                    SubRoutes.RESULT
                  }`
                );
              }}
              handlePillDelete={() => {
                let labelId = (Number(result?.label?.split(' ')[1]));
                handleCloseSpecificTab(labelId);
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
              handleDropdownSelect(index);
              router.push(
                `${
                  isMatchingPair ? Routes.MATCHING_PAIR : Routes.SEARCH
                }?active-tab=${SubRoutes.RESULT}-${(Number(result?.label?.split(' ')[1]))}`
              );
            }
          }))}
        />
      )}
    </>
  );
};

export default Breadcrum;

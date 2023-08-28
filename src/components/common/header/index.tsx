import { Checkbox } from '@/components/ui/checkbox';
import React, { ChangeEvent, useEffect, useState } from 'react';
import SearchIcon from '@public/assets/icons/search-outline-shadow.svg?url';
import { CustomInputField } from '@components/common/input-field/index';
import styles from './header.module.scss';

export interface IHeaderData {
  headerHeading?: string;
  handleSelectAllCheckbox?: (e: any) => void;
  searchCount?: number;
  handleSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
  isCheckAll?: boolean;
  handleSuggestionClick?: (suggestion: any) => void;
  suggestions?: any;
  headerData?: React.ReactNode;
}

interface ICustomHeaderProps {
  data?: IHeaderData;
}

const CustomHeader: React.FC<ICustomHeaderProps> = ({ data }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  //input style
  let inputStyle = {
    input: styles.headerInputStyle,
    inputMain: 'relative',
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <>
      <div
        className={`inline-flex  items-center justify-between border-b border-solitaireSenary ${
          styles.mainDiv
        } ${visible ? styles.mainDiv : styles.visible}`}
      >
        {/* Heading */}
        <p>
          {data?.headerHeading} {data?.searchCount && `(${data?.searchCount})`}
        </p>
        <div className="flex gap-[40px]">
          {/* Search Input Field*/}
          {data?.handleSearch ? (
            <div className="flex  gap-[15px]">
              {/* <Image src={searchIcon} alt="searchIcon" className={} /> */}
              <SearchIcon className="stroke-solitaireQuaternary mt-[10px]" />
              <CustomInputField
                type="text"
                name="search"
                style={inputStyle}
                onChange={data?.handleSearch}
                value={data?.searchValue}
                placeholder="Search by name"
                handleSuggestionClick={data.handleSuggestionClick}
                suggestions={data.suggestions}
              />
            </div>
          ) : (
            <></>
          )}
          {/* Select All checkbox */}
          {data?.headerData ? (
            data.headerData
          ) : (
            <div className="flex items-center gap-[10px]">
              <Checkbox
                onClick={data?.handleSelectAllCheckbox}
                data-testid={'Select All Checkbox'}
                checked={data?.isCheckAll}
              />
              <p className="text-solitaireTertiary text-base font-medium">
                Select All
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomHeader;

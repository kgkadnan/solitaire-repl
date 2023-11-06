import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import SearchIcon from '@public/assets/icons/search-outline-shadow.svg?url';
import styles from './header.module.scss';
import { CustomSearchInputField } from '../search-input';
import { ManageLocales } from '@/utils/translate';

interface IHeaderDataStyle {
  headerDataStyles?: string;
  headerDataContainerStyles?: string;
}
export interface IHeaderData {
  headerHeading?: string | React.ReactNode;
  handleSelectAllCheckbox?: (e: any) => void;
  searchCount?: any;
  handleSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
  isCheckAll?: boolean;
  handleSuggestionClick?: (suggestion: any) => void;
  suggestions?: string[];
  headerData?: React.ReactNode;
  overriddenStyles?: IHeaderDataStyle;
}

interface ICustomHeaderProps {
  data: IHeaderData;
}

const CustomHeader: React.FC<ICustomHeaderProps> = ({ data }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  //input style
  let searchInputStyle = {
    searchInput: styles.headerInputStyle,
    searchInputMain: 'relative',
  };

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, prevScrollPos]);

  return (
    <>
      <div
        className={`inline-flex  items-center justify-between border-b border-solitaireSenary ${
          styles.mainDiv
        } ${visible ? styles.mainDiv : styles.visible}`}
      >
        {/* Heading */}
        <p>
          {data?.headerHeading}
          {data?.searchCount && `(${data?.searchCount})`}
        </p>
        <div
          className={`flex gap-[40px] ${data?.overriddenStyles?.headerDataContainerStyles}`}
        >
          {/* Search Input Field*/}
          {data?.handleSearch ? (
            <div className="flex  gap-[15px]">
              <SearchIcon className="stroke-solitaireQuaternary mt-[10px]" />
              <CustomSearchInputField
                type="text"
                name="Search"
                style={searchInputStyle}
                value={data?.searchValue}
                onChange={data?.handleSearch}
                placeholder={ManageLocales('app.common.header.searchByName')}
                handleSuggestionClick={data.handleSuggestionClick}
                suggestions={data.suggestions}
              />
            </div>
          ) : (
            <></>
          )}
          {/* Select All checkbox */}
          {data?.headerData && (
            <div className={`${data.overriddenStyles?.headerDataStyles}`}>
              {data.headerData}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomHeader;

import { Checkbox } from "@/components/ui/checkbox";
import React, { ChangeEvent } from "react";
import { CustomDisplayButton } from "../buttons/display-button";
import SearchIcon from "@public/assets/icons/search-outline-shadow.svg?url";
import { CustomInputField } from "@components/common/input-field/index";
import styles from "./header.module.scss";

export interface IheaderData {
  headerHeading?: string;
  handleSelectAllCheckbox?: (e: any) => void;
  searchCount?: number;
  handleSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
  handleSuggestionClick?: (suggestion: any) => void;
  suggestions?: any;
}

interface CustomHeaderProps {
  data?: IheaderData;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ data }) => {
  //display button
  let displayButtonAllStyle = {
    displayButtonStyle: styles.headerSearchBtn,
    displayLabelStyle: styles.headerSearchBtnLabel,
  };
  //input style
  let inputStyle = {
    input: styles.headerInputStyle,
  };

  return (
    <>
      <div className="inline-flex w-[1255px] items-center justify-between h-[80px] border-b border-solitaireTertiary">
        {/* Heading */}
        <p>
          {data?.headerHeading} ({data?.searchCount})
        </p>
        <div className="flex gap-[40px]">
          {/* Search Input Field*/}
          {data?.handleSearch ? (
            <div className="flex  gap-[15px]">
              <div className="flex gap-[8px]">
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
              <CustomDisplayButton
                displayButtonLabel="Search"
                displayButtonAllStyle={displayButtonAllStyle}
              />
            </div>
          ) : (
            <></>
          )}
          {/* Select All checkbox */}
          <div className="flex items-center gap-[10px]">
            <Checkbox
              onClick={data?.handleSelectAllCheckbox}
              data-testid={"Select All Checkbox"}
            />
            <p className="text-solitaireTertiary text-base font-medium">
              Select All
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomHeader;

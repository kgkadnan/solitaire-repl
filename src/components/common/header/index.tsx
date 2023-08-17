import { Checkbox } from "@/components/ui/checkbox";
import React, { ChangeEvent } from "react";
import { CustomDisplayButton } from "../buttons/display-button";
import searchIcon from "@public/assets/icons/search-outline-shadow.svg";
import { CustomInputField } from "@components/common/input-field/index";
import Image from "next/image";
import styles from "./header.module.scss";

export interface IheaderData {
  headerHeading?: string;
  handleSelectAllCheckbox?: (e: any) => void;
  searchCount?: number;
  handleSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
}

interface CustomHeaderProps {
  data?: IheaderData;
  handleSuggestionClick?: any;
  suggestions?: any;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  data,
  handleSuggestionClick,
  suggestions,
}) => {
  //display button
  let displayButtonAllStyle = {
    displayButtonStyle: styles.headerSearchBtn,
    displayLabelStyle: styles.headerSearchBtnLabel,
  };
  //input style
  let inputStyle = {
    input: "w-[250px] pb-0",
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
                <Image src={searchIcon} alt="searchIcon" />
                <CustomInputField
                  type="text"
                  name="search"
                  style={inputStyle}
                  onChange={data?.handleSearch}
                  value={data?.searchValue}
                  placeholder="Search by name"
                  handleSuggestionClick={handleSuggestionClick}
                  suggestions={suggestions}
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
            <Checkbox onClick={data?.handleSelectAllCheckbox} />
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

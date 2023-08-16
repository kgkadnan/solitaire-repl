import { Checkbox } from "@/components/ui/checkbox";
import React, { ChangeEvent } from "react";
import Image from "next/image";
import { CustomDisplayButton } from "../buttons/display-button";
import searchIcon from "@public/assets/icons/search-outline.svg";
import { CustomInputField } from "@components/common/input-field/index";

export interface IheaderData {
  headerHeading?: string;
  handleSelectAllCheckbox?: (e: any) => void;
  searchCount?: number;
  handleSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
}

interface CustomHeaderProps {
  data?: IheaderData;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ data }) => {
  let displayButtonAllStyle = {
    displayButtonStyle: "",
    displayLabelStyle: "",
  };
  return (
    <>
      <div className="inline-flex w-[1255px] items-center justify-between h-[80px] border-b border-solitaireTertiary">
        <p>
          {data?.headerHeading} ({data?.searchCount})
        </p>
        <div className="flex gap-[25px]">
          {data?.handleSearch ? (
            <div className="flex">
              <Image src={searchIcon} alt="searchIcon" />
              <CustomInputField
                type="text"
                name="search"
                onChange={data?.handleSearch}
                value={data?.searchValue}
                placeholder="Search by name or date"
              />
              <CustomDisplayButton
                displayButtonLabel="Search"
                displayButtonAllStyle={displayButtonAllStyle}
              />
            </div>
          ) : (
            <></>
          )}
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

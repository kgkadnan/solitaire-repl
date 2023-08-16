import { Checkbox } from "@components/ui/checkbox";
import React from "react";

interface CustomHeaderProps {
  handleSelectAllCheckbox?: (e: any) => void;
  searchCount: number;
  heading?: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  handleSelectAllCheckbox,
  searchCount,
  heading,
}) => {
  return (
    <>
      <div className="inline-flex w-[1255px] items-center justify-between h-[80px] border-b border-solitaireTertiary">
        <p>
          {heading} ({searchCount})
        </p>
        <div className="flex items-center gap-[10px]">
          <Checkbox onClick={handleSelectAllCheckbox} />
          <p className="text-solitaireTertiary text-base font-medium">
            Select All
          </p>
        </div>
      </div>
    </>
  );
};

export default CustomHeader;

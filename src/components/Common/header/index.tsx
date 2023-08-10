import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

interface CustomHeaderProps {
  handleSelectAllCheckbox?: (e: any) => void;
  searchCount: number;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  handleSelectAllCheckbox,
  searchCount,
}) => {
  return (
    <>
      <div className="inline-flex w-[1255px] items-center justify-between h-[80px] border-b border-solitaireTertiary">
        <p>Previous Searches ({searchCount})</p>
        <div className="flex items-center gap-[10px]">
          <Checkbox onClick={handleSelectAllCheckbox} />
          <p>Select All</p>
        </div>
      </div>
    </>
  );
};

export default CustomHeader;

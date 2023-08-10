"use client";
import React from "react";
import styles from "./checkbox.module.scss";
import { Checkbox } from "@/components/ui/checkbox";

export interface CheckboxItem {
  checked?: boolean;
  id: string;
  handleCheck?: (checked: any) => void;
}

interface CustomCheckboxProps {
  data: string;
  onclick?: (e: any) => void;
  isChecked?: string[];
  style?: string;
}

export const CustomCheckBox: React.FC<CustomCheckboxProps> = ({
  data,
  style,
  onclick,
  isChecked,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {/* {data.map((item) => {
        console.log("isChecked", isChecked?.includes(item.id));
        return ( */}
      <Checkbox
        key={data}
        id={data}
        checked={isChecked?.includes(data)}
        onClick={onclick}
        // onCheckedChange={item.handleCheck}
        className={`${styles.defaultCheckbox} ${style} `}
      />
      {/* );
      })} */}
    </div>
  );
};

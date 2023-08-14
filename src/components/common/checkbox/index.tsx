"use client";
import React from "react";
import styles from "./checkbox.module.scss";
import { Checkbox } from "@/components/ui/checkbox";

interface CustomCheckboxProps {
  data: string;
  onClick?: (e: any) => void;
  isChecked?: string[];
  style?: string;
}

export const CustomCheckBox: React.FC<CustomCheckboxProps> = ({
  data,
  style,
  onClick,
  isChecked,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        key={data}
        id={data}
        checked={isChecked?.includes(data)}
        onClick={onClick}
        className={`${styles.defaultCheckbox} ${style} `}
      />
      {/* );
      })} */}
    </div>
  );
};

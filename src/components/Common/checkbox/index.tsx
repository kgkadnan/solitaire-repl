"use client";
import React from "react";
import { Checkbox } from "../../ui/checkbox";
import styles from "./checkbox.module.scss";

interface CheckboxItem {
  checked: boolean;
  id: number;
}

interface CustomCheckboxProps {
  data: CheckboxItem[];
  style?: string;
}

export const CustomCheckBox: React.FC<CustomCheckboxProps> = ({
  data,
  style,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {data.map((item) => {
        return (
          <Checkbox
            key={item.id}
            className={`${styles.defaultCheckbox} ${style} `}
          />
        );
      })}
      {/* <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label> */}
    </div>
  );
};

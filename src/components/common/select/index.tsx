"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import React from "react";
import styles from "./select.module.scss";

interface ISelectData {
  value: string;
  id: number;
}

interface Istyle {
  selectContent?: string;
  selectTrigger?: string;
}

interface SelectProps {
  data: ISelectData[];
  placeholder: string;
  style?: Istyle;
}

const handleChange = (event: any) => {
  console.log("event", event);
};

export const CustomSelect: React.FC<SelectProps> = ({
  data,
  placeholder,
  style,
}) => {
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger
        className={`${styles.defaultselectTrigger} ${style?.selectTrigger}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        className={`${styles.defaultselectcontent} ${style?.selectContent}`}
      >
        {data.map((item) => (
          <SelectItem key={item.id} value={item.value}>
            {item.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

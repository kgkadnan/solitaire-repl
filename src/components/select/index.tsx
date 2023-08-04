"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";
import styles from "./select.module.scss";

interface ArrayItem {
  value: string;
  id: number;
}

interface style {
  selectcontent: string;
  selectTrigger: string;
}

interface SelectProps {
  data: ArrayItem[];
  placeholder: string;
  style: style;
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
        className={`${styles.defaultselectTrigger} ${style.selectTrigger}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        className={`${styles.defaultselectcontent} ${style.selectcontent}`}
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

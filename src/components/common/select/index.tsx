'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@components/ui/select';

import React from 'react';
import styles from './select.module.scss';

export interface ISelectData {
  value: string;
  id: number;
}

interface IStyle {
  selectContent?: string;
  selectTrigger?: string;
  selectElement?: string;
}

interface ISelectProps {
  data: ISelectData[];
  onChange?: (event: string) => void;
  placeholder?: string | number;
  style?: IStyle;
}

export const CustomSelect: React.FC<ISelectProps> = ({
  data,
  placeholder,
  style,
  onChange
}) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger
        className={`${styles.defaultselectTrigger} ${style?.selectTrigger}`}
        data-testid="select"
      >
1        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        className={`${styles.defaultselectcontent} ${style?.selectContent}`}
        data-testid="option"
      >
        {data.map(item => (
          <SelectItem
            key={item.id}
            value={item.value}
            className={`${style?.selectElement}`}
          >
            {item.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

'use client';
import React from 'react';
import styles from './checkbox.module.scss';
import { Checkbox } from '@/components/ui/checkbox';

interface ICustomCheckboxProps {
  data: string;
  onClick: (e: any) => void;
  isChecked?: string[];
  style?: string;
}

export const CustomCheckBox: React.FC<ICustomCheckboxProps> = ({
  data,
  style,
  onClick,
  isChecked,
}) => {
  return (
    <div className="flex items-center text-center space-x-2">
      <Checkbox
        data-testid={`custom-checkbox-${data}`}
        key={`checkbox-${data}`}
        id={data}
        checked={isChecked?.includes(data)}
        onClick={() => onClick(data)}
        className={`${styles.defaultCheckbox} ${style} `}
      />
      {/* );
      })} */}
    </div>
  );
};

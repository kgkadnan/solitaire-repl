'use client';
import React from 'react';
import styles from './checkbox.module.scss';
import { Checkbox } from '@/components/ui/checkbox';
import { handleCheckboxClick } from './helper/handle-checkbox-click';

interface ICustomCheckboxProps {
  data: string;
  isChecked: string[];
  style?: string;
  setIsCheck?: any;
  setIsCheckAll?: any;
  isCheckAll?: any;
  row: any;
  setIsError: any;
}

export const CustomCheckBox: React.FC<ICustomCheckboxProps> = ({
  data,
  style,
  isChecked,
  setIsCheck,
  setIsCheckAll,
  isCheckAll,
  row,
  setIsError
}) => {
  return (
    <div className="flex items-center text-center space-x-2">
      <Checkbox
        data-testid={`custom-checkbox-${data}`}
        key={`checkbox-${data}`}
        id={data}
        checked={isChecked?.includes(data)}
        onClick={() =>
          handleCheckboxClick({
            id: data,
            isCheck: isChecked,
            setIsCheck,
            setIsCheckAll,
            isCheckAll,
            data: row,
            setIsError
          })
        }
        className={`${styles.defaultCheckbox} ${style} `}
      />
      {/* );
      })} */}
    </div>
  );
};

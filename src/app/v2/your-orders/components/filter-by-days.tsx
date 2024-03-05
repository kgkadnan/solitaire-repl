'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover';
import React from 'react';
import styles from '../your-orders.module.scss';
import CalenderIcon from '@public/v2/assets/icons/my-diamonds/calender.svg';
import { IFilterByDaysProps } from '../interface';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import { RadioButton } from '@/components/v2/common/radio';

export const FilterByDays: React.FC<IFilterByDaysProps> = ({
  filterFunction,
  radioState
}) => {
  // Data for the radio buttons
  const myDiamondsRadioButtons = [
    {
      name: 'days',
      id: '1',
      value: '7days',
      label: 'Last Week',
      checked: radioState === '7days'
    },
    {
      name: 'days',
      id: '2',
      value: '30days',
      label: 'Last Month',
      checked: radioState === '30days'
    },
    {
      name: 'days',
      id: '3',
      value: '90days',
      label: 'Last 3 Months',
      checked: radioState === '90days'
    }
  ];

  return (
    <div className="flex">
      {/* Popover for displaying radio buttons */}
      <Popover>
        <PopoverTrigger className="flex justify-center">
          {/* Calendar icon */}

          <ActionButton
            actionButtonData={[
              {
                label: ManageLocales('app.myDiamonds.selectDate'),
                svg: CalenderIcon,
                variant: 'secondary',
                handler: () => {}
              }
            ]}
          />
        </PopoverTrigger>
        {/* Popover content with radio buttons */}
        <PopoverContent className={styles.popoverContent}>
          <div className="">
            {/* Mapping through radio button data and rendering RadioButton component */}
            {myDiamondsRadioButtons?.map((radioData: any) => (
              <div className="p-[11px] flex items-center" key={radioData.id}>
                <RadioButton
                  radioMetaData={radioData}
                  onChange={filterFunction}
                  key={radioData?.id}
                  customStyle={{ radio: '!text-mMedium !text-neutral900' }}
                />
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

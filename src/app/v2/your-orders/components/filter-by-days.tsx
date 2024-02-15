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
  // //Handles the change of radio button and sets the selected days based on the value.
  // const handleMyDiamondsRadioChange = (value: string) => {
  //   //Calculates the date a certain number of days ago from the current date.
  //   const calculateDaysAgo = (days: number) => {
  //     const dateAgo = new Date();
  //     dateAgo.setDate(dateAgo.getDate() - days);
  //     return dateAgo.toISOString();
  //   };

  //   let selectedDays: string = '';

  //   if (value === '7') {
  //     selectedDays = calculateDaysAgo(7);
  //   } else if (value === '30') {
  //     selectedDays = calculateDaysAgo(30);
  //   } else if (value === '90') {
  //     selectedDays = calculateDaysAgo(90);
  //   }

  //   // Set selected days based on the active tab
  //   switch (activeTab) {
  //     case PENDING_INVOICE:
  //       setPendingInvoiceSelectedDays(selectedDays);
  //       break;
  //     case ACTIVE_INVOICE:
  //       setActiveInvoiceSelectedDays(selectedDays);
  //       break;
  //     default:
  //       setInvoiceHistorySelectedDays(selectedDays);
  //       break;
  //   }
  // };

  // Data for the radio buttons
  const myDiamondsRadioButtons = [
    {
      name: 'days',
      // onChange: handleMyDiamondsRadioChange,
      id: '1',
      value: '7days',
      label: 'Last Week',
      checked: radioState === '7days'
    },
    {
      name: 'days',
      // onChange: handleMyDiamondsRadioChange,
      id: '2',
      value: '30days',
      label: 'Last Month',
      checked: radioState === '30days'
    },
    {
      name: 'days',
      // onChange: handleMyDiamondsRadioChange,
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

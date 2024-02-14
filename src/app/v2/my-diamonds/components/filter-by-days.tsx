'use client';
import { RadioButton } from '@/components/common/custom-input-radio';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover';
import React from 'react';
import styles from '../my-diamonds.module.scss';
import CalenderIcon from '@public/v2/assets/icons/my-diamonds/calender.svg';
import { IFilterByDaysProps } from '../interface';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import { ACTIVE_INVOICE, PENDING_INVOICE } from '@/constants/business-logic';

export const FilterByDays: React.FC<IFilterByDaysProps> = ({
  activeTab,
  setPendingInvoiceSelectedDays,
  setActiveInvoiceSelectedDays,
  setInvoiceHistorySelectedDays
}) => {
  //Handles the change of radio button and sets the selected days based on the value.
  const handleMyDiamondsRadioChange = (value: string) => {
    //Calculates the date a certain number of days ago from the current date.
    const calculateDaysAgo = (days: number) => {
      const dateAgo = new Date();
      dateAgo.setDate(dateAgo.getDate() - days);
      return dateAgo.toISOString();
    };

    let selectedDays: string = '';

    if (value === '7') {
      selectedDays = calculateDaysAgo(7);
    } else if (value === '30') {
      selectedDays = calculateDaysAgo(30);
    } else if (value === '90') {
      selectedDays = calculateDaysAgo(90);
    }

    // Set selected days based on the active tab
    switch (activeTab) {
      case PENDING_INVOICE:
        setPendingInvoiceSelectedDays(selectedDays);
        break;
      case ACTIVE_INVOICE:
        setActiveInvoiceSelectedDays(selectedDays);
        break;
      default:
        setInvoiceHistorySelectedDays(selectedDays);
        break;
    }
  };

  // Data for the radio buttons
  const myDiamondsRadioButtons = [
    {
      name: 'days',
      // onChange: handleMyDiamondsRadioChange,
      id: '1',
      value: '7',
      label: 'Last Week'
      // checked: false
    },
    {
      name: 'days',
      // onChange: handleMyDiamondsRadioChange,
      id: '2',
      value: '30',
      label: 'Last Month'
      // checked: false
    },
    {
      name: 'days',
      // onChange: handleMyDiamondsRadioChange,
      id: '3',
      value: '90',
      label: 'Last 3 Months'
      // checked: true
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
                variant: 'secondary'
              }
            ]}
          />
        </PopoverTrigger>
        {/* Popover content with radio buttons */}
        <PopoverContent className={styles.popoverContent}>
          <div className="">
            {/* Mapping through radio button data and rendering RadioButton component */}
            {myDiamondsRadioButtons?.map((radioData: any) => (
              <div className="mb-3" key={radioData.id}>
                <RadioButton
                  radioMetaData={radioData}
                  onChange={handleMyDiamondsRadioChange}
                  key={radioData?.id}
                />
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

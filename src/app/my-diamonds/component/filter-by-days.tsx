'use client';
import { RadioButton } from '@/components/common/custom-input-radio';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover';
import Image from 'next/image';
import React from 'react';
import styles from '../my-diamonds.module.scss';
import CalenderIcon from '@public/assets/icons/calender.svg';
import { IFilterByDaysProps } from '../interface/my-diamonds-interface';

export const FilterByDays: React.FC<IFilterByDaysProps> = ({
  activeTab,
  setRecentConfirmationSelectedDays,
  setMyInvoiceSelectedDays,
  setPreviousConfirmationSelectedDays
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
      case 'Recent Confirmations':
        setRecentConfirmationSelectedDays(selectedDays);
        break;
      case 'My Invoices':
        setMyInvoiceSelectedDays(selectedDays);
        break;
      default:
        setPreviousConfirmationSelectedDays(selectedDays);
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
        <PopoverTrigger className="flex justify-center mt-3 ml-5">
          {/* Calendar icon */}
          <Image
            src={CalenderIcon}
            alt="Calender Image"
            width={24}
            height={24}
          />
          {/* Label for the filter */}
          <p className="text-solitaireTertiary ml-2 text-[14px]">
            Filter By Days
          </p>
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

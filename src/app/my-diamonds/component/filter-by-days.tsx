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
import { IFilterByDaysProps } from '../my-diamonds-interface';

export const FilterByDays: React.FC<IFilterByDaysProps> = ({
  activeTab,
  setRecentConfirmationSelectedDays,
  setMyInvoiceSelectedDays,
  setPreviousConfirmationSelectedDays
}) => {
  const handleMyDiamondsRadioChange = (value: string) => {
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

  const myDiamondsRadioButtons = [
    {
      name: 'days',
      onChange: handleMyDiamondsRadioChange,
      id: '1',
      value: '7',
      label: 'Last Week'
      // checked: false
    },
    {
      name: 'days',
      onChange: handleMyDiamondsRadioChange,
      id: '2',
      value: '30',
      label: 'Last Month'
      // checked: false
    },
    {
      name: 'days',
      onChange: handleMyDiamondsRadioChange,
      id: '3',
      value: '90',
      label: 'Last 3 Months'
      // checked: true
    }
  ];

  return (
    <div className="flex">
      <Popover>
        <PopoverTrigger className="flex justify-center mt-3 ml-5">
          <Image
            src={CalenderIcon}
            alt="Calender Image"
            width={24}
            height={24}
          />
          <p className="text-solitaireTertiary ml-2 text-[14px]">
            Filter By Days
          </p>
        </PopoverTrigger>
        <PopoverContent className={styles.popoverContent}>
          <div className="">
            {myDiamondsRadioButtons?.map((radioData: any) => (
              <div className="mb-3" key={radioData.id}>
                <RadioButton radioMetaData={radioData} key={radioData?.id} />
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

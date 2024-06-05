'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/v2/ui/dropdown-menu';
import Image from 'next/image';
import React, { useState } from 'react';
import comingSoon from '@public/v2/assets/icons/coming-soon.svg';

interface IDropdownMenu {
  label: string;
  handler: any;
  isHidden?: any;
  commingSoon?: boolean;
}
export interface IDropdownData {
  dropdownTrigger: React.ReactNode;
  dropdownMenu: IDropdownMenu[];
  isDisable?: boolean;
}

export const Dropdown: React.FC<IDropdownData> = ({
  dropdownTrigger,
  dropdownMenu,
  isDisable = false
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleItemClick = (fn: Function) => {
    setIsDropdownOpen(false);
    fn();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {dropdownTrigger}
      </DropdownMenuTrigger>
      {isDropdownOpen && (
        <DropdownMenuContent
          className={`border-[1px] items-center border-solid border-neutral200  text-neutral900 rounded-[8px] relative `}
        >
          {dropdownMenu.map(items => {
            if (items.isHidden) {
              return null;
            }
            return (
              <div
                key={items.label}
                onClick={() => {
                  items?.commingSoon ? null : handleItemClick(items.handler);
                }}
                className={`cursor-pointer hover:bg-neutral-100  p-[6px] ${
                  items?.commingSoon ? 'text-neutral400' : 'text-neutral900'
                }  ${items?.commingSoon ? 'bg-neutral100' : 'bg-neutral0'}`}
              >
                <DropdownMenuLabel>
                  <div className="flex justify-between items-center">
                    {items.label}{' '}
                    {items?.commingSoon && (
                      <Image src={comingSoon} alt="comming soon" />
                    )}{' '}
                  </div>
                </DropdownMenuLabel>
              </div>
            );
          })}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

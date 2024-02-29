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
          className={`border-[1px] items-center border-solid border-neutral200  text-neutral900 rounded-[8px] `}
        >
          {isDisable && (
            <div className="flex justify-center border-b-[1px] border-solid border-neutral200 bg-neutral0 py-[8px]">
              <Image src={comingSoon} alt="comingSoon" />
            </div>
          )}
          {dropdownMenu.map(items => {
            if (items.isHidden) {
              return null;
            }
            return (
              <div
                key={items.label}
                onClick={() => {
                  isDisable ? null : handleItemClick(items.handler);
                }}
                className={`cursor-pointer hover:bg-neutral-100  p-[6px] ${
                  isDisable ? 'text-neutral400' : 'text-neutral900'
                }  ${isDisable ? 'bg-neutral100' : 'bg-neutral0'}`}
              >
                <DropdownMenuLabel>{items.label}</DropdownMenuLabel>
              </div>
            );
          })}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

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
  isDisable?: boolean;
  icon?: any;
}
export interface IDropdownData {
  dropdownTrigger: React.ReactNode;
  dropdownMenu: IDropdownMenu[];
}

export const Dropdown: React.FC<IDropdownData> = ({
  dropdownTrigger,
  dropdownMenu
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
          className={`border-[1px] z-[2000] items-center border-solid border-neutral200  text-neutral900 rounded-[8px] relative `}
        >
          {dropdownMenu.map(items => {
            if (items.isHidden) {
              return null;
            }
            return (
              <div
                key={items.label}
                onClick={() => {
                  items?.commingSoon || items?.isDisable
                    ? null
                    : handleItemClick(items.handler);
                }}
                className={`cursor-pointer hover:bg-neutral-100  p-[6px] ${
                  items?.commingSoon || items?.isDisable
                    ? 'text-neutral400'
                    : 'text-neutral900'
                }  ${
                  items?.commingSoon || items?.isDisable
                    ? 'bg-neutral100'
                    : 'bg-neutral0'
                }`}
              >
                <DropdownMenuLabel>
                  <div
                    className={`flex ${
                      items?.icon ? 'gap-1' : 'justify-between '
                    } items-center`}
                  >
                    {items?.icon && (
                      <Image src={items?.icon} alt="comming soon" />
                    )}{' '}
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

'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/v2/ui/dropdown-menu';
import React, { useState } from 'react';

interface IDropdownMenu {
  label: string;
  handler: any;
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
        <DropdownMenuContent className="border-[1px] border-solid border-neutral200 bg-neutral0 text-neutral900 rounded-[8px] hover:bg-neutral-100">
          {dropdownMenu.map(items => (
            <div
              key={items.label}
              onClick={() => handleItemClick(items.handler)}
              className="cursor-pointer z-[1112px]"
            >
              <DropdownMenuLabel>{items.label}</DropdownMenuLabel>
            </div>
          ))}
          <DropdownMenuSeparator className="border-neutral200 bg-neutral200" />
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

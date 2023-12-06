'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import React, { useState } from 'react';
import styles from './dropdown.module.scss';

interface IdropdownMenu {
  label: string;
  fn: any;
}
export interface IDropdownData {
  dropdownTrigger: React.ReactNode;
  dropdownMenu: IdropdownMenu[];
}

export const CustomDropdown: React.FC<IDropdownData> = ({
  dropdownTrigger,
  dropdownMenu
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleItemClick = (fn: Function) => {
    setIsDropdownOpen(false);
    fn();
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={styles.transparent}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {dropdownTrigger}
        </DropdownMenuTrigger>
        {isDropdownOpen && (
          <DropdownMenuContent>
            {dropdownMenu.map(items => (
              <div
                key={items.label}
                onClick={() => handleItemClick(items.fn)}
                className="cursor-pointer z-[1112px]"
              >
                <DropdownMenuLabel className={styles.transparent}>
                  {items.label}
                </DropdownMenuLabel>
              </div>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
};

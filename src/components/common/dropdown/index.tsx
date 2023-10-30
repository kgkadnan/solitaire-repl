import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';
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
  dropdownMenu,
}) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className={styles.transparent}>
          {dropdownTrigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {dropdownMenu.map((items) => {
            return (
              <div
                key={items.label}
                onClick={items.fn}
                className="cursor-pointer z-[1112px]"
              >
                <DropdownMenuLabel className={styles.transparent}>
                  {items.label}
                </DropdownMenuLabel>
              </div>
            );
          })}
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

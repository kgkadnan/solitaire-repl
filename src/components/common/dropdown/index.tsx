import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';
import styles from './dropdown.module.scss';

export interface IDropdownData {
  dropdownTrigger: React.ReactNode;
  dropdownMenuLabel: string[];
}

export const CustomDropdown: React.FC<IDropdownData> = ({
  dropdownTrigger,
  dropdownMenuLabel,
}) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{dropdownTrigger}</DropdownMenuTrigger>
        <DropdownMenuContent>
          {dropdownMenuLabel.map((items: string) => {
            return (
              <>
                <DropdownMenuLabel className={styles.transparent}>
                  {items}
                </DropdownMenuLabel>
              </>
            );
          })}
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

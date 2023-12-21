import React, { ReactNode } from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from '@/components/ui/menubar';

interface IMenuItem {
  label: string;
  id: string;
  svg?: ReactNode;
  onSelect?: () => void;
}

interface ICustomMenuBar {
  menuTrigger: ReactNode;
  menuItem: IMenuItem[];
  menuTriggerStyle?: string;
  menuContentStyle?: string;
  menuItemStyle?: string;
}

const CustomMenuBar = ({
  menuTrigger,
  menuItem,
  menuTriggerStyle,
  menuContentStyle,
  menuItemStyle
}: ICustomMenuBar) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className={menuTriggerStyle}>
          {menuTrigger}
        </MenubarTrigger>
        <MenubarContent className={menuContentStyle}>
          {menuItem.map((items: any) => {
            return (
              <MenubarItem
                key={items.id}
                onSelect={items.onSelect}
                className={menuItemStyle}
              >
                {items.svg ?? items.svg} {items.label}
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default CustomMenuBar;

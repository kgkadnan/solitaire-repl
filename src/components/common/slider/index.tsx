import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import React, { ReactNode } from 'react';

interface ISliderProps {
  sheetTriggerStyle?: string;
  sheetTriggenContent?: React.ReactNode;
  sheetContentStyle?: string;
  sheetContent: React.ReactNode;
  cardTimeout?: boolean;
  sheetClose?: ReactNode;
}

export const CustomSlider: React.FC<ISliderProps> = ({
  sheetTriggerStyle,
  sheetTriggenContent,
  sheetContentStyle,
  sheetContent,
  cardTimeout,
  sheetClose,
}) => {
  return (
    <Sheet>
      {!cardTimeout ? (
        <SheetTrigger className={sheetTriggerStyle}>
          {sheetTriggenContent}
        </SheetTrigger>
      ) : (
        <div className="w-[95%]">{sheetTriggenContent}</div>
      )}
      <SheetContent className={sheetContentStyle}>
        {sheetContent}
        {sheetClose ?? (
          <SheetClose asChild>
            <button type="submit">Save changes</button>
          </SheetClose>
        )}
      </SheetContent>
    </Sheet>
  );
};

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import React from 'react';

interface ISliderProps {
  sheetTriggerStyle?: string;
  sheetTriggenContent: React.ReactNode;
  sheetContentStyle?: string;
  sheetContent: React.ReactNode;
  cardTimeout?: boolean;
}

export const CustomSlider: React.FC<ISliderProps> = ({
  sheetTriggerStyle,
  sheetTriggenContent,
  sheetContentStyle,
  sheetContent,
  cardTimeout,
}) => {
  return (
    <>
      <Sheet>
        {!cardTimeout ? (
          <SheetTrigger className={sheetTriggerStyle}>
            {sheetTriggenContent}
          </SheetTrigger>
        ) : (
          <div className="w-[90%]">{sheetTriggenContent}</div>
        )}

        <SheetContent className={sheetContentStyle}>
          {sheetContent}
        </SheetContent>
      </Sheet>
    </>
  );
};

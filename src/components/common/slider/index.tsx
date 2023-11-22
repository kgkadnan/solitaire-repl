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
  onOpenChange?: (open: boolean) => void;
  isSliderOpen?: boolean;
}

export const CustomSlider: React.FC<ISliderProps> = ({
  sheetTriggerStyle,
  sheetTriggenContent,
  sheetContentStyle,
  sheetContent,
  cardTimeout,
  onOpenChange,
  isSliderOpen,
}) => {
  return (
    <Sheet onOpenChange={onOpenChange} open={isSliderOpen}>
      {!cardTimeout ? (
        <SheetTrigger className={sheetTriggerStyle}>
          {sheetTriggenContent}
        </SheetTrigger>
      ) : (
        <div className="w-[95%]">{sheetTriggenContent}</div>
      )}
      <SheetContent className={sheetContentStyle}>{sheetContent}</SheetContent>
    </Sheet>
  );
};

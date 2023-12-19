import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { IDialog } from './interface';

export const CustomDialog: React.FC<IDialog> = ({
  dialogContent,
  isOpens,
  setIsOpen,
  dialogStyle
}) => {
  const onclose = (open: boolean) => {
    console.log('hello', open);
    setIsOpen(open);
  };
  return (
    <Dialog open={isOpens} onOpenChange={onclose} defaultOpen={false}>
      <DialogContent
        className={`max-w-[377px] h-[180px] bg-solitairePrimary text-solitaireTertiary  justify-center items-center  ${dialogStyle?.dialogContent}`}
      >
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
};

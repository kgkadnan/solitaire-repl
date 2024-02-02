import React, { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export interface IDialog {
  dialogContent: React.ReactNode;
  isOpens: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dialogStyle?: {
    dialogContent?: string;
  };
}

export const DialogComponent: React.FC<IDialog> = ({
  dialogContent,
  isOpens,
  setIsOpen,
  dialogStyle
}) => {
  const onclose = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <Dialog open={isOpens} onOpenChange={onclose} defaultOpen={false}>
      <DialogContent
        className={`max-w-[400px] h-[222px] bg-neutral25 flex flex-col justify-center  !rounded-[8px] p-[24px] ${dialogStyle?.dialogContent}`}
      >
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
};

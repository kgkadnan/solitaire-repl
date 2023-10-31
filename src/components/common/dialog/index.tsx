import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface IDialog {
  dialogContent: React.ReactNode;
  isOpens?: boolean;
  setIsOpen?: any;
  dialogStyle?: any;
}

export const CustomDialog: React.FC<IDialog> = ({
  dialogContent,
  isOpens,
  setIsOpen,
  dialogStyle,
}) => {
  const onclose = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <>
      <Dialog open={isOpens} onOpenChange={onclose} defaultOpen={false}>
        <DialogContent
          className={`sm:max-w-[377px] h-[147px] bg-solitaireSecondary text-solitaireTertiary  justify-center  ${dialogStyle?.dialogContent}`}
        >
          {dialogContent}
        </DialogContent>
      </Dialog>
    </>
  );
};

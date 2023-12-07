import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ICustomModal } from './interface';

export const CustomModal: React.FC<ICustomModal> = ({
  dialogContent,
  isOpens,
  setIsOpen,
  modalStyle
}) => {
  const onclose = (open: boolean) => {
    setIsOpen(open);
  };

  console.log('dialogContent', dialogContent);
  return (
    <Dialog open={isOpens} onOpenChange={onclose} defaultOpen={false}>
      <DialogContent
        className={`  bg-solitairePrimary text-solitaireTertiary  justify-center items-center  ${modalStyle}`}
      >
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
};

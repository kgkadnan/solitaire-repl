import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface IDialog {
  dialogContent: React.ReactNode;
  isOpens?: boolean;
  setIsOpen?: any;
}

export const CustomDialog: React.FC<IDialog> = ({
  dialogContent,
  isOpens = false,
  setIsOpen,
}) => {
  const onclose = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <>
      <Dialog open={isOpens} onOpenChange={onclose}>
        {/* <DialogTrigger>{dialogTrigger}</DialogTrigger> */}
        <DialogContent className="sm:max-w-[400px] h-[200px] bg-solitaireSecondary z-[1200]">
          {dialogContent}
        </DialogContent>
      </Dialog>
    </>
  );
};

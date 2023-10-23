import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface IDialog {
  dialogContent: React.ReactNode;
  isOpens?: boolean;
}

export const CustomDialog: React.FC<IDialog> = ({
  dialogContent,
  isOpens = false,
}) => {
  return (
    <>
      <Dialog open={isOpens}>
        {/* <DialogTrigger>{dialogTrigger}</DialogTrigger> */}
        <DialogContent className="sm:max-w-[400px] h-[200px] bg-solitaireSecondary z-[1200]">
          {dialogContent}
        </DialogContent>
      </Dialog>
    </>
  );
};

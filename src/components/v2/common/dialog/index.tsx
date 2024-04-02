import React, { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogContent } from '../../ui/dialog';

export interface IDialog {
  dialogContent: React.ReactNode;
  isOpens: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
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
  return (
    <Dialog open={isOpens} defaultOpen={false}>
      {/*Remove onOpenChange to prevent the dialog from closing when clicking outside the dialog*/}
      <DialogContent
        className={`max-w-[400px] min-h-[222px] bg-neutral25 max-h-[300px] flex flex-col justify-center  !rounded-[8px] p-[24px] ${dialogStyle?.dialogContent}`}
      >
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
};

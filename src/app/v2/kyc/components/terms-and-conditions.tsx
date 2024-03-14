import TermAndCondtions from '@/app/terms-and-conditions/page';
import { Dialog, DialogContent } from '@/components/v2/ui/dialog';
import React, { Dispatch, SetStateAction } from 'react';

export interface ITermsDialog {
  isOpens: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dialogStyle?: {
    dialogContent?: string;
  };
}

export const TermsDialogComponent: React.FC<ITermsDialog> = ({
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
        className={`max-w-[80%] min-h-[222px] bg-neutral25 max-h-[80%] flex flex-col overflow-y-auto  !rounded-[8px] p-[24px] ${dialogStyle?.dialogContent}`}
      >
        <TermAndCondtions />
      </DialogContent>
    </Dialog>
  );
};

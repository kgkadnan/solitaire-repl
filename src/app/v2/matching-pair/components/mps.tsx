import { Dialog, DialogContent } from '@/components/v2/ui/dialog';
import React from 'react';

export interface IDialog {
  isOpen: boolean;
  onClose: () => void;
  renderContent: () => React.ReactNode; // A function that returns React nodes
  dialogStyle?: string; // Optional style string
}

export const MPSDialogComponent: React.FC<IDialog> = ({
  isOpen,
  onClose,
  renderContent, // This is the render function for the content
  dialogStyle
}) => {
  return (
    <Dialog open={isOpen} defaultOpen={false}>
      <DialogContent
        className={`max-w-[650px] min-h-[360px] bg-neutral25 flex flex-col justify-center  !rounded-[8px]  ${dialogStyle}`}
      >
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

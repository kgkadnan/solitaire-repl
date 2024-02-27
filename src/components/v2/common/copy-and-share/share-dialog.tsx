import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export interface IDialog {
  isOpen: boolean;
  onClose: () => void;
  renderContent: () => React.ReactNode; // A function that returns React nodes
  dialogStyle?: string; // Optional style string
}

export const ShareDialog: React.FC<IDialog> = ({
  isOpen,
  onClose,
  renderContent, // This is the render function for the content
  dialogStyle
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} defaultOpen={false}>
      <DialogContent
        className={`min-w-[650px] min-h-[360px] bg-neutral25 flex flex-col !rounded-[8px]  p-[24px]  ${dialogStyle}`}
      >
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

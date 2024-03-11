import React from 'react';
import { Dialog, DialogContent } from '../../ui/dialog';

export interface IDialog {
  isOpen: boolean;
  onClose: () => void;
  renderContent: () => React.ReactNode; // A function that returns React nodes
  dialogStyle?: string; // Optional style string
}

export const AddCommentDialog: React.FC<IDialog> = ({
  isOpen,
  onClose,
  renderContent, // This is the render function for the content
  dialogStyle
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} defaultOpen={false}>
      <DialogContent
        className={`max-w-[625px] min-h-[453px] bg-neutral0 flex flex-col justify-center  !rounded-[8px]   ${dialogStyle}`}
      >
        <>{renderContent()}</>
      </DialogContent>
    </Dialog>
  );
};

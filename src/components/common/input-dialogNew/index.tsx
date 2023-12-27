import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  renderContent: () => React.ReactNode; // A function that returns React nodes
  dialogStyle?: string; // Optional style string
}

export const CustomInputDialog: React.FC<CustomDialogProps> = ({
  isOpen,
  onClose,
  renderContent, // This is the render function for the content
  dialogStyle
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} defaultOpen={false}>
      <DialogContent
        className={`max-w-[390px] h-[200px] bg-solitairePrimary text-solitaireTertiary justify-center items-center ${dialogStyle}`}
      >
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

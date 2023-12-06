import { ReactNode, useState } from 'react';

export const useModalStateManagement = () => {
  const [dialogContent, setDialogContent] = useState<ReactNode>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  return {
    modalState: {
      dialogContent,
      isDialogOpen,
      isInputDialogOpen,
      isSliderOpen
    },
    modalSetState: {
      setDialogContent,
      setIsDialogOpen,
      setIsInputDialogOpen,
      setIsSliderOpen
    }
  };
};

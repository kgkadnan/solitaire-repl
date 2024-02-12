import { ReactNode, useState } from 'react';

export const useModalStateManagement = () => {
  const [dialogContent, setDialogContent] = useState<ReactNode>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);

  return {
    modalState: {
      dialogContent,
      isDialogOpen,
      isInputDialogOpen
    },
    modalSetState: {
      setDialogContent,
      setIsDialogOpen,
      setIsInputDialogOpen
    }
  };
};

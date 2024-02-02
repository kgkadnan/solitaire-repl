import { ReactNode, useState } from 'react';

export const useModalStateManagement = () => {
  const [dialogContent, setDialogContent] = useState<ReactNode>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return {
    modalState: {
      dialogContent,
      isDialogOpen
    },
    modalSetState: {
      setDialogContent,
      setIsDialogOpen
    }
  };
};

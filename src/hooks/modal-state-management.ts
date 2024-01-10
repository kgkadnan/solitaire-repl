import { ReactNode, useState } from 'react';

export const useModalStateManagement = () => {
  const [dialogContent, setDialogContent] = useState<ReactNode>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [persistDialogContent, setPersistDialogContent] = useState<ReactNode>();
  const [isPersistDialogOpen, setIsPersistDialogOpen] = useState(false);

  return {
    modalState: {
      dialogContent,
      isDialogOpen,
      isInputDialogOpen,
      isSliderOpen,
      modalContent,
      isModalOpen,
      persistDialogContent,
      isPersistDialogOpen
    },
    modalSetState: {
      setDialogContent,
      setIsDialogOpen,
      setIsInputDialogOpen,
      setIsSliderOpen,
      setModalContent,
      setIsModalOpen,
      setPersistDialogContent,
      setIsPersistDialogOpen
    }
  };
};

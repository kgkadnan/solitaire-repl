import { Dispatch, SetStateAction } from 'react';

export interface IDialog {
  dialogContent: React.ReactNode;
  isOpens: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dialogStyle?: {
    dialogContent?: string;
  };
}

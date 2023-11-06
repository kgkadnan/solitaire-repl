import { Dispatch, SetStateAction } from 'react';
export interface IInputDialog {
  customInputDialogData: {
    isOpens: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    label: string;
    name: string;
    inputValue: string | number;
    setInputvalue: any;
    displayButtonLabel2: string;
    displayButtonFunction: () => void;
  };
}

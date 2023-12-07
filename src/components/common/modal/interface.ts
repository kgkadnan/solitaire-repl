import React from 'react';

import { Dispatch, SetStateAction } from 'react';

export interface ICustomModal {
  dialogContent: React.ReactNode;
  isOpens: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  modalStyle?: string;
}

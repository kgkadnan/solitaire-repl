import { Dispatch, SetStateAction } from 'react';

export interface ICheckboxState {
  isCheck: string[];
  isCheckAll: boolean;
}

export interface ICheckboxSetState {
  setIsCheck: Dispatch<SetStateAction<string[]>>;
  setIsCheckAll: Dispatch<SetStateAction<boolean>>;
}

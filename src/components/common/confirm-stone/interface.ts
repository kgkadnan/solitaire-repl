import {
  IErrorSetState,
  IErrorState,
  IModalSetState,
  IProduct,
  ITableColumn
} from '@/app/search/result/result-interface';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IConfirmStoneSetState {
  setConfirmStoneData: Dispatch<SetStateAction<IProduct[]>>;
  setCommentValue: Dispatch<SetStateAction<string>>;
  setSelectedDaysInputValue: Dispatch<SetStateAction<string>>;
  setSelectedRadioDaysValue: Dispatch<SetStateAction<string>>;
  setIsComeFromConfirmStone: Dispatch<SetStateAction<boolean>>;
}

export interface IConfirmStoneState {
  confirmStoneData: IProduct[];
  commentValue: string;
  selectedDaysInputValue: string;
  selectedRadioDaysValue: string;
  isComeFromConfirmStone: boolean;
}

export interface IConfirmRadioButtons {
  name: string;
  onChange: (value: string) => void;
  id: string;
  value: string;
  label: ReactNode | string;
  checked: boolean;
}

export interface IConfirmStoneProps {
  listingColumns: ITableColumn[];
  errorState: IErrorState;
  errorSetState: IErrorSetState;
  onOpenChange: (open: boolean) => void;
  confirmStoneState: IConfirmStoneState;
  confirmStoneSetState: IConfirmStoneSetState;
  modalSetState: IModalSetState;
  refetch?: any;
}

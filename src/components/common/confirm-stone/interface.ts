import {
  IConfirmStoneSetState,
  IConfirmStoneState,
  IErrorSetState,
  IErrorState,
  Product,
  TableColumn
} from '@/app/search/result/result-interface';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface IconfirmRadioButtons {
  name: string;
  onChange: (value: string) => void;
  id: string;
  value: string;
  label: ReactNode | string;
  checked: boolean;
}

export interface IConfirmStoneProps {
  listingColumns: TableColumn[];
  errorState: IErrorState;
  errorSetState: IErrorSetState;
  onOpenChange: (open: boolean) => void;
  confirmStoneState: IConfirmStoneState;
  confirmStoneSetState: IConfirmStoneSetState;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  setDialogContent: Dispatch<SetStateAction<ReactNode>>;
}

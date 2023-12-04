import {
  ICheckboxSetState,
  ICheckboxState,
  Product,
  TableColumn,
} from '@/app/search/result/result-interface';
import { Dispatch, SetStateAction } from 'react';

export interface ICheckboxData {
  checkboxState?: ICheckboxState;
  checkboxSetState?: ICheckboxSetState;
  setIsError?: Dispatch<SetStateAction<boolean>>;
}
export interface ICustomDataTableProps {
  tableRows: Product[];
  tableColumns: TableColumn[];
  checkboxData?: ICheckboxData;
  mainTableStyle?: string;
  selectionAllowed?: boolean;
  handleConfirm?: (isCheck: string[]) => void;
}

export interface KeyLabelMapping {
  [key: string]: string;
}

export interface ITheadProps {
  selectionAllowed: boolean;
  checkboxData?: ICheckboxData;
  tableCol: TableColumn[];
  rows: Product[];
}

export interface ITbodyProps {
  tableRows: Product[];
  selectionAllowed: boolean;
  handleClick?: (id: string) => void;
  isCheck?: string[];
  tableCol: TableColumn[];
  setDialogContent: any;
  setIsDialogOpen: any;
  handleConfirm?: (isCheck: string[]) => void;
  checkboxData?: ICheckboxData;
}

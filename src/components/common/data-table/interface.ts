import { Product, TableColumn } from '@/app/search/result/result-interface';
import { Dispatch, SetStateAction } from 'react';

export interface ICheckboxData {
  handleSelectAllCheckbox: () => void;
  handleClick: (id: string) => void;
  isCheck: string[]; // You might want to replace 'any' with a more specific type
  isCheckAll: boolean;
  setIsCheck: Dispatch<SetStateAction<string[]>>;
  setIsCheckAll: Dispatch<SetStateAction<boolean>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
}
export interface ICustomDataTableProps {
  tableRows: Product[];
  tableColumns: TableColumn[];
  checkboxData?: any;
  mainTableStyle?: string;
  selectionAllowed?: boolean;
  handleConfirm?: (isCheck: string[]) => void;
}

export interface KeyLabelMapping {
  [key: string]: string;
}

export interface ITheadProps {
  selectionAllowed: boolean;
  checkboxData: any;
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
  checkboxData: any;
}

import { Product, TableColumn } from '@/app/search/result/result-interface';

export interface ICheckboxData {
  handleSelectAllCheckbox: () => void;
  handleClick: (id: string) => void;
  isCheck: string[]; // You might want to replace 'any' with a more specific type
  isCheckAll: boolean;
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
  handleSelectAllCheckbox?: () => void;
  isCheckAll?: boolean;
  tableCol: TableColumn[];
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
}

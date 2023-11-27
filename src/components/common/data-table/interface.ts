import { Product, TableColumn } from '@/app/search/result-interface';

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
  mainTableStyle: string;
  selectionAllowed?: boolean;
  handleConfirm?: (isCheck: string[]) => void;
}

export interface KeyLabelMapping {
  [key: string]: string;
}

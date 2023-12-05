import {
  ICheckboxSetState,
  ICheckboxState,
  Product,
  TableColumn
} from '@/app/search/result/result-interface';
import { Dispatch, SetStateAction } from 'react';

export interface ICheckboxData {
  checkboxState?: ICheckboxState;
  checkboxSetState?: ICheckboxSetState;
}
export interface ICustomDataTableProps {
  tableRows: Product[];
  tableColumns: TableColumn[];
  checkboxData?: any;
  mainTableStyle?: string;
  selectionAllowed?: boolean;
  handleConfirm?: (isCheck: string[]) => void;
  errorSetState?: any;
  confirmStoneSetState?: any;
  modalSetState?: any;
  modalState?: any;
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
  handleConfirm?: (isCheck: string[]) => void;
  checkboxData?: ICheckboxData;
  errorSetState?: any;
  confirmStoneSetState?: any;
  modalSetState?: any;
}
export interface IswitchButtonTabs {
  id: string;
  displayButtonLabel: string;
  url?: string;
  iframeUrl?: string;
}
interface IDataTableBodyState {
  sliderData: Product[];
  activeTab: string;
  diamondDetailImageUrl: string;
  diamondDetailIframeUrl: string;
}

interface IDataTableBodySetState {
  setSliderData: Dispatch<SetStateAction<Product[]>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
  setDiamondDetailImageUrl: Dispatch<SetStateAction<string>>;
  setDiamondDetailIframeUrl: Dispatch<SetStateAction<string>>;
}

export interface IDetailCertificateSlider {
  dataTableBodyState: IDataTableBodyState;
  dataTableBodySetState: IDataTableBodySetState;
  tableRows: Product[];
  index: number;
  row: Product;
}

export interface IDetailImageSlider {
  dataTableBodyState: IDataTableBodyState;
  dataTableBodySetState: IDataTableBodySetState;
  tableRows: Product[];
  index: number;
  switchButtonTabs: IswitchButtonTabs[];
  row: Product;
}

export interface IDiamondDetailSlider {
  dataTableBodyState: IDataTableBodyState;
  dataTableBodySetState: IDataTableBodySetState;
  tableRows: Product[];
  index: number;
  switchButtonTabs: IswitchButtonTabs[];
  row: any;
  footerButtonData: any;
  column: TableColumn;
}

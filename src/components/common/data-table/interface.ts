import {
  IErrorSetState,
  IModalSetState,
  Product,
  TableColumn,
} from '@/app/search/result/result-interface';
import { Dispatch, SetStateAction } from 'react';
import { ICheckboxSetState, ICheckboxState } from '../checkbox/interface';
import { IConfirmStoneSetState } from '../confirm-stone/interface';

export interface ICheckboxData {
  checkboxState?: ICheckboxState;
  checkboxSetState?: ICheckboxSetState;
}
export interface ICustomDataTableProps {
  tableRows: Product[];
  tableColumns: TableColumn[];
  checkboxData?: ICheckboxData;
  mainTableStyle?: string;
  selectionAllowed?: boolean;
  errorSetState: IErrorSetState;
  confirmStoneSetState?: IConfirmStoneSetState;
  modalSetState?: any;
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
  checkboxData?: ICheckboxData;
  errorSetState: IErrorSetState;
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

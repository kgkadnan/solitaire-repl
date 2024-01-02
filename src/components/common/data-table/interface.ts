import {
  IErrorSetState,
  IModalSetState,
  IProduct,
  ITableColumn
} from '@/app/search/result/result-interface';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { ICheckboxSetState, ICheckboxState } from '../checkbox/interface';
import {
  IConfirmStoneSetState,
  IConfirmStoneState
} from '../confirm-stone/interface';

export interface ICheckboxData {
  checkboxState?: ICheckboxState;
  checkboxSetState?: ICheckboxSetState;
}
export interface ICustomDataTableProps {
  tableRows: IProduct[];
  tableColumns: ITableColumn[];
  checkboxData?: ICheckboxData;
  mainTableStyle?: string;
  selectionAllowed?: boolean;
  errorSetState: IErrorSetState;
  confirmStoneSetState?: IConfirmStoneSetState;
  modalSetState?: {
    setDialogContent: Dispatch<SetStateAction<ReactNode | undefined>>;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
    setIsInputDialogOpen: Dispatch<SetStateAction<boolean>>;
    setIsSliderOpen: Dispatch<SetStateAction<boolean>>;
  };
  confirmStoneState?: IConfirmStoneState;
}

export interface IKeyLabelMapping {
  [key: string]: string;
}

export interface ITheadProps {
  selectionAllowed: boolean;
  checkboxData?: ICheckboxData;
  tableCol: ITableColumn[];
  rows: IProduct[];
}

export interface ITbodyProps {
  tableRows: IProduct[];
  selectionAllowed: boolean;
  handleClick?: (id: string) => void;
  isCheck?: string[];
  tableCol: ITableColumn[];
  checkboxData?: ICheckboxData;
  errorSetState: IErrorSetState;
  confirmStoneSetState?: any;
  modalSetState?: any;
  confirmStoneState?: IConfirmStoneState;
}
export interface ISwitchButtonTabs {
  id: string;
  displayButtonLabel: string;
  url?: string;
  iframeUrl?: string;
}
interface IDataTableBodyState {
  sliderData: IProduct[];
  activeTab: string;
  diamondDetailImageUrl: string;
  diamondDetailIframeUrl: string;
}

interface IDataTableBodySetState {
  setSliderData: Dispatch<SetStateAction<IProduct[]>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
  setDiamondDetailImageUrl: Dispatch<SetStateAction<string>>;
  setDiamondDetailIframeUrl: Dispatch<SetStateAction<string>>;
}

export interface IDetailCertificateSlider {
  dataTableBodyState: IDataTableBodyState;
  dataTableBodySetState: IDataTableBodySetState;
  tableRows: IProduct[];
  index: number;
  row: IProduct;
}

export interface IDetailImageSlider {
  dataTableBodyState: IDataTableBodyState;
  dataTableBodySetState: IDataTableBodySetState;
  tableRows: IProduct[];
  index: number;
  row: IProduct;
}

export interface IDiamondDetailSlider {
  dataTableBodyState: IDataTableBodyState;
  dataTableBodySetState: IDataTableBodySetState;
  tableRows: IProduct[];
  index: number;
  row: any;
  footerButtonData: any;
  column: ITableColumn;
  modalSetState: IModalSetState;
}

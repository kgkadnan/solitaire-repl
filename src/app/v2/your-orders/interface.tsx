import { IModalSetState } from '@/app/search/result/result-interface';

export interface IHeaderSearchBarProps {
  activeTab: string;
  handleSearch: any;
  search: any;
  handleClearInput: any;
}

export interface ITabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  recentConfirmCount: number;
  myInvoiceDataCount: number;
  previousConfirmCount: number;
}

export interface IFilterByDaysProps {
  filterFunction: any;
  radioState: string;
}

export interface IPageTitles {
  [key: string]: string;
}

export interface IMyDiamondsProps {
  data: any;
  handleCardClick: (id: string) => void;
  productPageDetail?: any;
  check?: string;
  setOffset?: (offset: number) => void;
  setLimit?: (limit: number) => void;
  limit?: number;
  modalSetState: IModalSetState;
}

export interface IMyDiamondsSheetContentProps {
  check: string | undefined;
  productPageDetail: any;
  rows: any[];
  tableColumns: any[];
  checkboxData: any;
  errorSetState: any;
  isError: boolean;
  errorText: string;
  downloadExcelFunction: () => void;
  modalSetState?: IModalSetState;
}

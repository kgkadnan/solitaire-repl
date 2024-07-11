import { IModalSetState } from '../search/interface';

export interface IHeaderSearchBarProps {
  activeTab: string;
  handleSearch: any;
  search: any;
  handleClearInput: any;
  setShowSuggestions?: any;
  showSuggestions?: boolean;
  handleGoSearch: any;
}

export interface ITabsProps {
  activeTab: string;
  setActiveTab: (_tab: string) => void;
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
  handleCardClick: (_id: string) => void;
  productPageDetail?: any;
  check?: string;
  setOffset?: (_offset: number) => void;
  setLimit?: (_limit: number) => void;
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

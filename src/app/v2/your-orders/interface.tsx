import { IModalSetState } from '@/app/search/result/result-interface';

export interface IHeaderSearchBarProps {
  activeTab: string;
  setPendinInvoiceSearchUrl: (url: string) => void;
  setActiveInvoiceSearchUrl: (url: string) => void;
  setInvoiceHistorySearchUrl: (url: string) => void;
}

export interface ITabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  recentConfirmCount: number;
  myInvoiceDataCount: number;
  previousConfirmCount: number;
}

export interface IFilterByDaysProps {
  activeTab: string;
  setPendingInvoiceSelectedDays: (selectedDays: string) => void;
  setActiveInvoiceSelectedDays: (selectedDays: string) => void;
  setInvoiceHistorySelectedDays: (selectedDays: string) => void;
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

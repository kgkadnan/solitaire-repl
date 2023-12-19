import { IModalSetState } from '@/app/search/result/result-interface';

export interface IHeaderSearchBarProps {
  activeTab: string;
  setRecentConfiramtionSearchUrl: (url: string) => void;
  setMyInvoiceSearchUrl: (url: string) => void;
  setPreviousConfirmationSearchUrl: (url: string) => void;
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
  setRecentConfirmationSelectedDays: (selectedDays: string) => void;
  setMyInvoiceSelectedDays: (selectedDays: string) => void;
  setPreviousConfirmationSelectedDays: (selectedDays: string) => void;
}

export interface PageTitles {
  [key: string]: string;
}

export interface MyDiamondsProps {
  data: any;
  handleCardClick: (id: string) => void;
  productPageDetail?: any;
  check?: string;
  setOffset?: (offset: number) => void;
  setLimit?: (limit: number) => void;
  limit?: number;
  modalSetState: IModalSetState;
}

export interface MyDiamondsSheetContentProps {
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

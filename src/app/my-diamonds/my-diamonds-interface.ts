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
import { PAGINATION_INTITAL_LIMIT } from '@/constants/business-logic';
import { useState } from 'react';

export const useCommonStateManagement = () => {
  // State variables for handling scroll, date, search, and data
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [recentConfiramtionSearchUrl, setRecentConfiramtionSearchUrl] =
    useState<string>('');
  const [myInvoiceSearchUrl, setMyInvoiceSearchUrl] = useState<string>('');
  const [previousConfirmationSearchUrl, setPreviousConfirmationSearchUrl] =
    useState<string>('');
  const [recentConfirmData, setRecentConfirmData] = useState([]);
  const [activeTab, setActiveTab] = useState<string>('Recent Confirmations');
  const [myInvoiceData, setMyInvoiceData] = useState([]);
  const [previousConfirmData, setPreviousConfirmData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(PAGINATION_INTITAL_LIMIT);
  const [recentConfirmationSelectedDays, setRecentConfirmationSelectedDays] =
    useState<string>('');
  const [myInvoiceSelectedDays, setMyInvoiceSelectedDays] =
    useState<string>('');
  const [
    previousConfirmationSelectedDays,
    setPreviousConfirmationSelectedDays
  ] = useState<string>('');

  return {
    commonState: {
      prevScrollPos,
      visible,
      recentConfiramtionSearchUrl,
      myInvoiceSearchUrl,
      previousConfirmationSearchUrl,
      recentConfirmData,
      activeTab,
      myInvoiceData,
      previousConfirmData,
      offset,
      limit,
      recentConfirmationSelectedDays,
      myInvoiceSelectedDays,
      previousConfirmationSelectedDays
    },
    commonSetState: {
      setPrevScrollPos,
      setVisible,
      setRecentConfiramtionSearchUrl,
      setMyInvoiceSearchUrl,
      setPreviousConfirmationSearchUrl,
      setRecentConfirmData,
      setActiveTab,
      setMyInvoiceData,
      setPreviousConfirmData,
      setOffset,
      setLimit,
      setRecentConfirmationSelectedDays,
      setMyInvoiceSelectedDays,
      setPreviousConfirmationSelectedDays
    }
  };
};

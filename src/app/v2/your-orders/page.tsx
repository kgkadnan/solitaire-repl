'use client';
import {
  ACTIVE_INVOICE,
  INVOICE_HISTORY,
  MAX_MY_INVOICE_LIMIT_COUNT,
  MAX_RECENT_CONFIRMATION_COUNT,
  PENDING_INVOICE
} from '@/constants/business-logic';
import {
  useCardMyInvoiceQuery,
  useCardPreviousConfirmationQuery,
  useCardRecentConfirmationQuery
} from '@/features/api/my-diamonds/my-diamond';
import { ManageLocales } from '@/utils/v2/translate';
import React, { useEffect, useState } from 'react';
import { HeaderSearchBar } from './components/search-bar';
import { FilterByDays } from './components/filter-by-days';
import icon from '@public/v2/assets/icons/my-diamonds/avatar.svg';
import Image from 'next/image';
import { formatNumberWithLeadingZeros } from '@/utils/format-number-withLeadingZeros';
import { formatCreatedAt } from '@/utils/format-date';
import arrow from '@public/v2/assets/icons/my-diamonds/Arrow.svg';
import Link from 'next/link';

const MyDiamonds = () => {
  const [activeTab, setActiveTab] = useState(PENDING_INVOICE);

  const [pendinInvoiceSearchUrl, setPendinInvoiceSearchUrl] = useState('');
  const [activeInvoiceSearchUrl, setActiveInvoiceSearchUrl] = useState('');
  const [invoiceHistorySearchUrl, setInvoiceHistorySearchUrl] = useState('');

  const [pendingInvoiceSelectedDays, setPendingInvoiceSelectedDays] =
    useState('');
  const [activeInvoiceSelectedDays, setActiveInvoiceSelectedDays] =
    useState('');
  const [invoiceHistorySelectedDays, setInvoiceHistorySelectedDays] =
    useState('');

  const [pendingInvoiceDataState, setPendingInvoiceDataState] = useState([]);
  const [activeInvoiceDataState, setActiveInvoiceDataState] = useState([]);
  const [invoiceHistoryDataState, setInvoiceHistoryDataState] = useState([]);
  // Query parameters for API request
  let resentConfiramtionStatus = 'pending';
  let resentConfiramtionInvoiceStatus = 'pending';
  let expand = 'items';
  let myInvoiceStatus = 'pending';
  let myInvoiceInvoiceStatus = 'available';
  let previousConfirmStatus = 'completed';
  let recentConfirmlimit = MAX_RECENT_CONFIRMATION_COUNT;
  let myInvoicelimit = MAX_MY_INVOICE_LIMIT_COUNT;

  // Fetch recent confirmation data
  const { data: pendingInvoicesData } = useCardRecentConfirmationQuery({
    resentConfiramtionStatus,
    resentConfiramtionInvoiceStatus,
    expand,
    recentConfiramtionSearchUrl: pendinInvoiceSearchUrl,
    recentConfirmlimit,
    recentConfirmationSelectedDays: pendingInvoiceSelectedDays
  });

  // Fetch my-invoice data
  const { data: activeInvoicesData } = useCardMyInvoiceQuery({
    myInvoiceStatus,
    myInvoiceInvoiceStatus,
    myInvoiceSearchUrl: activeInvoiceSearchUrl,
    myInvoicelimit,
    myInvoiceSelectedDays: activeInvoiceSelectedDays
  });

  // Fetch previous-confiramtion-data
  const { data: invoiceHistoryData } = useCardPreviousConfirmationQuery({
    // limit,
    // offset,
    previousConfirmStatus,
    previousConfirmationSearchUrl: invoiceHistorySearchUrl,
    previousConfirmationSelectedDays: invoiceHistorySelectedDays
  });

  // useEffect to update recentConfirmData when myDiamondRecentConfirmData changes
  useEffect(() => {
    setPendingInvoiceDataState(pendingInvoicesData?.orders);
  }, [pendingInvoicesData]);

  // useEffect to update recentConfirmData when myDiamondRecentConfirmData changes
  useEffect(() => {
    setActiveInvoiceDataState(activeInvoicesData?.orders);
  }, [activeInvoicesData]);

  useEffect(() => {
    setInvoiceHistoryDataState(invoiceHistoryData?.orders);
  }, [invoiceHistoryData]);

  const myDiamondsTabs = [
    {
      label: ManageLocales('app.myDiamonds.tabs.pendingInvoice'),
      status: PENDING_INVOICE,
      count: pendingInvoiceDataState?.length
    },
    {
      label: ManageLocales('app.myDiamonds.tabs.activeInvoice'),
      status: ACTIVE_INVOICE,
      count: activeInvoiceDataState?.length
    },
    {
      label: ManageLocales('app.myDiamonds.tabs.invoiceHistory'),
      status: INVOICE_HISTORY
    }
  ];
  const handleTabs = ({ tab }: { tab: string }) => {
    setActiveTab(tab);
  };

  const tabsData: any = {
    pendingInvoice: {
      keys: [
        { label: 'Order ID', accessor: 'display_id' },
        { label: 'Confirmation Date', accessor: 'created_at' },
        { label: 'Details', accessor: 'details' }
      ],
      data: pendingInvoiceDataState
    },
    activeInvoice: {
      keys: [
        { label: 'Invoice Number', accessor: 'invoice_id' },
        { label: 'Invoice Date', accessor: 'created_at' },
        { label: 'Tracking Details', accessor: 'delivery' },
        { label: 'Details', accessor: 'details' }
      ],
      data: activeInvoiceDataState
    },
    invoiceHistory: {
      keys: [
        { label: 'Invoice Number', accessor: 'invoice_id' },
        { label: 'Invoice Date', accessor: 'created_at' },
        { label: 'Tracking Details', accessor: 'delivery' },
        { label: 'Details', accessor: 'details' }
      ],
      data: invoiceHistoryDataState
    }
    // Add similar structures for other tabs here
  };

  // Get the keys and data for the active tab
  const { keys, data } = tabsData[activeTab] || { keys: [], data: [] };

  const renderCellContent = (accessor: string, value: any) => {
    switch (accessor) {
      case 'display_id':
        return (
          <>
            <Image src={icon} alt="icon" />
            <span>{formatNumberWithLeadingZeros(value)}</span>
          </>
        );
      case 'delivery':
        return (
          <Link
            href={value?.link}
            target="_blank"
            className="pl-1 text-infoMain cursor-pointer"
          >
            Track Order
          </Link>
        );
      case 'invoice_id':
        return (
          <>
            <Image src={icon} alt="icon" />
            <span>{value}</span>
          </>
        );
      case 'created_at':
        return <span>{formatCreatedAt(value)}</span>;
      case 'details':
        return (
          <div className="flex items-center cursor-pointer">
            <span>Show Details</span>
            <Image src={arrow} alt="arrow" />
          </div>
        );
      default:
        return <span>{value}</span>;
    }
  };
  return (
    <div>
      <div className="flex h-[81px] items-center">
        <p className="text-headingM font-medium text-neutral900">
          {ManageLocales('app.myDiamonds.yourOrders')}
        </p>
      </div>
      <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow">
        <div className="flex pr-[16px] py-[16px] justify-between items-center border-b-[1px] border-neutral200">
          <div className="flex border-b border-neutral200 w-[50%]  text-mMedium font-medium">
            {myDiamondsTabs.map(({ label, count, status }) => {
              return (
                <button
                  className={`px-[16px] py-[8px] ${
                    activeTab === status
                      ? 'text-neutral900 border-b-[2px] border-primaryMain'
                      : 'text-neutral600 border-b-[2px] border-transparent'
                  }`}
                  key={label}
                  onClick={() => handleTabs({ tab: status })}
                >
                  {label} {count && `(${count})`}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <HeaderSearchBar
              activeTab={activeTab}
              setPendinInvoiceSearchUrl={setPendinInvoiceSearchUrl}
              setActiveInvoiceSearchUrl={setActiveInvoiceSearchUrl}
              setInvoiceHistorySearchUrl={setInvoiceHistorySearchUrl}
            />
            <FilterByDays
              activeTab={activeTab}
              setPendingInvoiceSelectedDays={setPendingInvoiceSelectedDays}
              setActiveInvoiceSelectedDays={setActiveInvoiceSelectedDays}
              setInvoiceHistorySelectedDays={setInvoiceHistorySelectedDays}
            />
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          {/* header */}
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] text-mMedium h-[47px] border-b border-neutral-200 bg-neutral-50 text-neutral-700">
            {keys?.map(({ label }: any) => (
              <div key={label} className="p-4 text-left font-medium">
                {label}
              </div>
            ))}
          </div>
          {/* rows */}
          <div>
            {data?.map((items: any) => (
              <div
                key={items.order_id}
                className="grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] bg-white border-b border-neutral-200"
              >
                {keys?.map(({ accessor }: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center text-lRegular space-x-2 py-3 pr-3 pl-4 text-left text-gray-800"
                  >
                    {renderCellContent(accessor, items[accessor])}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDiamonds;

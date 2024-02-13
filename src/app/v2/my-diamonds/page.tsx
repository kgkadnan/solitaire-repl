'use client';
import SearchInputField from '@/components/v2/common/search-input/search-input';
import {
  MAX_MY_INVOICE_LIMIT_COUNT,
  MAX_RECENT_CONFIRMATION_COUNT
} from '@/constants/business-logic';
import {
  useCardMyInvoiceQuery,
  useCardPreviousConfirmationQuery,
  useCardRecentConfirmationQuery
} from '@/features/api/my-diamonds/my-diamond';
import { ManageLocales } from '@/utils/v2/translate';
import React, { useState } from 'react';
import { HeaderSearchBar } from './components/search-bar';

const MyDiamonds = () => {
  const [activeTab, setActiveTab] = useState(
    ManageLocales('app.myDiamonds.tabs.pendingInvoice')
  );
  const [pendinInvoiceSearchUrl, setPendinInvoiceSearchUrl] = useState('');
  const [activeInvoiceSearchUrl, setActiveInvoiceSearchUrl] = useState('');
  const [invoiceHistorySearchUrl, setInvoiceHistorySearchUrl] = useState('');
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
    // recentConfiramtionSearchUrl,
    recentConfirmlimit
    // recentConfirmationSelectedDays
  });

  // Fetch my-invoice data
  const { data: activeInvoicesData } = useCardMyInvoiceQuery({
    myInvoiceStatus,
    myInvoiceInvoiceStatus,
    // myInvoiceSearchUrl,
    myInvoicelimit
    // myInvoiceSelectedDays
  });

  // Fetch previous-confiramtion-data
  const { data: invoiceHistoryData } = useCardPreviousConfirmationQuery({
    // limit,
    // offset,
    previousConfirmStatus
    // previousConfirmationSearchUrl,
    // previousConfirmationSelectedDays
  });

  const myDiamondsTabs = [
    {
      label: ManageLocales('app.myDiamonds.tabs.pendingInvoice'),

      count: pendingInvoicesData?.length
    },
    {
      label: ManageLocales('app.myDiamonds.tabs.activeInvoice'),

      count: activeInvoicesData?.length
    },
    {
      label: ManageLocales('app.myDiamonds.tabs.invoiceHistory'),

      count: invoiceHistoryData?.length
    }
  ];
  const handleTabs = ({ tab }: { tab: string }) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex h-[81px] items-center">
        <p className="text-headingM font-medium text-neutral900">
          {ManageLocales('app.myDiamonds.yourOrders')}
        </p>
      </div>
      <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow">
        <div>
          <div className="flex pr-[16px] py-[16px] items-center border-b-[1px] border-neutral200">
            <div className="flex border-b border-neutral200 w-full  text-mMedium font-medium">
              {myDiamondsTabs.map(({ label, count }) => {
                return (
                  <button
                    className={`px-[16px] py-[8px] ${
                      activeTab === label
                        ? 'text-neutral900 border-b-[2px] border-primaryMain'
                        : 'text-neutral600'
                    }`}
                    key={label}
                    onClick={() => handleTabs({ tab: label })}
                  >
                    {label}({count})
                  </button>
                );
              })}
            </div>
            <div>
              <HeaderSearchBar
                activeTab={activeTab}
                setPendinInvoiceSearchUrl={setPendinInvoiceSearchUrl}
                setActiveInvoiceSearchUrl={setActiveInvoiceSearchUrl}
                setInvoiceHistorySearchUrl={setInvoiceHistorySearchUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDiamonds;

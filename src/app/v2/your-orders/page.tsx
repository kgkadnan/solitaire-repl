'use client';
import {
  ACTIVE_INVOICE,
  ACTIVE_INVOICE_BREADCRUMB_LABEL,
  INVOICE_HISTORY,
  INVOICE_HISTORY_BREADCRUMB_LABEL,
  MAX_MY_INVOICE_LIMIT_COUNT,
  MAX_RECENT_CONFIRMATION_COUNT,
  PENDING_INVOICE,
  PENING_INVOICE_BREADCRUMB_LABEL
} from '@/constants/business-logic';

import emptyOrderSvg from '@public/v2/assets/icons/empty-order.svg';
import {
  useCardMyInvoiceQuery,
  useCardPreviousConfirmationQuery,
  useCardRecentConfirmationQuery,
  useLazyGetProductDetailsQuery
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
import OrderDetail from './components/order-detail';
import EmptyScreen from '@/components/v2/common/empty-screen';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubRoutes } from '@/constants/v2/enums/routes';
import { DialogComponent } from '@/components/v2/common/dialog';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';

const MyDiamonds = () => {
  const router = useRouter();
  const pathName = useSearchParams().get('path');
  const detailId = useSearchParams().get('id');

  const [activeTab, setActiveTab] = useState(
    pathName === 'active' ? ACTIVE_INVOICE : PENDING_INVOICE
  );
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const [pendingInvoiceDataState, setPendingInvoiceDataState] = useState([]);
  const [activeInvoiceDataState, setActiveInvoiceDataState] = useState([]);
  const [invoiceHistoryDataState, setInvoiceHistoryDataState] = useState([]);

  const [showDetail, setShowDetail] = useState(false);
  const [productDetailData, setProductDetailData] = useState([]);
  const [radioState, setRadioState] = useState<string>('90days');

  const subRoute = useSearchParams().get('path');

  // State to manage the search input value
  const [search, setSearch] = useState<string>('');
  // Query parameters for API request
  let resentConfiramtionStatus = 'pending';
  let resentConfiramtionInvoiceStatus = 'pending';
  let expand = 'items';
  let myInvoiceStatus = 'pending';
  let myInvoiceInvoiceStatus = 'available';
  let previousConfirmStatus = 'completed';
  let recentConfirmlimit = MAX_RECENT_CONFIRMATION_COUNT;
  let myInvoicelimit = MAX_MY_INVOICE_LIMIT_COUNT;
  const singleExpand = 'items.variant.product%2Citems.variant.prices';

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [triggerProductDetail] = useLazyGetProductDetailsQuery();

  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;
  const { setIsDialogOpen } = modalSetState;

  // Fetch recent confirmation data
  const { data: pendingInvoicesData, isSuccess: isLoadingPendingInvoice } =
    useCardRecentConfirmationQuery({
      resentConfiramtionStatus,
      resentConfiramtionInvoiceStatus,
      expand,
      recentConfirmlimit
    });

  // Fetch my-invoice data
  const { data: activeInvoicesData, isSuccess: isLoadngActiveInvoice } =
    useCardMyInvoiceQuery({
      myInvoiceStatus,
      myInvoiceInvoiceStatus,
      myInvoicelimit
    });

  // Fetch previous-confiramtion-data
  const { data: invoiceHistoryData, isSuccess: isLoadingInvoiceHistory } =
    useCardPreviousConfirmationQuery({
      previousConfirmStatus
    });

  // useEffect to update recentConfirmData when myDiamondRecentConfirmData changes
  useEffect(() => {
    setPendingInvoiceDataState(pendingInvoicesData?.orders);
  }, [pendingInvoicesData]);

  useEffect(() => {
    if (detailId) {
      handleShowDetails(detailId);
    }
  }, [detailId]);

  // useEffect to update recentConfirmData when myDiamondRecentConfirmData changes
  useEffect(() => {
    setActiveInvoiceDataState(activeInvoicesData?.orders);
  }, [activeInvoicesData]);

  useEffect(() => {
    setInvoiceHistoryDataState(invoiceHistoryData?.orders);
  }, [invoiceHistoryData]);

  useEffect(() => {
    if (subRoute === 'recent-confirmations') {
      setActiveTab(PENDING_INVOICE);
    } else if (subRoute === 'active-invoice') {
      setActiveTab(ACTIVE_INVOICE);
    }
  }, []);

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
      status: INVOICE_HISTORY,
      count: invoiceHistoryDataState?.length
    }
  ];
  const handleTabs = ({ tab }: { tab: string }) => {
    setActiveTab(tab);
    setSearch('');
    setPendingInvoiceDataState(pendingInvoicesData?.orders);
    setInvoiceHistoryDataState(invoiceHistoryData?.orders);
    setActiveInvoiceDataState(activeInvoicesData?.orders);
    setRadioState('90days');
    setShowSuggestions(false);
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
        // { label: 'Tracking Details', accessor: 'delivery' },
        { label: 'Details', accessor: 'details' }
      ],
      data: activeInvoiceDataState
    },
    invoiceHistory: {
      keys: [
        { label: 'Invoice Number', accessor: 'invoice_id' },
        { label: 'Invoice Date', accessor: 'created_at' },
        // { label: 'Tracking Details', accessor: 'delivery' },
        { label: 'Details', accessor: 'details' }
      ],
      data: invoiceHistoryDataState
    }
    // Add similar structures for other tabs here
  };

  // Get the keys and data for the active tab
  const { keys, data } = tabsData[activeTab] || { keys: [], data: [] };

  const handleShowDetails = (itemId: string) => {
    setShowDetail(true);
    triggerProductDetail({ id: itemId, singleExpand }).then(res => {
      setProductDetailData(res.data.order);
    });
  };

  const goBackToListView = () => {
    setShowDetail(false);
    setProductDetailData([]);
  };

  const handleSearch = (e: any) => {
    let inputValue = e.target.value;
    inputValue = inputValue.toLowerCase();
    setShowSuggestions(true);
    setSearch(inputValue);

    if (activeTab === PENDING_INVOICE) {
      const filteredData = pendingInvoiceDataState.filter((item: any) => {
        const formattedValue = formatNumberWithLeadingZeros(item.display_id);
        return (
          String(item.display_id).includes(inputValue) ||
          formattedValue.includes(inputValue)
        );
      });
      setPendingInvoiceDataState(filteredData);
    } else if (activeTab === ACTIVE_INVOICE) {
      const filteredData = activeInvoiceDataState.filter((item: any) =>
        String(item.invoice_id).toLowerCase().includes(inputValue)
      );
      setActiveInvoiceDataState(filteredData);
    } else {
      const filteredData = invoiceHistoryDataState.filter((item: any) =>
        String(item.invoice_id).toLowerCase().includes(inputValue)
      );
      setInvoiceHistoryDataState(filteredData);
    }

    if (!inputValue) {
      setPendingInvoiceDataState(pendingInvoicesData?.orders);
      setInvoiceHistoryDataState(invoiceHistoryData?.orders);
      setActiveInvoiceDataState(activeInvoicesData?.orders);
    }
  };

  const handleClearInput = () => {
    setSearch('');
    setPendingInvoiceDataState(pendingInvoicesData?.orders);
    setInvoiceHistoryDataState(invoiceHistoryData?.orders);
    setActiveInvoiceDataState(activeInvoicesData?.orders);
  };

  const filterByDate = (
    data: any[],
    filterOption: '7days' | '30days' | '90days'
  ): any => {
    const currentDate = new Date();
    let startDate: Date;

    switch (filterOption) {
      case '7days':
        startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30days':
        startDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90days':
        startDate = new Date(currentDate.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(0); // Default to epoch date if filter option is invalid
    }

    return data.filter((item: any) => {
      const itemDate = new Date(item.created_at);
      return itemDate >= startDate && itemDate <= currentDate;
    });
  };

  const filterFunction = (value: '7days' | '30days' | '90days') => {
    setRadioState(value);
    switch (activeTab) {
      case PENDING_INVOICE:
        setPendingInvoiceDataState(
          pendingInvoicesData &&
            filterByDate(pendingInvoicesData?.orders, value)
        );
        break;
      case ACTIVE_INVOICE:
        setActiveInvoiceDataState(
          activeInvoicesData && filterByDate(activeInvoicesData?.orders, value)
        );
        break;
      case INVOICE_HISTORY:
        setInvoiceHistoryDataState(
          invoiceHistoryData && filterByDate(invoiceHistoryData?.orders, value)
        );
        break;
      default:
        break;
    }
  };

  const renderCellContent = (accessor: string, value: any) => {
    switch (accessor) {
      case 'display_id':
        return (
          <>
            <Image src={icon} alt="icon" />
            <span>{formatNumberWithLeadingZeros(value[accessor])}</span>
          </>
        );
      // case 'delivery':
      //   return (
      //     <Link
      //       href={value[accessor]?.link}
      //       target="_blank"
      //       className="pl-1 text-infoMain cursor-pointer"
      //     >
      //       Track Order
      //     </Link>
      //   );
      case 'invoice_id':
        return (
          <>
            <Image src={icon} alt="icon" />
            <span>{value[accessor]}</span>
          </>
        );
      case 'created_at':
        return <span>{formatCreatedAt(value[accessor])}</span>;
      case 'details':
        return (
          <button
            className="flex items-center cursor-pointer"
            onClick={() => handleShowDetails(value?.id)}
          >
            <span>Show Details</span>
            <Image src={arrow} alt="arrow" />
          </button>
        );
      default:
        return <span>{value[accessor]}</span>;
    }
  };

  const renderContent = () => {
    if (showDetail) {
      switch (activeTab) {
        case PENDING_INVOICE:
          return (
            <OrderDetail
              productDetailData={productDetailData}
              goBackToListView={goBackToListView}
              breadCrumLabel={PENING_INVOICE_BREADCRUMB_LABEL}
              modalSetState={modalSetState}
              setIsLoading={setIsLoading}
            />
          );
        case ACTIVE_INVOICE:
          return (
            <OrderDetail
              productDetailData={productDetailData}
              goBackToListView={goBackToListView}
              breadCrumLabel={ACTIVE_INVOICE_BREADCRUMB_LABEL}
              modalSetState={modalSetState}
              setIsLoading={setIsLoading}
            />
          );
        case INVOICE_HISTORY:
          return (
            <OrderDetail
              productDetailData={productDetailData}
              goBackToListView={goBackToListView}
              breadCrumLabel={INVOICE_HISTORY_BREADCRUMB_LABEL}
              modalSetState={modalSetState}
              setIsLoading={setIsLoading}
            />
          );
        // Add more cases as needed for other tabs
        default:
          return <div>Unknown tab or error...</div>;
      }
    } else {
      // Render the main list view if not showing detail
      return (
        <>
          {' '}
          <div className="flex pr-[16px] py-[16px] justify-between items-center border-b-[1px] border-neutral200">
            <div className="flex  w-[50%]  text-mMedium font-medium h-[40px]">
              {myDiamondsTabs.map(({ label, count, status }) => {
                return (
                  <button
                    className={`px-[16px] py-[8px] ${
                      activeTab === status
                        ? 'text-neutral900 border-b-[2px] border-primaryMain'
                        : 'text-neutral600 border-b-[1px] border-neutral200'
                    }`}
                    key={label}
                    onClick={() => handleTabs({ tab: status })}
                  >
                    {label} {count > 0 && `(${count})`}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <HeaderSearchBar
                activeTab={activeTab}
                handleSearch={handleSearch}
                search={search}
                handleClearInput={handleClearInput}
                setShowSuggestions={setShowSuggestions}
                showSuggestions={showSuggestions}
              />
              <FilterByDays
                filterFunction={filterFunction}
                radioState={radioState}
              />
            </div>
          </div>
          {data?.length > 0 ? (
            <div className="max-w-full overflow-x-auto">
              {/* header */}
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] text-mMedium h-[47px] border-b border-neutral-200 bg-neutral-50 text-neutral700">
                {keys?.map(({ label }: any) => (
                  <div key={label} className="p-4 text-left font-medium">
                    {label}
                  </div>
                ))}
              </div>
              {/* rows */}

              {data?.map((items: any) => (
                <div
                  key={items.order_id}
                  onClick={() => {
                    handleShowDetails(items?.id);
                  }}
                  className="cursor-pointer grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] bg-neutral0 border-b border-neutral-200 hover:bg-neutral-50"
                >
                  {keys?.map(({ accessor }: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center text-lRegular space-x-2 py-3 pr-3 pl-4 text-left text-gray-800"
                    >
                      {renderCellContent(accessor, items)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            (!isLoading ||
              isLoadingInvoiceHistory ||
              isLoadingPendingInvoice ||
              isLoadngActiveInvoice) && (
              <div className="min-h-[65vh] h-[65vh]">
                <EmptyScreen
                  label="Search Diamonds"
                  message="Looks like you haven't placed any orders yet. Let’s place some orders!"
                  onClickHandler={() =>
                    router.push(`/v2/search?active-tab=${SubRoutes.NEW_SEARCH}`)
                  }
                  imageSrc={emptyOrderSvg}
                />
              </div>
            )
          )}
        </>
      );
    }
  };

  return (
    <div className="relative mb-[20px]">
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div className="flex  py-[8px] items-center">
        <p className="text-lMedium font-medium text-neutral900">
          {showDetail
            ? activeTab === PENDING_INVOICE
              ? ManageLocales('app.yourOrder.header.pendingInvoiceDetails')
              : activeTab === ACTIVE_INVOICE
              ? ManageLocales('app.yourOrder.header.activeInvoiceDetails')
              : activeTab === INVOICE_HISTORY &&
                ManageLocales('app.yourOrder.header.invoicesHistoryDetails')
            : ManageLocales('app.myDiamonds.yourOrders')}
        </p>
      </div>
      <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow">
        {isLoading ||
        !isLoadingInvoiceHistory ||
        !isLoadingPendingInvoice ||
        !isLoadngActiveInvoice ? (
          <CustomKGKLoader />
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default MyDiamonds;

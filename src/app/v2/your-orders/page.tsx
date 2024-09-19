'use client';
import {
  IN_TRANSIT,
  ACTIVE_INVOICE_BREADCRUMB_LABEL,
  PAST,
  PAST_INVOICE_BREADCRUMB_LABEL,
  MAX_MY_INVOICE_LIMIT_COUNT,
  MAX_RECENT_CONFIRMATION_COUNT,
  PENDING,
  PENING_INVOICE_BREADCRUMB_LABEL,
  DASHBOARD_BREADCRUMB_LABEL
} from '@/constants/business-logic';
import infoIcon from '@public/v2/assets/icons/info-icon.svg';
import emptyOrderSvg from '@public/v2/assets/icons/empty-order.svg';
import {
  useLazyCardMyInvoiceQuery,
  useLazyCardPreviousConfirmationQuery,
  useLazyCardRecentConfirmationQuery,
  useLazyGetProductDetailsQuery,
  useLazySearchPendingOrderByKeywordQuery
} from '@/features/api/your-order';
import { ManageLocales } from '@/utils/v2/translate';
import React, { useEffect, useState } from 'react';
import { HeaderSearchBar } from './components/search-bar';
import icon from '@public/v2/assets/icons/my-diamonds/avatar.svg';
import Image from 'next/image';
import { formatNumberWithLeadingZeros } from '@/utils/format-number-withLeadingZeros';
import { formatCreatedAt } from '@/utils/format-date';
import arrow from '@public/v2/assets/icons/my-diamonds/Arrow.svg';
import OrderDetail from './components/order-detail';
import EmptyScreen from '@/components/v2/common/empty-screen';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubRoutes } from '@/constants/v2/enums/routes';
import { DialogComponent } from '@/components/v2/common/dialog';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
// import logger from 'logging/log-util';
import { DatePickerWithRange } from '@/components/v2/common/date-picker';
import { DateRange } from 'react-day-picker';
import YourOrderSkeleton from '@/components/v2/skeleton/your-order';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { Skeleton } from '@mui/material';
import { kycStatus } from '@/constants/enums/kyc';
import { Events } from '@/constants/enums/event';

interface IDataItem {
  id: number;
  created_at: string; // Assuming created_at is a string in ISO format
}

const MyDiamonds = () => {
  const router = useRouter();
  const pathName = useSearchParams().get('path');
  const detailId = useSearchParams().get('id');
  const [tooltip, setTooltip] = useState({
    show: false,
    content: '',
    position: { left: 0 }
  });

  const [columnTooltip, setColumnTooltip] = useState({
    show: false,
    content: '',
    position: { left: 0 }
  });

  const [activeTab, setActiveTab] = useState(
    pathName === 'inTransit' ? IN_TRANSIT : PENDING
  );
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const [pendingDataState, setPendingDataState] = useState<any>(undefined);
  const [inTransitDataState, setInTransitDataState] = useState<any>(undefined);
  const [pastDataState, setPastDataState] = useState<any>(undefined);

  const [date, setDate] = useState<DateRange | undefined>();

  const [showDetail, setShowDetail] = useState(false);
  const [productDetailData, setProductDetailData] = useState([]);

  let isNudge = localStorage.getItem('show-nudge')! === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);

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
  const [triggerSearchByKeyword] = useLazySearchPendingOrderByKeywordQuery();
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;
  useEffect(() => {
    triggerPendingInvoiceData({
      resentConfiramtionStatus,
      resentConfiramtionInvoiceStatus,
      expand,
      recentConfirmlimit
    })
      .unwrap()
      .then(res => {
        setPendingDataState(res?.orders);
        setIsLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setIsLoading(false);
      });
    setIsLoading(false);
  }, [
    resentConfiramtionStatus,
    resentConfiramtionInvoiceStatus,
    expand,
    recentConfirmlimit
  ]);

  useEffect(() => {
    triggerActiveInvoice({
      myInvoiceStatus,
      myInvoiceInvoiceStatus,
      myInvoicelimit
    })
      .unwrap()
      .then(res => {
        setInTransitDataState(res?.orders);
        setIsLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setIsLoading(false);
      });
    setIsLoading(false);
  }, [myInvoiceStatus, myInvoiceInvoiceStatus, myInvoicelimit]);

  useEffect(() => {
    triggerInvoiceHistory({ previousConfirmStatus })
      .unwrap()
      .then(res => {
        setPastDataState(res?.orders);
        setIsLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setIsLoading(false);
      });
  }, [previousConfirmStatus]);
  const [triggerPendingInvoiceData, { data: pendingInvoicesData }] =
    useLazyCardRecentConfirmationQuery({});
  const [triggerActiveInvoice, { data: activeInvoicesData }] =
    useLazyCardMyInvoiceQuery({});

  const [triggerInvoiceHistory, { data: invoiceHistoryData }] =
    useLazyCardPreviousConfirmationQuery({});

  useEffect(() => {
    if (detailId) {
      handleShowDetails(detailId);
    }
  }, [detailId]);

  useEffect(() => {
    if (pathName === 'recent-confirmations') {
      setActiveTab(PENDING);
    } else if (pathName === 'active-invoice') {
      setActiveTab(IN_TRANSIT);
    } else if (pathName === IN_TRANSIT) {
      setActiveTab(IN_TRANSIT);
    } else if (pathName === PENDING) {
      setActiveTab(PENDING);
    } else if (pathName === PAST) {
      setActiveTab(PAST);
    }
  }, []);

  const myDiamondsTabs = [
    {
      label: ManageLocales('app.myDiamonds.tabs.pending'),
      status: PENDING,
      count: pendingDataState ? pendingDataState?.length : 0,
      info: 'Your order is being processed by the sales team.'
    },
    {
      label: ManageLocales('app.myDiamonds.tabs.inTransit'),
      status: IN_TRANSIT,
      count: inTransitDataState?.length,
      info: 'Your order has been confirmed and your invoice has been generated by the sales team.'
    },
    {
      label: ManageLocales('app.myDiamonds.tabs.past'),
      status: PAST,
      count: pastDataState?.length
    }
  ];
  const handleTabs = ({ tab }: { tab: string }) => {
    setActiveTab(tab);
    setSearch('');
    setDate(undefined);
    setPendingDataState(pendingInvoicesData?.orders);
    setPastDataState(invoiceHistoryData?.orders);
    setInTransitDataState(activeInvoicesData?.orders);
    setShowSuggestions(false);
  };

  const tabsData: any = {
    pending: {
      keys: [
        { label: 'Order ID', accessor: 'display_id' },
        { label: 'Confirmation Date', accessor: 'created_at' },
        { label: 'Order Request Status', accessor: 'status' },
        { label: 'Details', accessor: 'details' }
      ],
      data: pendingDataState
    },
    inTransit: {
      keys: [
        { label: 'Order ID', accessor: 'display_id' },
        { label: 'Invoice Number', accessor: 'invoice_id' },
        { label: 'Invoice Date', accessor: 'created_at' },
        { label: 'Details', accessor: 'details' }
      ],
      data: inTransitDataState
    },
    past: {
      keys: [
        { label: 'Order ID', accessor: 'display_id' },
        { label: 'Invoice Number', accessor: 'invoice_id' },
        { label: 'Invoice Date', accessor: 'created_at' },
        { label: 'Details', accessor: 'details' }
      ],
      data: pastDataState
    }
  };

  // Get the keys and data for the active tab
  const { keys, data } = tabsData[activeTab];

  const handleShowDetails = (itemId: string) => {
    setShowDetail(true);
    triggerProductDetail({ id: itemId, singleExpand }).then(res => {
      setProductDetailData(res.data.order);
    });
  };

  const goBackToListView = () => {
    if (detailId) {
      router.push('/v2');
    } else {
      setShowDetail(false);
      setProductDetailData([]);
    }
  };

  const handleSearch = (e: any) => {
    setDate(undefined);
    let inputValue = e.target.value;
    inputValue = inputValue.toLowerCase();
    setShowSuggestions(true);
    setSearch(inputValue);
    if (activeTab === IN_TRANSIT) {
      const filteredData = inTransitDataState?.filter((item: any) =>
        String(item.invoice_id).toLowerCase().includes(inputValue)
      );
      setInTransitDataState(filteredData);
    } else {
      const filteredData = pastDataState?.filter((item: any) =>
        String(item.invoice_id).toLowerCase().includes(inputValue)
      );
      setPastDataState(filteredData);
    }

    if (!inputValue) {
      setPendingDataState(pendingInvoicesData?.orders);
      setPastDataState(invoiceHistoryData?.orders);
      setInTransitDataState(activeInvoicesData?.orders);
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.key === Events.ENTER && activeTab === PENDING) {
      handleGoSearch();
    }
  };
  const handleGoSearch = () => {
    if (activeTab === PENDING) {
      setIsLoading(true);
      triggerSearchByKeyword({ keyword: search })
        .unwrap()
        .then(res => {
          setPendingDataState(res?.orders);

          setIsLoading(false);
        })
        .catch(e => {
          console.log(e), setIsLoading(false);
        });
    }

    if (!search) {
      setPendingDataState(pendingInvoicesData?.orders);
    }
  };

  const handleClearInput = () => {
    setSearch('');
    setPendingDataState(pendingInvoicesData?.orders);
    setPastDataState(invoiceHistoryData?.orders);
    setInTransitDataState(activeInvoicesData?.orders);
  };
  const filterDataByDate = (
    data: IDataItem[],
    fromDate: Date,
    toDate?: Date
  ): IDataItem[] => {
    return data.filter((item: IDataItem) => {
      const itemDate: Date = new Date(item.created_at);

      if (toDate) {
        // Set toDate to the end of the day in local time to include the entire day
        const toDateEnd = new Date(toDate);
        toDateEnd.setHours(23, 59, 59, 999);

        // Ensure itemDate is within the range [fromDate, toDateEnd], inclusive
        return itemDate >= fromDate && itemDate <= toDateEnd;
      } else {
        // If toDate is not provided, include items from the fromDate onwards
        return itemDate >= fromDate;
      }
    });
  };
  const handleApplyFilter = (date: any, reset: string) => {
    setSearch('');
    const fromDate = new Date(date.from);
    const toDate = new Date(date.to);
    switch (activeTab) {
      case PENDING:
        if (reset.length > 0) {
          setPendingDataState(pendingInvoicesData?.orders);
        } else {
          setPendingDataState(
            pendingInvoicesData &&
              filterDataByDate(
                pendingInvoicesData?.orders,
                fromDate,
                date.to ? toDate : undefined
              )
          );
        }

        break;
      case IN_TRANSIT:
        if (reset.length > 0) {
          setInTransitDataState(activeInvoicesData?.orders);
        } else {
          setInTransitDataState(
            activeInvoicesData &&
              filterDataByDate(
                activeInvoicesData?.orders,
                fromDate,
                date.to ? toDate : undefined
              )
          );
        }

        break;
      case PAST:
        if (reset.length > 0) {
          setPastDataState(invoiceHistoryData?.orders);
        } else {
          setPastDataState(
            invoiceHistoryData &&
              filterDataByDate(
                invoiceHistoryData?.orders,
                fromDate,
                date.to ? toDate : undefined
              )
          );
        }

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

      case 'status':
        return (
          <>
            {value[accessor] === 'pending' ? (
              <div className="text-mRegular px-[6px] py-[4px] rounded-[4px] border-successBorder  bg-successSurface text-successMain border-solid border-[1px] ">
                Success
              </div>
            ) : value[accessor] === 'canceled' ? (
              <div className="text-mRegular px-[6px] py-[4px] rounded-[4px] border-dangerBorder bg-dangerSurface text-dangerMain border-solid border-[1px] ">
                Failed
              </div>
            ) : value[accessor] === 'requires_action' ? (
              <div className="text-mRegular px-[6px] py-[4px] rounded-[4px] border-lengendMemoBorder bg-legendMemoFill text-legendMemo border-solid border-[1px] ">
                Processing
              </div>
            ) : (
              value[accessor]
            )}
          </>
        );

      case 'invoice_id':
        return (
          <>
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
        case PENDING:
          return (
            <OrderDetail
              productDetailData={productDetailData}
              goBackToListView={goBackToListView}
              breadCrumLabel={
                detailId
                  ? DASHBOARD_BREADCRUMB_LABEL
                  : PENING_INVOICE_BREADCRUMB_LABEL
              }
              identifier={PENING_INVOICE_BREADCRUMB_LABEL}
              modalSetState={modalSetState}
              setIsLoading={setIsLoading}
              router={router}
            />
          );
        case IN_TRANSIT:
          return (
            <OrderDetail
              productDetailData={productDetailData}
              goBackToListView={goBackToListView}
              breadCrumLabel={
                detailId
                  ? DASHBOARD_BREADCRUMB_LABEL
                  : ACTIVE_INVOICE_BREADCRUMB_LABEL
              }
              identifier={ACTIVE_INVOICE_BREADCRUMB_LABEL}
              modalSetState={modalSetState}
              setIsLoading={setIsLoading}
              router={router}
            />
          );
        case PAST:
          return (
            <OrderDetail
              productDetailData={productDetailData}
              goBackToListView={goBackToListView}
              breadCrumLabel={PAST_INVOICE_BREADCRUMB_LABEL}
              modalSetState={modalSetState}
              setIsLoading={setIsLoading}
              identifier={PAST_INVOICE_BREADCRUMB_LABEL}
              router={router}
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
            <div className="flex relative w-[50%]   text-mMedium font-medium h-[40px]">
              {myDiamondsTabs.map(({ label, count, status, info }) => {
                return (
                  <div
                    key={label}
                    className={`flex gap-1 items-center px-[12px] py-[8px] relative  ${
                      activeTab === status
                        ? 'text-neutral900 border-b-[2px] border-primaryMain'
                        : 'text-neutral600 border-b-[2px] border-neutral200'
                    }`}
                  >
                    <button
                      className={``}
                      onClick={() => handleTabs({ tab: status })}
                    >
                      {label} {count > 0 && `(${count})`}
                    </button>
                    {info && info?.length > 0 && (
                      <button
                        onMouseEnter={e => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({
                            show: true,
                            content: info,
                            position: {
                              left:
                                rect.left + window.scrollX + rect.width / 300 // Adjust left position to center above the element
                            }
                          });
                        }}
                        onMouseLeave={() => {
                          setTooltip({
                            show: false,
                            content: '',
                            position: { left: 0 }
                          });
                        }}
                      >
                        <Image src={infoIcon} alt="infoIcon" />
                      </button>
                    )}
                  </div>
                );
              })}
              {tooltip.show && (
                <div
                  className={`absolute z-[1] bg-[#ECF2FC] w-[320px] border-[1px] border-[#B6CFF3] rounded-[8px] p-4 text-[#475467] top-[35px] gap-2 `}
                  style={{
                    left: `${tooltip.position.left}px`,

                    transform: 'translateX(-30%)' // Center the tooltip above the element
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      <Image src={infoIcon} alt="volume discount info" />{' '}
                      <p className="text-neutral900 font-medium text-mMedium">
                        Information
                      </p>
                    </div>
                    <p>{tooltip.content}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <HeaderSearchBar
                activeTab={activeTab}
                handleSearch={handleSearch}
                search={search}
                handleClearInput={handleClearInput}
                setShowSuggestions={setShowSuggestions}
                showSuggestions={showSuggestions}
                handleGoSearch={handleGoSearch}
                handleKeyDown={handleKeyDown}
              />

              <DatePickerWithRange
                handleApplyFilter={handleApplyFilter}
                setDate={setDate}
                date={date}
              />
            </div>
          </div>
          {data?.length > 0 ? (
            <div className="max-w-full overflow-x-auto">
              {/* header */}
              <div className=" relative grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] text-mMedium h-[47px] border-b  border-neutral-200 bg-neutral-50 text-neutral700">
                {keys?.map(({ label }: any) => (
                  <div key={label} className="flex ">
                    <div className="py-4 pl-4 pr-1 text-left font-medium">
                      {label}
                    </div>
                    {label === 'Order Request Status' && (
                      <button
                        onMouseEnter={e => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setColumnTooltip({
                            show: true,
                            content:
                              'This status shows whether your order request is successful or failed.',
                            position: {
                              left:
                                rect.left + window.scrollX + rect.width / 300 // Adjust left position to center above the element
                            }
                          });
                        }}
                        onMouseLeave={() => {
                          setColumnTooltip({
                            show: false,
                            content: '',
                            position: { left: 0 }
                          });
                        }}
                      >
                        <Image src={infoIcon} alt="infoIcon" />
                      </button>
                    )}
                  </div>
                ))}
                {columnTooltip.show && (
                  <div
                    className={`absolute bg-[#ECF2FC] w-[320px] border-[1px] border-[#B6CFF3] rounded-[8px] p-4 text-[#475467] top-[35px] gap-2 `}
                    style={{
                      left: `${columnTooltip.position.left}px`,

                      transform: 'translateX(-30%)' // Center the columnTooltip above the element
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-1">
                        <Image src={infoIcon} alt="volume discount info" />{' '}
                        <p className="text-neutral900 font-medium text-mMedium">
                          Information
                        </p>
                      </div>
                      <p>{columnTooltip.content}</p>
                    </div>
                  </div>
                )}
              </div>
              {/* rows */}

              {data?.map((items: any, index: number) => (
                <div
                  key={items.order_id}
                  onClick={() => {
                    handleShowDetails(items?.id);
                  }}
                  className={`cursor-pointer grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] bg-neutral0   border-neutral-200 hover:bg-neutral-50 ${
                    index >= data.length - 1 ? 'rounded-[8px]' : 'border-b'
                  }`}
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
            <div className="min-h-[73vh] h-[65vh]">
              <EmptyScreen
                label="Search Diamonds"
                onClickHandler={() =>
                  router.push(`/v2/search?active-tab=${SubRoutes.NEW_SEARCH}`)
                }
                contentReactNode={
                  <p className="text-neutral900  w-[17%] text-center">
                    Looks like you haven't placed any orders yet. Let’s place
                    some orders!
                  </p>
                }
                imageSrc={emptyOrderSvg}
              />
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div
      className={`relative mb-[20px] ${
        isNudge &&
        (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
          isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
          ? ''
          : 'h-[89vh]'
      } `}
    >
      <DialogComponent dialogContent={dialogContent} isOpens={isDialogOpen} />
      {isLoading && <CustomKGKLoader />}
      <div className="flex  py-[8px] items-center">
        <p className="text-lMedium font-medium text-neutral900">
          {showDetail ? (
            activeTab === PENDING ? (
              ManageLocales('app.yourOrder.header.pendingInvoiceDetails')
            ) : activeTab === IN_TRANSIT ? (
              ManageLocales('app.yourOrder.header.activeInvoiceDetails')
            ) : (
              activeTab === PAST &&
              ManageLocales('app.yourOrder.header.pastInvoicesDetails')
            )
          ) : data === undefined ? (
            <Skeleton
              variant="rectangular"
              height={'24px'}
              width={'92px'}
              animation="wave"
              sx={{ bgcolor: 'var(--neutral-200)' }}
            />
          ) : (
            ManageLocales('app.myDiamonds.yourOrders')
          )}
        </p>
      </div>
      <div className="border-[1px] border-neutral200 rounded-[8px]">
        {data === undefined ? <YourOrderSkeleton /> : renderContent()}
      </div>
    </div>
  );
};

export default MyDiamonds;

'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import BidToBuyDataTable from './components/data-table';
import {
  RenderCarat,
  RenderDiscount,
  RenderDetails,
  RenderLab,
  RednderLocation,
  RenderShape,
  RenderMeasurements,
  RenderTracerId,
  RenderNewArrivalPrice,
  RenderNewArrivalPricePerCarat,
  RenderCartLotId,
  RenderBidDate,
  DiscountWithCross,
  RenderNumericFields,
  RenderBidDiscount,
  RenderBidNumericFields
} from '@/components/v2/common/data-table/helpers/render-cell';
import noImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import Tooltip from '@/components/v2/common/tooltip';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { columnHeaders } from './constant';
import CountdownTimer from '@components/v2/common/timer/index';
import { useLazyGetBidToBuyHistoryQuery } from '@/features/api/dashboard';

import { DialogComponent } from '@/components/v2/common/dialog';
import ActionButton from '@/components/v2/common/action-button';
import {
  MRT_RowSelectionState,
  MRT_SortingState,
  MRT_TablePagination
} from 'material-react-table';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';
import CommonPoppup from '../login/component/common-poppup';
import BiddingSkeleton from '@/components/v2/skeleton/bidding';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';

import useValidationStateManagement from '../search/hooks/validation-state-management';
import useFormStateManagement from '../search/form/hooks/form-state';
import Form from '../search/form/form';
import { MatchRoutes, SubRoutes } from '@/constants/v2/enums/routes';
import useNumericFieldValidation from '../search/form/hooks/numeric-field-validation-management';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import pako from 'pako';
import {
  useDeleteBidMutation,
  useLazyGetAllBidStonesQuery
} from '@/features/api/product';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';
import GemTracPage from '@/components/v2/common/gem-trac';
import { useLazyGetGemTracQuery } from '@/features/api/gem-trac';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/vector.svg';
import tick from '@public/v2/assets/icons/stepper/completed.svg';
import Image from 'next/image';
import chevronDown from '@public/v2/assets/icons/dashboard/chevron-down.svg';
import chevronUp from '@public/v2/assets/icons/dashboard/chevron-up.svg';
import {
  useLazyGetRequestCallBackTimeSlotsQuery,
  useReuestCallBackMutation
} from '@/features/api/request-call-back';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';
import { ManageLocales } from '@/utils/v2/translate';
import { dashboardResultPage } from '@/features/dashboard/dashboard-slice';
export interface IBidValues {
  [key: string]: number;
}

const BidToBuy = () => {
  const router = useRouter();
  const shouldSkipCleanup = useRef(false);
  const dispatch = useAppDispatch();
  const filterData: any = useAppSelector(state => state.filterBidToBuy);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [detailImageData, setDetailImageData] = useState<any>({});
  const [validImages, setValidImages] = useState<any>([]);
  const pathName = useSearchParams().get('path');
  const getActiveTabParam = useSearchParams().get('active-bid-tab');
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [searchLoading, setSearchLoading] = useState(false);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [isTabSwitch, setIsTabSwitch] = useState(false); // State to track

  const [bidValues, setBidValues] = useState<IBidValues>({});

  // const [checkStatus, setCheckStatus] = useState(false);
  const [isGemTrac, setIsGemTrac] = useState(false);
  const [gemTracData, setGemTracData] = useState([]);
  const [triggerGemTracApi] = useLazyGetGemTracQuery({});

  const { setSearchUrl, searchUrl } = useValidationStateManagement();
  const { state, setState, carat } = useFormStateManagement();
  const [isAddDemand, setIsAddDemand] = useState(false);
  const formErrorState = useNumericFieldValidation();
  const [isBidUnlockPricingPopup, setIsBidUnlockPricingPopup] = useState(false);
  const [requestCallTimeSlots, setRequestCallTimeSlots] = useState<any>({});

  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState('');

  const dashboardResultPageData = useAppSelector(
    state => state.dashboardResultPage
  );

  const handleSelectData = ({ date }: { date: string }) => {
    if (Number(date) !== selectedDate) {
      setSelectedDate(Number(date));
      setSelectedSlot('');
    }
  };

  const handleSelectSlot = ({ slot }: { slot: string }) => {
    setSelectedSlot(prevSlot => (prevSlot === slot ? '' : slot));
  };

  const [triggerRequestCallTimeSlots] = useLazyGetRequestCallBackTimeSlotsQuery(
    {}
  );
  const [reuestCallBack] = useReuestCallBackMutation({});

  const subRoute = useSearchParams().get('active-tab');
  const handleDetailPage = ({ row }: { row: any }) => {
    shouldSkipCleanup.current = true;
    router.push(
      `/v2/${SubRoutes.Diamond_Detail}?path=${MatchRoutes.BID_TO_BUY}&stoneid=${row?.lot_id}-${row?.location}`
    );
  };

  useEffect(() => {
    return () => {
      if (!shouldSkipCleanup.current) {
        dispatch(
          dashboardResultPage({
            isResultPage: false,
            resultPageData: {
              foundKeywords: [],
              foundProducts: [],
              notFoundKeywords: []
            },
            stoneId: '',
            columnData: [],
            searchType: 'normal',
            textSearchReportId: null
          })
        );
      }
      localStorage.removeItem('bid');
    };
  }, [dispatch]);

  const handleDetailImage = ({ row }: any) => {
    setDetailImageData(row);
    setIsModalOpen(true);
  };
  const filterDataState: any = useAppSelector(state => state.filterBidToBuy);

  const [bidHistory, setBidHistory] = useState<any>({});

  const handleBidUnLockPricing = () => {
    modalSetState.setIsDialogOpen(true);
    setIsBidUnlockPricingPopup(true);
    modalSetState.setDialogContent(
      <div className="flex flex-col gap-y-[24px]">
        <div className="flex justify-center ">
          <Image src={KgkIcon} alt="KGK logo" />
        </div>
        <div className="flex flex-col gap-[12px] text-center">
          <div>
            <h3 className="text-headingS text-neutral900">
              Ready to Access Premium Features?
            </h3>
            <h5 className="text-lMedium text-neutral900">
              Complete KYC to Unlock your Full Buying Experience
            </h5>
          </div>
          <p className="text-mMedium text-neutral700">
            Obtain a competitive edge in the diamond marketplace by unlocking
            exclusive tools and features:
          </p>
        </div>
        <div className="border-neutral200 border-solid border-[1px] rounded-[8px]">
          <div className="p-[20px] flex flex-col gap-[20px]">
            <div className="flex  items-center gap-3">
              <Image src={tick} alt="tick" />
              <h3>Benefits of KYC Verification</h3>
            </div>
            <hr className=" border-none h-[1px] w-[90%] text-center bg-neutral200" />
            <div>
              <ul className="text-mMedium text-neutral900 font-medium flex flex-col gap-5  ">
                <li className="flex items-center gap-3">
                  {' '}
                  <Image src={tick} alt="tick" />
                  Unlock Real-Time Pricing Insights
                </li>
                <li className="flex items-center gap-3">
                  {' '}
                  <Image src={tick} alt="tick" />
                  Secure Stones Instantly
                </li>
                <li className="flex items-center gap-3">
                  {' '}
                  <Image src={tick} alt="tick" />
                  Get Priority Access to the Latest Diamond Arrivals
                </li>
                <li className="flex items-center gap-3">
                  {' '}
                  <Image src={tick} alt="tick" />
                  Bid Competitively to Secure Desired Stones
                </li>
                <li className="flex items-center gap-3">
                  {' '}
                  <Image src={tick} alt="tick" />
                  Book Personalized Consultations with Account Experts
                </li>
                <li className="flex items-center gap-3">
                  {' '}
                  <Image src={tick} alt="tick" />
                  Unlimited Searches of Full Diamond Inventory
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className=" border-none h-[1px] w-[489px] ml-[-23px] bg-neutral200" />
        <div>
          <ActionButton
            actionButtonData={[
              {
                variant: 'secondary',
                label: 'Request Callback',
                handler: () => {
                  triggerRequestCallTimeSlots({}).then(res => {
                    let { data } = res.data;
                    setRequestCallTimeSlots(data);
                    setSelectedDate(Number(data.timeSlots.dates[0].date));
                    setSelectedSlot('');
                    modalSetState.setIsDialogOpen(false);
                    setIsBidUnlockPricingPopup(false);
                    modalSetState.setDialogContent(<></>);
                    modalSetState.setIsInputDialogOpen(true);
                  });
                },
                customStyle: 'flex-1'
              },
              {
                variant: 'primary',
                label: 'Complete KYC Now',
                handler: () => {
                  router.push('/v2/kyc');
                },
                customStyle: 'flex-1'
              }
            ]}
          />
        </div>
      </div>
    );
  };

  const [triggerBidToBuyHistory, { data: historyData }] =
    useLazyGetBidToBuyHistoryQuery({});
  const mapColumns = (columns: any) =>
    columns
      ?.filter(({ is_disabled }: any) => !is_disabled)
      .map(({ accessor, short_label, label }: any) => {
        const currentSort = sorting.find(sort => sort.id === accessor);
        const nonSortableAccessors = ['shape_full', 'details', 'fire_icon'];
        // Check if sorting should be disabled for the column's accessor
        const isSortable = !nonSortableAccessors.includes(accessor);
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          enableGlobalFilter: accessor === 'lot_id',
          // enableGrouping: accessor === 'shape',
          // enableSorting:
          //   accessor !== 'shape_full' &&
          //   accessor !== 'details' &&
          //   accessor !== 'fire_icon',
          minSize: 0,
          maxSize: 0,
          size: 0,
          Header: ({ column }: any) => (
            <div className="flex items-center group">
              <Tooltip
                tooltipTrigger={<span>{column.columnDef.header}</span>}
                tooltipContent={label}
                tooltipContentStyles={'z-[1000]'}
              />
              {isSortable &&
                (currentSort ? (
                  <FontAwesomeIcon
                    icon={currentSort.desc ? faSortDown : faSortUp}
                    width={8}
                    height={8}
                    style={{ marginLeft: '2px' }} // Optional styling for spacing
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faSort} // Default icon when not sorted
                    width={8}
                    height={8}
                    className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" // Show on hover
                    style={{ marginLeft: '2px' }}
                  />
                ))}
            </div>
          )
        };

        switch (accessor) {
          case 'amount':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderNewArrivalPrice({
                  row,
                  handleBidUnLockPricing
                });
              }
            };
          case 'measurements':
            return { ...commonProps, Cell: RenderMeasurements };
          case 'shape_full':
            return { ...commonProps, Cell: RenderShape };
          case 'rap':
          case 'rap_value':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue, row }: any) => {
                return RenderBidNumericFields({
                  renderedCellValue,
                  handleBidUnLockPricing,
                  row
                });
              }
            };
          case 'carats':
          case 'table_percentage':
          case 'depth_percentage':
          case 'ratio':
          case 'length':
          case 'width':
          case 'depth':
          case 'crown_angle':
          case 'crown_height':
          case 'girdle_percentage':
          case 'pavilion_angle':
          case 'pavilion_height':
          case 'lower_half':
          case 'star_length':
            return { ...commonProps, Cell: RenderCarat };
          case 'original_discount':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue, row }: any) => {
                return DiscountWithCross({
                  renderedCellValue,
                  handleBidUnLockPricing,
                  row
                });
              }
            };
          case 'discount':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue, row }: any) => {
                return RenderBidDiscount({
                  renderedCellValue,
                  handleBidUnLockPricing,
                  row
                });
              }
            };
          case 'my_current_bid':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue, row }: any) => {
                return RenderBidDiscount({
                  renderedCellValue,
                  handleBidUnLockPricing,
                  row
                });
              }
            };
          case 'last_bid_date':
            return { ...commonProps, Cell: RenderBidDate };

          case 'lot_id':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue, row }: any) => {
                return RenderCartLotId({
                  renderedCellValue,
                  row,
                  handleDetailPage
                });
              }
            };
          case 'key_to_symbol':
          case 'report_comments':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
                <span>{`${
                  renderedCellValue?.length > 0
                    ? renderedCellValue?.toString()
                    : '-'
                }`}</span>
              )
            };
          case 'details':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderDetails({
                  row,
                  handleDetailImage
                });
              }
            };
          case 'lab':
            return { ...commonProps, Cell: RenderLab };
          case 'location':
            return { ...commonProps, Cell: RednderLocation };
          case 'price_per_carat':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderNewArrivalPricePerCarat({
                  row,
                  handleBidUnLockPricing
                });
              }
            };

          case 'tracr_id':
            return { ...commonProps, Cell: RenderTracerId };
          default:
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
                <span>{renderedCellValue ?? '-'}</span>
              )
            };
        }
      });
  const [activeTab, setActiveTab] = useState(0);
  const tabLabels = ['Bid Stone', 'Active Bid', 'Bid History'];
  const [timeDifference, setTimeDifference] = useState(null);
  const [isInActive, setIsInActive] = useState('');
  const getBidToBuyHistoryData = () => {
    triggerBidToBuyHistory({})
      .then(res => {
        setBidHistory(res.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    let queryNew = constructUrlParams(JSON.parse(localStorage.getItem('bid')!));

    setIsLoading(true);

    triggerBidToBuyApi({
      searchUrl: `${queryNew}`,
      textSearchReportId: dashboardResultPageData?.textSearchReportId ?? null
    })
      .unwrap()
      .then((response: any) => {
        setIsInActive('');

        setTime(response?.endTime),
          setBid(
            queryNew.length || dashboardResultPageData?.textSearchReportId
              ? response?.bidStone
              : []
          );
        setActiveBid(response?.activeStone);
        setIsLoading(false);
      })
      .catch(e => {
        // if (e?.data?.error === 'INACTIVE_BID_TO_BUY') {
        setIsInActive(e?.data?.error);
        // }
        setActiveBid([]);
        setBid([]);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let queryNew = constructUrlParams(JSON.parse(localStorage.getItem('bid')!));

    setIsLoading(true);

    triggerBidToBuyApi({
      searchUrl: `${queryNew}`,
      textSearchReportId: dashboardResultPageData?.textSearchReportId ?? null
    })
      .unwrap()
      .then((response: any) => {
        setIsInActive('');

        setBid(
          queryNew.length || dashboardResultPageData?.textSearchReportId
            ? response?.bidStone
            : []
        );
        setActiveBid(response?.activeStone);
        setTime(response?.endTime), setIsLoading(false);
      })
      .catch(e => {
        // if (e?.data?.error === 'INACTIVE_BID_TO_BUY') {
        //   setIsInActive('INACTIVE_BID_TO_BUY');
        // }
        setIsInActive(e?.data?.error);
        setActiveBid([]);
        setBid([]);
        setIsLoading(false);
      });
  }, [localStorage.getItem('bid'), dashboardResultPageData.textSearchReportId]);

  useEffect(() => {
    if (activeTab === 2) {
      getBidToBuyHistoryData();
    }
  }, [activeTab]);
  useEffect(() => {
    getBidToBuyHistoryData();
  }, []);

  useEffect(() => {
    if (
      getActiveTabParam &&
      (Number(getActiveTabParam) === 2 || Number(getActiveTabParam) === 1)
    ) {
      setActiveTab(Number(getActiveTabParam));
    } else if (pathName === 'bidHistory') {
      setActiveTab(2);
    } else if (pathName === 'bidStone') {
      setActiveTab(0);
    } else if (pathName === 'activeBid') {
      setActiveTab(1);
    }
  }, []);

  const handleTabClick = (index: number) => {
    let queryNew = constructUrlParams(JSON.parse(localStorage.getItem('bid')!));

    if (index !== activeTab) {
      if (index === 0 && !queryNew.length) {
        setIsTabSwitch(false);
      } else {
        setIsTabSwitch(true);
      }
    }
    setActiveTab(index);
    setRowSelection({});
  };
  const [activeBid, setActiveBid] = useState<any>();
  const [bid, setBid] = useState<any>();
  const [time, setTime] = useState('');

  useEffect(() => {
    const currentTime: any = new Date();
    const targetTime: any = new Date(time!);
    const timeDiff: any = targetTime - currentTime;

    setTimeDifference(timeDiff);
  }, [time]);

  const memoizedColumns = useMemo(
    () => mapColumns(columnHeaders),
    [columnHeaders, sorting]
  );
  const { modalState, modalSetState } = useModalStateManagement();
  const { errorState, errorSetState } = useErrorStateManagement();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const { setIsError, setErrorText } = errorSetState;
  const { isError, errorText } = errorState;

  const [downloadExcel] = useDownloadExcelMutation();
  const [deleteBid] = useDeleteBidMutation();
  let [triggerBidToBuyApi] = useLazyGetAllBidStonesQuery();

  const renderFooter = (table: any) => {
    if (activeTab === 0 && bid?.length > 0) {
      return (
        <div className="flex items-center justify-between px-4 py-0">
          <div className="flex  ml-[85px] justify-center flex-1">
            <MRT_TablePagination table={table} />
          </div>
          <div className="flex items-center gap-3">
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: 'Clear All',
                  handler: () => {
                    setRowSelection({});
                  },
                  isDisable: !Object.keys(rowSelection).length
                }
              ]}
            />
          </div>
        </div>
      );
    } else if (activeTab === 1 && activeBid?.length > 0) {
      return (
        <div className="flex items-center justify-between px-4 py-0">
          <div className="flex ml-[200px] justify-center flex-1">
            {' '}
            {/* Aligns MRT_TablePagination to the middle */}
            <MRT_TablePagination table={table} />
          </div>
          <div className="flex items-center gap-3">
            {' '}
            {/* Aligns ActionButton to the end */}
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: 'Clear All',
                  handler: () => {
                    setRowSelection({});
                  },
                  isDisable: !Object.keys(rowSelection).length
                }
                // {
                //   variant: 'primary',
                //   label: 'Cancel Bid',
                //   handler: () => {
                //     modalSetState.setIsDialogOpen(true);
                //     modalSetState.setDialogContent(
                //       <CommonPoppup
                //         content=""
                //         status="warning"
                //         customPoppupBodyStyle="mt-[70px]"
                //         header={'Are you sure you want to cancel this bid?'}
                //         actionButtonData={[
                //           {
                //             variant: 'secondary',
                //             label: 'Go Back',
                //             handler: () => {
                //               modalSetState.setIsDialogOpen(false);
                //             },
                //             customStyle: 'flex-1 w-full'
                //           },
                //           {
                //             variant: 'primary',
                //             label: 'Cancel Bid',
                //             handler: () => {
                //               // socketManager.emit('cancel_bidtobuy', {
                //               //   product_ids: Object.keys(rowSelection)
                //               // });
                //               deleteBid({
                //                 product_ids: Object.keys(rowSelection)
                //               })
                //                 .unwrap()
                //                 .then(res => {
                //                   modalSetState.setIsDialogOpen(true);
                //                   modalSetState.setDialogContent(
                //                     <CommonPoppup
                //                       content=""
                //                       header={'Bid Canceled Successfully'}
                //                       handleClick={() =>
                //                         modalSetState.setIsDialogOpen(false)
                //                       }
                //                       buttonText="Okay"
                //                       status="success"
                //                     />
                //                   );
                //                   triggerBidToBuyApi({
                //                     searchUrl: constructUrlParams(
                //                       JSON.parse(localStorage.getItem('bid')!)
                //                     ),
                //                     limit: 300
                //                   })
                //                     .unwrap()
                //                     .then((response: any) => {
                //                       setBid(response?.bidStone);
                //                       setActiveBid(response?.activeStone);
                //                       setIsLoading(false);
                //                       setBidValues((prevValues: any) => {
                //                         // Create a new object excluding keys in rowSelection
                //                         const updatedValues = { ...prevValues };
                //                         Object.keys(rowSelection).forEach(
                //                           key => {
                //                             delete updatedValues[key]; // Remove the key from the state
                //                           }
                //                         );
                //                         return updatedValues;
                //                       });
                //                     })
                //                     .catch(e => {
                //                       setIsLoading(false);
                //                     });
                //                 })
                //                 .catch(e => {
                //                   modalSetState.setIsDialogOpen(true);
                //                   modalSetState.setDialogContent(
                //                     <CommonPoppup
                //                       header={e?.data?.message}
                //                       content={''}
                //                       handleClick={() =>
                //                         modalSetState.setIsDialogOpen(false)
                //                       }
                //                       buttonText="Okay"
                //                     />
                //                   );
                //                 });
                //               modalSetState.setIsDialogOpen(false);
                //             },
                //             customStyle: 'flex-1 w-full'
                //           }
                //         ]}
                //       />
                //     );
                //   },

                //   isDisable: !Object.keys(rowSelection).length
                // }
              ]}
            />
          </div>
        </div>
      );
    } else if (activeTab === 2 && bidHistory?.data?.length > 0) {
      return (
        <div className="flex items-center justify-between px-4 py-0 border-t-[1px] border-solid border-neutral200">
          <div className="flex gap-4 py-2">
            <div className=" border-[1px] border-successBorder rounded-[4px] bg-successSurface text-successMain">
              <p className="text-mMedium font-medium px-[6px] py-[4px]">Won</p>
            </div>
            <div className=" border-[1px] border-dangerBorder rounded-[4px] bg-dangerSurface text-dangerMain">
              <p className="text-mMedium font-medium px-[6px] py-[4px]">
                {' '}
                Lost
              </p>
            </div>
          </div>
          {/* <MRT_TablePagination table={table} /> */}
          <div></div>
        </div>
      );
    } else {
      return <></>;
    }
  };
  const images = [
    {
      name: getShapeDisplayName(detailImageData?.shape ?? ''),
      url: `${FILE_URLS.IMG.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.IMG.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Certificate',
      url: `${FILE_URLS.CERT_FILE.replace(
        '***',
        detailImageData?.certificate_number ?? ''
      )}`,
      category: 'Certificate',
      downloadUrl: detailImageData?.assets_pre_check?.CERT_FILE
        ? `${FILE_URLS.CERT_PDF_DOWNLOAD_URL.replace(
            '***',
            detailImageData?.certificate_number ?? ''
          )}`
        : '',
      url_check: detailImageData?.assets_pre_check?.CERT_IMG
    },

    {
      name: 'Video',
      url: `${FILE_URLS.B2B.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.B2B_DOWNLOAD_URL.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      url_check: detailImageData?.assets_pre_check?.B2B_CHECK,
      category: 'Video'
    },
    {
      name: 'Sparkle',
      url: `${FILE_URLS.B2B_SPARKLE.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.B2B_SPARKLE_DOWNLOAD_URL.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      url_check: detailImageData?.assets_pre_check?.B2B_SPARKLE_CHECK,
      category: 'Sparkle'
    },

    {
      name: 'Heart',
      url: `${FILE_URLS.HEART.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.HEART.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Arrow',
      url: `${FILE_URLS.ARROW.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.ARROW.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Aset',
      url: `${FILE_URLS.ASET.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.ASET.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Ideal',
      url: `${FILE_URLS.IDEAL.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.IDEAL.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Fluorescence',
      url: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    }
  ];
  const goBack = () => {
    setIsDetailPage(false);
    setDetailPageData({});
  };
  useEffect(() => {
    isError &&
      setTimeout(() => {
        setIsError(false); // Hide the toast notification after some time
      }, 4000);
  }, [isError]);

  useEffect(() => {
    if (images.length > 0 && images[0].name.length)
      loadImages(images, setValidImages, checkImage, false);
  }, [detailImageData]);

  useEffect(() => {
    if (!validImages.length && isModalOpen) {
      setValidImages([
        {
          name: '',
          url: noImageFound,
          category: 'NoDataFound'
        }
      ]);
    }
  }, [validImages]);

  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };
  const renderRequestCallTimeSlot = () => {
    return (
      <div className="">
        {' '}
        <div className="flex flex-col gap-[8px]">
          <div className="flex justify-between items-center">
            <div className="text-headingS text-neutral900 font-medium">
              Schedule Callback
            </div>
            <div
              className=" cursor-pointer "
              onClick={() => {
                modalSetState.setIsInputDialogOpen(false);
                setRequestCallTimeSlots({});
              }}
            >
              <Image src={crossIcon} alt="crossIcon" />
            </div>
          </div>
          <div>
            If you're currently busy and unable to take a call, you can schedule
            a more convenient time for our sales team to reach out to you.
          </div>
        </div>
        <div className="flex flex-col gap-[15px] pt-[12px] w-[330px]">
          {/* select data */}
          <div className="">
            <div className="text-sMedium text-neutral900 font-[500]">
              Select date*
            </div>
            <div className="flex justify-between bg-neutral0 border-solid border-[1px] border-neutral200 p-[8px] rounded-[4px]">
              {requestCallTimeSlots?.timeSlots?.dates?.map((date: any) => {
                return (
                  <button
                    onClick={() => {
                      handleSelectData({ date: date.date });
                    }}
                    key={date.date}
                    className={`flex flex-col cursor-pointer  items-center p-[20px]  w-[44px] rounded-[4px]
                        ${
                          selectedDate === Number(date.date)
                            ? 'bg-primaryMain text-neutral0'
                            : 'bg-neutral50 text-neutral700'
                        }
                    `}
                  >
                    <div className="text-sRegular font-normal">{date.day}</div>
                    <p className="text-mMedium font-medium ">{date.date}</p>
                  </button>
                );
              })}
            </div>
          </div>
          {/* Select Time Slot */}
          <div className="flex flex-col gap-1 w-full">
            {/* Title */}
            <div className="text-sMedium text-neutral900 font-[500]">
              Select time slot*
            </div>
            <div className="flex flex-col gap-[8px]">
              {requestCallTimeSlots?.timeSlots?.slots &&
                requestCallTimeSlots?.timeSlots?.slots[Number(selectedDate)] &&
                Object.keys(
                  requestCallTimeSlots?.timeSlots?.slots[Number(selectedDate)]
                ).map(key => {
                  const keys = Object.keys(
                    requestCallTimeSlots?.timeSlots?.slots[selectedDate][key]
                  );
                  const values: {
                    datetimeString: string;
                    isAvailable: boolean;
                  }[] = Object.values(
                    requestCallTimeSlots?.timeSlots?.slots[selectedDate][key]
                  );

                  return (
                    <div
                      key={key}
                      className="flex flex-col gap-[4px] font-normal"
                    >
                      {/* Section Header */}
                      <div
                        className="text-sMobileRegular font-medium text-neutral800 capitalize flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection(key)}
                      >
                        {key}
                        {key === 'Afternoon' && (
                          <Image
                            src={openSection === key ? chevronUp : chevronDown}
                            alt="Chevron"
                          />
                        )}
                      </div>

                      {/* Time Slots */}
                      {(key !== 'Afternoon' || openSection === key) && (
                        <div className="flex flex-wrap gap-x-[14px] gap-y-2 bg-neutral0 rounded-[4px] p-[8px] border-solid border-[1px] border-neutral200">
                          {keys.map((timeSlot, index) => (
                            <button
                              key={timeSlot}
                              disabled={!values[index].isAvailable}
                              className={`w-[94px] text-sMobileRegular rounded-[4px] p-[8px]
                          ${
                            selectedSlot === values[index].datetimeString
                              ? 'bg-primaryMain text-neutral0'
                              : !values[index].isAvailable
                              ? 'bg-neutral100 text-neutral400 cursor-not-allowed'
                              : 'bg-neutral50 text-neutral700'
                          }`}
                              onClick={() =>
                                handleSelectSlot({
                                  slot: values[index].datetimeString
                                })
                              }
                            >
                              {timeSlot}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
          <ActionButton
            actionButtonData={[
              {
                variant: 'primary',
                label: 'Request Callback',
                handler: () => {
                  reuestCallBack({
                    callback_at: selectedSlot
                  })
                    .unwrap()
                    .then(() => {
                      modalSetState.setIsInputDialogOpen(false);
                      setRequestCallTimeSlots({});
                      setRowSelection({});
                      modalSetState.setIsDialogOpen(true);
                      modalSetState.setDialogContent(
                        <CommonPoppup
                          content=""
                          status="success"
                          customPoppupBodyStyle="!mt-[70px]"
                          header={'Your callback has been scheduled'}
                          actionButtonData={[
                            {
                              variant: 'primary',
                              label: ManageLocales('app.modal.okay'),
                              handler: () =>
                                modalSetState.setIsDialogOpen(false),
                              customStyle: 'flex-1 w-full h-10'
                            }
                          ]}
                        />
                      );
                    })
                    .catch(error => {
                      modalSetState.setIsInputDialogOpen(false);
                      setRequestCallTimeSlots({});
                      setRowSelection({});
                      modalSetState.setIsDialogOpen(true);
                      modalSetState.setDialogContent(
                        <CommonPoppup
                          content=""
                          status="error"
                          customPoppupBodyStyle="!mt-[70px]"
                          header={error.data.message}
                          actionButtonData={[
                            {
                              variant: 'primary',
                              label: ManageLocales('app.modal.okay'),
                              handler: () =>
                                modalSetState.setIsDialogOpen(false),
                              customStyle: 'flex-1 w-full h-10'
                            }
                          ]}
                        />
                      );
                    });
                },
                customStyle: 'flex-1 w-full',
                isDisable: !selectedSlot.length
              }
            ]}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="mb-[4px] relative">
      {isError && (
        <Toast show={isError} message={errorText} isSuccess={false} />
      )}
      {(isLoading || isTabSwitch) && <CustomKGKLoader />}

      <InputDialogComponent
        isOpen={modalState.isInputDialogOpen}
        onClose={() => modalSetState.setIsInputDialogOpen(false)}
        renderContent={renderRequestCallTimeSlot}
        dialogStyle={'!max-w-[376px]'}
      />

      <ImageModal
        isOpen={isModalOpen}
        stockNumber={detailImageData?.lot_id ?? ''}
        onClose={() => {
          setValidImages([]);
          setDetailImageData({});
          setIsModalOpen(!isModalOpen);
        }}
        images={validImages}
        setIsLoading={setIsLoading}
      />
      <DialogComponent
        dialogContent={modalState.dialogContent}
        isOpens={modalState.isDialogOpen}
        dialogStyle={{
          dialogContent: isBidUnlockPricingPopup
            ? '!min-h-[660px] !max-w-[490px]'
            : isAddDemand
            ? 'min-h-[280px]'
            : ''
        }}
      />

      {isDetailPage ? (
        <div className="mt-[16px]">
          {isGemTrac ? (
            <GemTracPage
              breadCrumLabel={'Bid to Buy'}
              setIsGemTrac={setIsGemTrac}
              setGemTracData={setGemTracData}
              gemTracData={gemTracData}
              goBackToListView={goBack}
            />
          ) : (
            <>
              <DiamondDetailsComponent
                data={
                  activeTab === 0
                    ? bid
                    : activeTab === 1
                    ? activeBid
                    : bidHistory?.data
                }
                filterData={detailPageData}
                goBackToListView={goBack}
                handleDetailPage={handleDetailPage}
                fromBid={true}
                breadCrumLabel={'Bid to Buy'}
                modalSetState={modalSetState}
                setIsLoading={setIsLoading}
                activeTab={activeTab}
                setIsGemTrac={setIsGemTrac}
                setGemTracData={setGemTracData}
                triggerGemTracApi={triggerGemTracApi}
              />
            </>
          )}
        </div>
      ) : isLoading ||
        // isLoadingBidToBuyApi ||
        historyData === undefined ||
        activeBid === undefined ? (
        !Object?.keys(localStorage.getItem('bid') ?? {}).length ||
        subRoute === SubRoutes.BID_TO_BUY ? (
          <CustomKGKLoader />
        ) : (
          <BiddingSkeleton />
        )
      ) : (
        <>
          {((!Object?.keys(localStorage.getItem('bid') ?? {}).length &&
            time &&
            activeTab === 0 &&
            isInActive !== 'INACTIVE_BID_TO_BUY') ||
            subRoute === SubRoutes.BID_TO_BUY) &&
          (!dashboardResultPageData.textSearchReportId ||
            !dashboardResultPageData.resultPageData.foundProducts.length) ? (
            <Form
              searchUrl={searchUrl}
              setSearchUrl={setSearchUrl}
              state={state}
              setState={setState}
              carat={carat}
              handleCloseAllTabs={() => {}}
              handleCloseSpecificTab={() => {}}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              errorState={formErrorState.errorState}
              errorSetState={formErrorState.errorSetState}
              setIsDialogOpen={modalSetState.setIsDialogOpen}
              setDialogContent={modalSetState.setDialogContent}
              setIsLoading={setSearchLoading}
              setIsAddDemand={setIsAddDemand}
              isMatchingPair={false}
              isLoading={searchLoading}
              setIsCommonLoading={setIsLoading}
              time={time}
              setRowSelection={setRowSelection}

              // setBid={setBid}
              // setActiveBid={setActiveBid}
            />
          ) : (
            <>
              {isSkeletonLoading ? (
                ''
              ) : (
                <div className="flex  py-[4px] items-center justify-between">
                  <>
                    {' '}
                    <div className="flex gap-3 items-center">
                      <p className="text-lMedium font-medium text-neutral900">
                        Bid to Buy
                      </p>
                      {time && time?.length ? (
                        <div className="text-successMain text-lMedium font-medium">
                          ACTIVE
                        </div>
                      ) : (
                        <div className="text-visRed text-lMedium font-medium">
                          INACTIVE
                        </div>
                      )}
                    </div>
                    <div className="h-[38px]">
                      {timeDifference !== null && timeDifference >= 0 && (
                        <CountdownTimer
                          initialHours={Math.floor(
                            timeDifference / (1000 * 60 * 60)
                          )}
                          initialMinutes={Math.floor(
                            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
                          )}
                          initialSeconds={Math.floor(
                            (timeDifference % (1000 * 60)) / 1000
                          )}
                        />
                      )}
                    </div>
                  </>
                </div>
              )}
              <div
                className={`${
                  isSkeletonLoading
                    ? ' '
                    : 'border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow'
                } `}
              >
                <div>
                  <BidToBuyDataTable
                    dispatch={dispatch}
                    // filterData={filterData}
                    setBid={setBid}
                    setActiveBid={setActiveBid}
                    setSorting={setSorting}
                    sorting={sorting}
                    columns={
                      activeTab === 2
                        ? memoizedColumns.filter(
                            (data: any) =>
                              data.accessorKey !== 'shape' &&
                              data.accessorKey !== 'discount'
                          )
                        : activeTab === 1
                        ? memoizedColumns.filter(
                            (data: any) =>
                              data.accessorKey !== 'last_bid_date' &&
                              data.accessorKey !== 'shape' &&
                              data.accessorKey !== 'discount'
                          )
                        : memoizedColumns.filter(
                            (data: any) =>
                              data.accessorKey !== 'my_current_bid' &&
                              data.accessorKey !== 'last_bid_date'
                          )
                    }
                    modalSetState={modalSetState}
                    setErrorText={setErrorText}
                    downloadExcel={downloadExcel}
                    setIsError={setIsError}
                    tabLabels={tabLabels}
                    activeTab={activeTab}
                    handleTabClick={handleTabClick}
                    rows={
                      activeTab === 0
                        ? bid
                        : activeTab === 1
                        ? activeBid
                        : bidHistory?.data
                    }
                    activeCount={activeBid?.length}
                    bidCount={bid?.length}
                    isTabSwitch={isTabSwitch}
                    setIsTabSwitch={setIsTabSwitch}
                    historyCount={bidHistory?.data?.length}
                    // socketManager={socketManager}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                    setIsLoading={setIsLoading}
                    renderFooter={renderFooter}
                    router={router}
                    isSkeletonLoading={isSkeletonLoading}
                    setIsSkeletonLoading={setIsSkeletonLoading}
                    isLoading={isLoading}
                    isInActive={isInActive}
                    setBidValues={setBidValues}
                    bidValues={bidValues}

                    // searchUrl={searchUrl}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default BidToBuy;

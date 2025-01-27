'use client';
import DashboardCarousel from '@/components/v2/common/carousel';
import KAMCard from '@/components/v2/common/kam-card';
import styles from './search/saved-search/saved-search.module.scss';
import ArrivalIcon from '@public/v2/assets/icons/sidebar-icons/new-arrivals.svg?url';
import CartIcon from '@public/v2/assets/icons/sidebar-icons/cart.svg?url';
import AppointmentIcon from '@public/v2/assets/icons/sidebar-icons/appointment.svg?url';
import BidToBuyIcon from '@public/v2/assets/icons/sidebar-icons/bid-to-buy.svg?url';
import { useRouter } from 'next/navigation';
import { useGetCustomerQuery } from '@/features/api/dashboard';
import { useCallback, useEffect, useState } from 'react';
import searchIcon from '@public/v2/assets/icons/dashboard/search-icon.svg';
import searchIconWhite from '@public/v2/assets/icons/dashboard/search-icon-white.svg';
import noImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import editIcon from '@public/v2/assets/icons/saved-search/edit-button.svg';
import threeDotsSvg from '@public/v2/assets/icons/threedots.svg';
import BidHammer from '@public/v2/assets/icons/dashboard/bid-hammer.svg';
import Image from 'next/image';
import { handleCardClick } from './search/saved-search/helpers/handle-card-click';
import {
  useCheckProductAvailabilityMutation,
  useConfirmProductMutation,
  useGetProductByIdMutation,
  useLazyGetProductCountQuery
} from '@/features/api/product';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import contactIcon from '@public/v2/assets/icons/modal/contact-sale.svg';
import chevronDown from '@public/v2/assets/icons/dashboard/chevron-down.svg';
import chevronUp from '@public/v2/assets/icons/dashboard/chevron-up.svg';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { formatCreatedAt } from '@/utils/format-date';
import { DisplayTable } from '@/components/v2/common/display-table';
import { MatchRoutes, Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { modifySavedSearch } from '@/features/saved-search/saved-search';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { formatNumberWithLeadingZeros } from '@/utils/format-number-withLeadingZeros';
import arrow from '@public/v2/assets/icons/my-diamonds/Arrow.svg';
import icon from '@public/v2/assets/icons/my-diamonds/avatar.svg';
import { kycStatus } from '@/constants/enums/kyc';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import { Dropdown } from '@/components/v2/common/dropdown-menu';
import { statusCode } from '@/constants/enums/status-code';
import infoSvg from '@public/v2/assets/icons/dashboard/info.svg';
import infoHover from '@public/v2/assets/icons/info.svg';
import { useAddCartMutation } from '@/features/api/cart';
import { DialogComponent } from '@/components/v2/common/dialog';
import { handleConfirmStone } from './search/result/helpers/handle-confirm-stone';
import { IProduct } from './search/interface';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';

import { AddCommentDialog } from '@/components/v2/common/comment-dialog';

import { handleComment } from './search/result/helpers/handle-comment';

import { FILE_URLS } from '@/constants/v2/detail-page';
import { getShapeDisplayName } from '@/utils/v2/detail-page';

import matchPairIcon from '@public/v2/assets/icons/match-pair-saved.svg';

import { MRT_RowSelectionState, MRT_SortingState } from 'material-react-table';
import { useDownloadExcelMutation } from '@/features/api/download-excel';

import { NOT_MORE_THAN_300 } from '@/constants/error-messages/search';
import { NO_STONES_SELECTED } from '@/constants/error-messages/cart';
import { notificationBadge } from '@/features/notification/notification-slice';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';

import VolumeDiscount from '@/components/v2/common/volume-discount';
import EmptyScreen from '@/components/v2/common/empty-screen';
import emptyOrderSvg from '@public/v2/assets/icons/empty-order.svg';
import empty from '@public/v2/assets/icons/saved-search/empty-screen-saved-search.svg';
import {
  AVAILABLE_STATUS,
  HOLD_STATUS,
  IN_TRANSIT,
  MEMO_STATUS
} from '@/constants/business-logic';

import { useLazyGetAvailableMyAppointmentSlotsQuery } from '@/features/api/my-appointments';

import { Skeleton } from '@mui/material';
import CommonPoppup from './login/component/common-poppup';

import { useLazyGetMatchingPairCountQuery } from '@/features/api/match-pair';
import { useAppSelector } from '@/hooks/hook';
import { setConfirmStoneTrack } from '@/features/confirm-stone-track/confirm-stone-track-slice';
import { STONE_LOCATION } from '@/constants/v2/enums/location';
import { kamLocationAction } from '@/features/kam-location/kam-location';
import { handleCompareStone } from './search/result/helpers/handle-compare-stone';
import { trackEvent } from '@/utils/ga';
import {
  Tracking_Dashboard,
  Tracking_Dashboard_Destination_Page,
  Tracking_Search_By_Text
} from '@/constants/funnel-tracking';

import GemTracPage from '@/components/v2/common/gem-trac';
import { useLazyGetGemTracQuery } from '@/features/api/gem-trac';
import { IndividualActionButton } from '@/components/v2/common/action-button/individual-button';
import { cardo } from '../layout';

import { handleContactSaleTeam } from './search/result/helpers/sale-team';
import {
  useLazyGetRequestCallBackTimeSlotsQuery,
  useReuestCallBackMutation
} from '@/features/api/request-call-back';
import { IAppointmentPayload } from './my-appointments';
import { dashboardResultPage } from '@/features/dashboard/dashboard-slice';
import { RadioButton } from '@/components/v2/common/radio';
import { useAddDeviceUUIDMutation } from '@/features/api/device-uuid';

interface ITabs {
  label: string;
  link: string;
  count: number;
  data: any;
}

export const dashboardIndentifier = 'Dashboard';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

function formatDateString(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  return `${day} ${month}`;
}
const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const confirmTrack = useAppSelector(state => state.setConfirmStoneTrack);
  const dashboardResultPageData = useAppSelector(
    state => state.dashboardResultPage
  );
  const { data: customerData, refetch: refetchCustomerData } =
    useGetCustomerQuery({}, { refetchOnMountOrArgChange: true });

  const [addDeviceUUID] = useAddDeviceUUIDMutation();
  const [showRadios, setShowRadios] = useState(false);

  // Options for Radio Buttons
  const radioOptions = [
    {
      label: 'Stock Search',
      value: 'normal',
      name: 'searchFrom',
      disable: false
    },
    {
      label: 'New Arrivals',
      value: 'NewArrivals',
      name: 'searchFrom',
      disable: !customerData?.customer?.new_arrivals_count
    },
    {
      label: 'Bid to Buy',
      value: 'BidToBuy',
      name: 'searchFrom',
      disable:
        (customerData?.customer?.bid_to_buy?.starts_at &&
          customerData?.customer?.bid_to_buy?.count) ||
        (customerData?.customer?.bid_to_buy?.starts_at &&
          !customerData?.customer?.bid_to_buy?.count)
    }
  ];

  const handleRadioChange = (value: string) => {
    dispatch(
      dashboardResultPage({
        searchType: value
      })
    );
  };

  const [inputWidth, setInputWidth] = useState(720); // Starting width, e.g., 720px.

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const newWidth = Math.max(398, 720 - scrollTop); // Decrease width, but not below 398px.
      setInputWidth(newWidth);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [validImages, setValidImages] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<string>('');
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const [tabs, setTabs] = useState<ITabs[]>([]);
  const [savedSearchData, setSavedSearchData] = useState([]);
  const optionsClasses = [
    'linear-gradient(90deg, #DBF2FC 0%, #E8E8FF 30%, #FFF4E3 100%)',
    'linear-gradient(90deg, #FFF4E3 0%, #E8E8FF 50%, #DBF2FC 100%)',
    'linear-gradient(90deg, #E1F6F1 0%, #FFF4E3 50%, #EFEFFD 100%)',
    'linear-gradient(90deg, #DBF2FC 0%, #E8E8FF 100%)'
  ];
  const [stoneId, setStoneId] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [breadCrumLabel, setBreadCrumLabel] = useState('');
  const [isConfirmStone, setIsConfirmStone] = useState(false);
  const [confirmStoneData, setConfirmStoneData] = useState<IProduct[]>([]);
  const [compareStoneData, setCompareStoneData] = useState<IProduct[]>([]);
  const [isCompareStone, setIsCompareStone] = useState(false);

  const [isAddCommentDialogOpen, setIsAddCommentDialogOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [detailImageData, setDetailImageData] = useState<any>({});
  const [commentValue, setCommentValue] = useState('');
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [isDetailPage, setIsDetailPage] = useState(false);
  const [isDiamondDetail, setIsDiamondDetail] = useState(false);
  const [isDiamondDetailLoading, setIsDiamondDetailLoading] = useState(true); //

  const [isSomeStoneNotFoundShowed, setIsSomeStoneNotFoundShowed] =
    useState(false);

  const [isGemTrac, setIsGemTrac] = useState(false);
  const [gemTracData, setGemTracData] = useState([]);

  const [triggerGemTracApi] = useLazyGetGemTracQuery({});

  const [lastEventTime, setLastEventTime] = useState<number | null>(null);

  const [isHovered, setIsHovered] = useState('');
  const [showEmptyState, setShowEmptyState] = useState(false);

  const [customerMobileNumber, setCustomerMobileNumber] = useState('');

  const [checkProductAvailability] = useCheckProductAvailabilityMutation({});

  let isNudge = localStorage.getItem('show-nudge')! === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  const { errorSetState } = useErrorStateManagement();
  const { setIsError } = errorSetState;
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<number>(0);

  const toggleBottomSheet = () => {
    setBottomSheetOpen(prev => !prev);
    if (window?.dataLayer) {
      window.dataLayer.push({
        event: Tracking_Dashboard.click_bid_to_buy_dropdown,
        source_page: 'dashboard',
        user_id: customerData?.customer?.id
      });
    }
  };

  const options = [
    {
      label: 'New Arrivals',
      icon: <ArrivalIcon stroke="#101828" />,
      color: optionsClasses[0],
      count: customerData?.customer?.new_arrivals_count ?? 0,
      isAvailable: true,
      link: '/v2/new-arrivals'
    },
    {
      label: 'My Cart',
      icon: <CartIcon />,
      color: optionsClasses[1],
      count: customerData?.customer?.cart?.items?.length ?? 0,
      isAvailable: true,
      link: '/v2/my-cart'
    },
    {
      label: 'Bid to Buy',
      icon: <BidToBuyIcon />,
      color: optionsClasses[2],
      count: customerData?.customer?.bid_to_buy?.count,
      start_at: customerData?.customer?.bid_to_buy?.starts_at,
      isAvailable: true,
      link: '/v2/bid-2-buy'
    },

    {
      label: 'My Appointments',
      icon: <AppointmentIcon />,
      color: optionsClasses[3],
      count: customerData?.customer?.upcoming_appointments_count,
      isAvailable: true,
      isKycNotVerified:
        isKycVerified?.customer?.kyc?.status !== kycStatus.APPROVED,
      link: '/v2/my-appointments'
    }
  ];

  const handleTabs = ({ tab }: { tab: string }) => {
    setActiveTab(tab);
  };
  let [triggerProductCountApi] = useLazyGetProductCountQuery();
  let [triggerMatchingPairCountApi] = useLazyGetMatchingPairCountQuery();

  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;

  const { setIsDialogOpen, setDialogContent } = modalSetState;

  const [contactSaleTeamInputValue, setContactSaleTeamInputValue] =
    useState('');

  const gradientClasses = [
    styles.gradient1,
    styles.gradient2,
    styles.gradient3,
    styles.gradient4
  ];

  // const memoizedRows = useMemo(() => {
  //   setBreadCrumLabel('Dashboard');
  //   return Array.isArray(dashboardResultPageData?.resultPageData?.foundProducts)
  //     ? dashboardResultPageData?.resultPageData?.foundProducts
  //     : [];
  // }, [dashboardResultPageData?.resultPageData?.foundProducts]);
  // useEffect(() => {
  //   if (
  //     dashboardResultPageData?.resultPageData?.notFoundKeywords?.length > 0 &&
  //     !isSomeStoneNotFoundShowed
  //   ) {
  //     setError('Some stones are not available');
  //     setIsSomeStoneNotFoundShowed(true);
  //   }
  // }, [dashboardResultPageData?.resultPageData?.notFoundKeywords]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     document.querySelectorAll('.blink').forEach(element => {
  //       element.classList.remove(styles.blink);
  //     });
  //   }, 4000);

  //   return () => clearTimeout(timeout);
  // }, [
  //   dashboardResultPageData?.isResultPage,
  //   isConfirmStone,
  //   isCompareStone,
  //   dashboardResultPageData?.resultPageData?.foundProducts
  // ]);

  // const handleTrackEvent = () => {
  //   trackEvent({
  //     action: Tracking_Search_By_Text.click_stone_lab_result_page,
  //     category: 'SearchByText',
  //     mobile_number: customerMobileNumber
  //   });
  // };
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };

  const handleEdit = (stone: string, identifier = false) => {
    let savedSearchEditData = customerData?.customer?.saved_searches?.filter(
      (items: any) => {
        return items.id === stone;
      }
    );

    if (window?.dataLayer) {
      if (customerData) {
        window?.dataLayer.push({
          search_name: savedSearchEditData[0]?.name,
          event: Tracking_Dashboard.click_individual_saved_search,
          page_name: 'dashboard',
          user_id: customerData?.customer?.id,
          destination_page: identifier
            ? Tracking_Dashboard_Destination_Page.match_pair_form
            : Tracking_Dashboard_Destination_Page.search_form
        });
      }
    }

    dispatch(modifySavedSearch({ savedSearch: savedSearchEditData[0] }));

    identifier
      ? router.push(
          `${Routes.MATCHING_PAIR}?active-tab=${SubRoutes.SAVED_SEARCH}&edit=${SubRoutes.SAVED_SEARCH}`
        )
      : router.push(
          `${Routes.SEARCH}?active-tab=${SubRoutes.SAVED_SEARCH}&edit=${SubRoutes.SAVED_SEARCH}`
        );
  };

  const column = [
    {
      accessor: 'lab',
      label: 'Lab',
      sequence: 1,
      short_label: 'lab'
    },
    {
      accessor: 'shape',
      label: 'Shape',
      sequence: 2,
      short_label: 'Shape'
    },
    {
      accessor: 'carats',
      label: 'Carats',
      sequence: 3,
      short_label: 'carats'
    },
    {
      accessor: 'color',
      label: 'Color',
      sequence: 4,
      short_label: 'Color'
    },
    {
      accessor: 'clarity',
      label: 'Clarity',
      sequence: 5,
      short_label: 'Clarity'
    },
    {
      accessor: 'cut',
      label: 'Cut',
      sequence: 6,
      short_label: 'Cut'
    },
    {
      accessor: 'polish',
      label: 'Polish',
      sequence: 7,
      short_label: 'Polish'
    },
    {
      accessor: 'symmetry',
      label: 'Symmetry',
      sequence: 8,
      short_label: 'Symmetry'
    }
  ];
  useEffect(() => {
    refetchCustomerData();
  }, []);

  useEffect(() => {
    if (window?.dataLayer) {
      const customerDataFromLocalStorage = JSON.parse(
        localStorage.getItem('user')!
      );
      if (customerDataFromLocalStorage) {
        window?.dataLayer.push({
          event: Tracking_Dashboard.page_view,
          page_name: 'dashboard',
          user_id: customerDataFromLocalStorage?.customer?.id
        });
      }
    }
  }, []);

  useEffect(() => {
    if (customerData) {
      localStorage.setItem('user', JSON.stringify(customerData));
      setCustomerMobileNumber(
        `+${customerData.customer.country_code}${customerData.customer.phone}`
      );
      // setIsLoading(false);
      const tabsCopy: ITabs[] = []; // Make a copy of the current tabs

      // Check for pending and active invoices
      if (customerData.customer?.orders?.length > 0) {
        const pendingInvoices = customerData.customer.orders
          .filter(
            (item: any) =>
              item.invoice_id === null && item.status !== 'completed'
          )
          .sort((a: any, b: any) => {
            const dateA = new Date(a.created_at as string);
            const dateB = new Date(b.created_at as string);
            if (isNaN(dateA.getTime())) return 1; // Treat invalid dates as later
            if (isNaN(dateB.getTime())) return -1; // Treat invalid dates as earlier
            return dateB.getTime() - dateA.getTime(); // Descending order
          })
          .slice(0, 3);

        const activeInvoices = customerData.customer.orders
          .filter(
            (item: any) => item.invoice_id !== null && item.status === 'pending'
          )
          .sort((a: any, b: any) => {
            const dateA = new Date(a.created_at as string);
            const dateB = new Date(b.created_at as string);
            if (isNaN(dateA.getTime())) return 1; // Treat invalid dates as later
            if (isNaN(dateB.getTime())) return -1; // Treat invalid dates as earlier
            return dateB.getTime() - dateA.getTime(); // Descending order
          })
          .slice(0, 3);

        // Update or add "Pending Invoice" tab
        const pendingTab = tabsCopy.find(tab => tab.label === 'Pending');
        if (pendingInvoices.length > 0) {
          if (pendingTab) {
            pendingTab.data = pendingInvoices;
          } else {
            tabsCopy.push({
              label: 'Pending',
              link: '/v2/your-orders',
              count: customerData.customer.orders.filter(
                (item: any) =>
                  item.invoice_id === null && item.status !== 'completed'
              ).length,
              data: pendingInvoices
            });
          }
        } else {
          // Remove "Pending Invoice" tab if there are no pending invoices
          const index = tabsCopy.findIndex(tab => tab.label === 'Pending');
          if (index !== -1) {
            tabsCopy.splice(index, 1);
          }
        }

        // Update or add "Active Invoice" tab
        const activeTab = tabsCopy.find(tab => tab.label === 'In-transit');
        if (activeInvoices.length > 0) {
          if (activeTab) {
            activeTab.data = activeInvoices;
          } else {
            tabsCopy.push({
              label: 'In-transit',
              link: '/v2/your-orders',
              count: customerData.customer.orders.filter(
                (item: any) =>
                  item.invoice_id !== null && item.status === 'pending'
              ).length,
              data: activeInvoices
            });
          }
        } else {
          // Remove "Active Invoice" tab if there are no active invoices
          const index = tabsCopy.findIndex(tab => tab.label === 'In-transit');
          if (index !== -1) {
            tabsCopy.splice(index, 1);
          }
        }
        // Update the tabs state
        setTabs(tabsCopy);
        setActiveTab(tabsCopy[0].label);
      }
    }
  }, [customerData]);

  useEffect(() => {
    setSavedSearchData(
      customerData?.customer?.saved_searches?.slice(0, 3) ?? []
    );
  }, [customerData]);

  useEffect(() => {
    if (tabs.length > 0) {
      if (activeTab === '') {
        setActiveTab(tabs[0].label);
      }
    }
  }, [tabs]);

  const tabsData: any = {
    pendingInvoice: {
      keys: [
        { label: 'Order ID', accessor: 'display_id' },
        { label: 'Confirmation Date', accessor: 'created_at' },
        { label: 'Order Request Status', accessor: 'status' },
        { label: 'Details', accessor: 'details' }
      ],
      data: tabs.find(tab => tab.label === activeTab)?.data
    },
    activeInvoice: {
      keys: [
        { label: 'Order ID', accessor: 'display_id' },
        { label: 'Invoice Number', accessor: 'invoice_id' },
        { label: 'Invoice Date', accessor: 'created_at' },
        { label: 'Details', accessor: 'details' }
      ],
      data: tabs.find(tab => tab.label === activeTab)?.data
    }
  };

  // Get the keys and data for the active tab
  const { keys, data } = tabsData[
    activeTab === 'In-transit'
      ? 'activeInvoice'
      : activeTab === 'Pending'
      ? 'pendingInvoice'
      : ''
  ] || { keys: [], data: [] };

  const redirectLink = () => {
    let link = '/';

    if (activeTab === 'In-transit') {
      return (link = `/v2/your-orders?path=${IN_TRANSIT}`);
    } else if (activeTab === 'Pending') {
      return (link = '/v2/your-orders');
    }
    return link;
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
            {/* <Image src={icon} alt="icon" /> */}
            <span>{value[accessor]}</span>
          </>
        );
      case 'created_at':
        return <span>{formatCreatedAt(value[accessor])}</span>;
      case 'details':
        return (
          <button className="flex items-center cursor-pointer">
            <span>Show Details</span>
            <Image src={arrow} alt="arrow" />
          </button>
        );

      default:
        return <span>{value[accessor]}</span>;
    }
  };

  const [getProductById] = useGetProductByIdMutation();
  const [addCart] = useAddCartMutation();
  const [confirmProduct] = useConfirmProductMutation();

  // Check if 10 minutes have passed since the last event
  const canTrackEvent = useCallback(() => {
    if (!lastEventTime) return true;
    return Date.now() - lastEventTime >= 10 * 60 * 1000; // 10 minutes in ms
  }, [lastEventTime]);

  const handleStoneId = (e: any) => {
    if (e.target.value.length >= 1 && canTrackEvent()) {
      setLastEventTime(Date.now()); // Update the timestamp in state
      trackEvent({
        action: Tracking_Search_By_Text.search_by_text_initiated,
        category: 'SearchByText',
        mobile_number: customerMobileNumber
      });
    }
    dispatch(
      dashboardResultPage({
        stoneId: e.target.value
      })
    );

    setStoneId(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && stoneId.length > 0) {
      setIsLoading(true);
      if (dashboardResultPageData.searchType !== 'NewArrivals') {
        getProductById({
          search_keyword: dashboardResultPageData.stoneId,
          search_type: dashboardResultPageData.searchType
        })
          .unwrap()
          .then((res: any) => {
            setIsLoading(false);
            // setSearchData(res);
            // setIsDetailPage(true);

            setError('');
            setLastEventTime(null);
            trackEvent({
              action: Tracking_Search_By_Text.search_by_text_executed,
              category: 'SearchByText',
              mobile_number: customerMobileNumber,
              status: 'Success'
            });

            if (window?.dataLayer) {
              window.dataLayer.push({
                event: Tracking_Dashboard.click_enter_search_by_text,
                source_page: 'dashboard',
                user_id: customerData?.customer?.id,
                destination_page:
                  dashboardResultPageData.searchType === 'normal'
                    ? Tracking_Dashboard_Destination_Page.search_form_results
                    : Tracking_Dashboard_Destination_Page.bid_to_buy,
                stone_count: res?.foundProducts?.length,
                search_result: 'success'
              });
            }

            if (dashboardResultPageData.searchType === 'normal') {
              dispatch(
                dashboardResultPage({
                  resultPageData: res
                })
              );
              router.push(`${Routes.STOCK_SEARCH}?path=${Routes.DASHBOARD}`);
            } else if (dashboardResultPageData.searchType === 'BidToBuy') {
              dispatch(
                dashboardResultPage({
                  resultPageData: res,
                  stoneId: stoneId,
                  textSearchReportId: res.textSearchReportId
                })
              );
              router.push(Routes.BID_TO_BUY);
            }
          })
          .catch((_e: any) => {
            setIsLoading(false);
            setLastEventTime(null);
            trackEvent({
              action: Tracking_Search_By_Text.search_by_text_executed,
              category: 'SearchByText',
              mobile_number: customerMobileNumber,
              status: 'Fail'
            });

            if (window?.dataLayer) {
              window.dataLayer.push({
                event: Tracking_Dashboard.click_enter_search_by_text,
                source_page: 'dashboard',
                user_id: customerData?.customer?.id,
                destination_page:
                  dashboardResultPageData.searchType === 'normal'
                    ? Tracking_Dashboard_Destination_Page.search_form_results
                    : Tracking_Dashboard_Destination_Page.bid_to_buy,
                stone_count: 0,
                search_result: 'fail'
              });
            }

            if (
              _e?.status === statusCode.NOT_FOUND ||
              _e?.status === statusCode.INVALID_DATA
            ) {
              setError(`We couldn't find any results for this search`);
            } else if (_e?.status === statusCode.UNAUTHORIZED) {
              setError(_e?.data?.message?.message);
            } else {
              setError('Something went wrong');
            }
          });
      } else {
        if (window?.dataLayer) {
          window.dataLayer.push({
            event: Tracking_Dashboard.click_enter_search_by_text,
            source_page: 'dashboard',
            user_id: customerData?.customer?.id,
            destination_page: Tracking_Dashboard_Destination_Page.new_arrivals,
            stone_count: 0,
            search_result: 'success'
          });
        }

        router.push(`${Routes.NEW_ARRIVAL}`);
        setIsLoading(false);
      }
    }
  };
  const handleInputSearch = () => {
    if (stoneId.length > 0) {
      setIsLoading(true);
      if (dashboardResultPageData.searchType !== 'NewArrivals') {
        getProductById({
          search_keyword: dashboardResultPageData.stoneId,
          search_type: dashboardResultPageData.searchType
        })
          .unwrap()
          .then((res: any) => {
            setIsLoading(false);
            // setSearchData(res);
            // setIsDetailPage(true);
            if (window?.dataLayer) {
              window.dataLayer.push({
                event: Tracking_Dashboard.click_enter_search_by_text,
                source_page: 'dashboard',
                user_id: customerData?.customer?.id,
                destination_page:
                  dashboardResultPageData.searchType === 'normal'
                    ? Tracking_Dashboard_Destination_Page.search_form_results
                    : Tracking_Dashboard_Destination_Page.bid_to_buy,
                stone_count: res?.foundProducts?.length,
                search_result: 'success'
              });
            }
            setError('');
            setLastEventTime(null);
            trackEvent({
              action: Tracking_Search_By_Text.search_by_text_executed,
              category: 'SearchByText',
              mobile_number: customerMobileNumber,
              status: 'Success'
            });
            if (dashboardResultPageData.searchType === 'normal') {
              dispatch(
                dashboardResultPage({
                  resultPageData: res
                })
              );
              router.push(`${Routes.STOCK_SEARCH}?path=${Routes.DASHBOARD}`);
            } else if (dashboardResultPageData.searchType === 'BidToBuy') {
              dispatch(
                dashboardResultPage({
                  resultPageData: res,
                  stoneId: stoneId,
                  textSearchReportId: res.textSearchReportId
                })
              );
              router.push(Routes.BID_TO_BUY);
            }
          })
          .catch((_e: any) => {
            setIsLoading(false);
            setLastEventTime(null);
            trackEvent({
              action: Tracking_Search_By_Text.search_by_text_executed,
              category: 'SearchByText',
              mobile_number: customerMobileNumber,
              status: 'Fail'
            });
            if (window?.dataLayer) {
              window.dataLayer.push({
                event: Tracking_Dashboard.click_enter_search_by_text,
                source_page: 'dashboard',
                user_id: customerData?.customer?.id,
                destination_page:
                  dashboardResultPageData.searchType === 'normal'
                    ? Tracking_Dashboard_Destination_Page.search_form_results
                    : Tracking_Dashboard_Destination_Page.bid_to_buy,
                stone_count: 0,
                search_result: 'fail'
              });
            }
            if (
              _e?.status === statusCode.NOT_FOUND ||
              _e?.status === statusCode.INVALID_DATA
            ) {
              setError(`We couldn't find any results for this search`);
            } else if (_e?.status === statusCode.UNAUTHORIZED) {
              setError(_e?.data?.message?.message);
            } else {
              setError('Something went wrong');
            }
          });
      } else {
        if (window?.dataLayer) {
          window.dataLayer.push({
            event: Tracking_Dashboard.click_enter_search_by_text,
            source_page: 'dashboard',
            user_id: customerData?.customer?.id,
            destination_page: Tracking_Dashboard_Destination_Page.new_arrivals,
            stone_count: 0,
            search_result: 'success'
          });
        }
        router.push(`${Routes.NEW_ARRIVAL}`);
        setIsLoading(false);
      }
    } else {
      setError('Please enter stone id or certificate number');
    }
  };

  useEffect(() => {
    error &&
      setTimeout(() => {
        setError(''); // Hide the toast notification after some time
      }, 4000);
  }, [error]);

  useEffect(() => {
    if (window.OneSignal) {
      window.OneSignal.getUserId().then((userId: string | null) => {
        if (userId) {
          console.log('userId', userId);
          if (customerData) {
            let payload = {
              device_uuid: userId,
              platform_type: 'web',
              customer_id: customerData?.customer?.id
            };
            addDeviceUUID(payload)
              .unwrap()
              .then(res => {
                console.log(res);
              });
          }
        } else {
          console.log('User UUID not yet available.');
        }
      });
    }
  }, []);

  const goBack = () => {
    setIsDiamondDetail(false);
    setDetailPageData({});
  };

  const handleAddToCartDetailPage = () => {
    setIsLoading(true);

    // Extract variant IDs for selected stones
    const variantIds = [detailPageData?.id]
      ?.map((_id: string) => {
        if (detailPageData && 'variants' in detailPageData) {
          return detailPageData.variants[0]?.id;
        }
        return '';
      })
      ?.filter(Boolean);
    // If there are variant IDs, add to the cart
    if (variantIds.length) {
      trackEvent({
        action: Tracking_Search_By_Text.click_add_to_cart_dna_page,
        category: 'SearchByText',
        mobile_number: customerMobileNumber
      });
      addCart({
        variants: variantIds
      })
        .unwrap()
        .then((res: any) => {
          setIsLoading(false);
          setIsDialogOpen(true);
          setDialogContent(
            <CommonPoppup
              content=""
              status="success"
              customPoppupBodyStyle="mt-[70px]"
              header={res?.message}
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.modal.continue'),
                  handler: () => {
                    setIsDialogOpen(false);

                    dispatch(
                      dashboardResultPage({
                        isResultPage: false,
                        resultPageData: dashboardResultPageData?.resultPageData
                      })
                    );
                    // setIsDetailPage(false);
                  },
                  customStyle: 'flex-1 w-full h-10'
                },
                {
                  variant: 'primary',
                  label: 'Go to "My Cart"',
                  handler: () => {
                    router.push('/v2/my-cart');
                  },
                  customStyle: 'flex-1 w-full h-10'
                }
              ]}
            />
          );
          getProductById({
            search_keyword: stoneId
          })
            .unwrap()
            .then((res: any) => {
              // setIsLoading(false);
              // setSearchData(res);
              // setIsDetailPage(true);
              dispatch(
                dashboardResultPage({ isResultPage: true, resultPageData: res })
              );
              setError('');
            })
            .catch((_e: any) => {
              if (
                _e?.status === statusCode.NOT_FOUND ||
                _e?.status === statusCode.INVALID_DATA
              ) {
                setError(`We couldn't find any results for this search`);
              } else if (_e?.status === statusCode.UNAUTHORIZED) {
                setError(_e?.data?.message?.message);
              } else {
                setError('Something went wrong');
              }
            });
          // On success, show confirmation dialog and update badge
          setError('');
        })
        .catch((error: any) => {
          // On error, set error state and error message
          setIsLoading(false);
          setIsDialogOpen(true);
          setDialogContent(
            <CommonPoppup
              content=""
              customPoppupBodyStyle="mt-[70px]"
              header={error?.data?.message}
              actionButtonData={[
                {
                  variant: 'primary',
                  label: ManageLocales('app.modal.okay'),
                  handler: () => {
                    setIsDialogOpen(false);
                  },
                  customStyle: 'flex-1 w-full h-10'
                }
              ]}
            />
          );
        });
      // Clear the selected checkboxes
    }
  };

  const goBackToListView = (isFrom?: string) => {
    if (isFrom === 'Detail Page') {
      setIsDiamondDetail(true);
      setBreadCrumLabel('');
    }
    setRowSelection({});
    // setIsDetailPage(true);
    dispatch(
      dashboardResultPage({
        isResultPage: true,
        resultPageData: dashboardResultPageData?.resultPageData
      })
    );

    setIsConfirmStone(false);
    setConfirmStoneData([]);

    setBreadCrumLabel('Dashboard');

    if (isFrom !== 'Compare Stone') {
      setIsCompareStone(false);
      setCompareStoneData([]);
    }
  };

  const renderAddCommentDialogs = () => {
    return (
      <>
        {' '}
        <div className="flex flex-col gap-[15px] px-[24px] pt-[24px]">
          <div>
            <div className="flex justify-between pb-[16px]">
              <h1 className="text-headingS text-neutral900">
                {' '}
                {ManageLocales('app.modal.addComment')}
              </h1>
              <button
                onClick={() => {
                  setIsAddCommentDialogOpen(false);
                }}
              >
                <Image src={crossIcon} alt="crossIcon" />
              </button>
            </div>
            <p className="text-neutral600 text-mRegular">
              {ManageLocales('app.modal.addComment.content')}
            </p>
          </div>
          <div className="pt-[4px]">
            <textarea
              value={textAreaValue}
              name="textarea"
              rows={10}
              // placeholder='Write Description'
              className="w-full bg-neutral0 text-neutral900 rounded-[4px] resize-none focus:outline-none p-2 border-neutral-200 border-[1px] mt-2"
              style={{ boxShadow: 'var(--input-shadow) inset' }}
              onChange={e => handleComment(e, setTextAreaValue)}
            />
          </div>
        </div>
        <div
          className="border-t-neutral-200 border-t-[1px] rounded-b-[8px] p-[24px]"
          style={{ background: 'var(--neutral-25)' }}
        >
          <ActionButton
            actionButtonData={[
              {
                variant: 'secondary',
                label: ManageLocales('app.modal.addComment.saveComment'),
                handler: () => {
                  setCommentValue(textAreaValue);
                  setIsAddCommentDialogOpen(false);
                },
                customStyle: 'flex-1'
              },
              {
                variant: 'primary',
                label: 'Confirm Stone',
                handler: () => {
                  setIsAddCommentDialogOpen(false), confirmStone();
                },

                customStyle: 'flex-1'
              }
            ]}
          />
        </div>
      </>
    );
  };

  const handleDetailPage = ({ row }: { row: any }) => {
    if (isConfirmStone) {
      setBreadCrumLabel('Confirm Stone');
      setIsDiamondDetail(true);
      setIsError(false);
      setError('');
      setDetailPageData(row);

      trackEvent({
        action: Tracking_Search_By_Text.click_stone_dna_page,
        category: 'SearchByText',
        mobile_number: customerMobileNumber
      });
    } else {
      router.push(
        `/v2/${SubRoutes.Diamond_Detail}?path=${MatchRoutes.DASHBOARD}&stoneid=${row?.lot_id}-${row?.location}`
      );
    }
  };

  // const handleDetailImage = ({ row }: any) => {
  //   setDetailImageData(row);
  //   setIsModalOpen(true);
  // };
  // const handleDetailImageWithTrack = ({ row }: any) => {
  //   trackEvent({
  //     action: Tracking_Search_By_Text.click_stone_assets_result_page,
  //     category: 'SearchByText',
  //     mobile_number: customerMobileNumber
  //   });

  //   setDetailImageData(row);
  //   setIsModalOpen(true);
  // };
  const images = [
    {
      name: getShapeDisplayName(detailImageData?.shape ?? ''),
      url: `${FILE_URLS.IMG.replace(
        '***',

        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.IMG.replace(
        '***',

        detailImageData.location === 'USA-BD'
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

        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.B2B_DOWNLOAD_URL.replace(
        '***',

        detailImageData.location === 'USA-BD'
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

        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.B2B_SPARKLE_DOWNLOAD_URL.replace(
        '***',

        detailImageData.location === 'USA-BD'
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

        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.HEART.replace(
        '***',

        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Arrow',
      url: `${FILE_URLS.ARROW.replace(
        '***',

        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.ARROW.replace(
        '***',

        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Aset',
      url: `${FILE_URLS.ASET.replace(
        '***',

        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.ASET.replace(
        '***',

        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Ideal',
      url: `${FILE_URLS.IDEAL.replace(
        '***',

        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.IDEAL.replace(
        '***',

        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Fluorescence',
      url: `${FILE_URLS.FLUORESCENCE.replace(
        '***',

        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.FLUORESCENCE.replace(
        '***',

        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    }
  ];

  // const handleCreateAppointment = () => {
  //   let selectedIds = Object.keys(rowSelection);

  //   if (selectedIds.length > 0) {
  //     // const hasMemoOut = selectedIds?.some((id: string) => {
  //     //   const stone =
  //     //     dashboardResultPageData?.resultPageData?.foundProducts.find(
  //     //       (row: any) => row?.id === id
  //     //     );
  //     //   return stone?.diamond_status === MEMO_STATUS;
  //     // });

  //     const hasHold = selectedIds?.some((id: string) => {
  //       const stone: any =
  //         dashboardResultPageData?.resultPageData?.foundProducts.find(
  //           (row: IProduct) => row?.id === id
  //         );
  //       return stone?.diamond_status === HOLD_STATUS;
  //     });

  //     // Check for stones with AVAILABLE_STATUS
  //     const hasAvailable = selectedIds?.some((id: string) => {
  //       const stone: any =
  //         dashboardResultPageData?.resultPageData?.foundProducts.find(
  //           (row: IProduct) => row?.id === id
  //         );
  //       return stone?.diamond_status === AVAILABLE_STATUS;
  //     });

  //     if (hasHold && hasAvailable) {
  //       setError(SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH);
  //     }
  //     // else if (hasMemoOut) {
  //     //   setError(STONE_NOT_AVAILABLE_MODIFY_SEARCH);
  //     // }
  //     else if (hasHold) {
  //       setError(STONE_NOT_AVAILABLE_MODIFY_SEARCH);
  //     } else {
  //       trackEvent({
  //         action: Tracking_Search_By_Text.click_book_appointment_result_page,
  //         category: 'SearchByText',
  //         mobile_number: customerMobileNumber
  //       });

  //       setShowAppointmentForm(true);
  //       triggerAvailableSlots({}).then(payload => {
  //         let { data } = payload.data;
  //         setAppointmentPayload(data);
  //       });

  //       const lotIdsWithCountry = selectedIds?.map((id: string) => {
  //         const foundProduct: any =
  //           dashboardResultPageData?.resultPageData?.foundProducts.find(
  //             (row: IProduct) => row?.id === id
  //           ) ?? {};

  //         if (foundProduct) {
  //           const lotId = foundProduct?.lot_id;
  //           const country = foundProduct?.location; // assuming country is a property in foundProduct
  //           return `${lotId}(${country})`;
  //         }

  //         return '';
  //       });
  //       setLotIds(lotIdsWithCountry);
  //     }
  //   } else {
  //     setError(SELECT_STONE_TO_PERFORM_ACTION);
  //   }
  // };

  const refreshSearchResults = (showOnlyWithVideo: boolean) => {
    getProductById({
      search_keyword: stoneId,
      all_asset_required: showOnlyWithVideo
    })
      .unwrap()
      .then((res: any) => {
        setShowEmptyState(false);
        // setSearchData(res);
        // setIsDetailPage(true);
        dispatch(
          dashboardResultPage({ isResultPage: true, resultPageData: res })
        );
        setError('');
        setIsLoading(false);
        if (isDiamondDetail) {
          let detailPageUpdatedData = res.foundProducts.filter(
            (products: any) => {
              return products.id === detailPageData.id;
            }
          );
          handleDetailPage({ row: detailPageUpdatedData[0] });
        } else if (isCompareStone) {
          handleCompareStone({
            isCheck: rowSelection,
            setIsError,
            setErrorText: setError,
            activeCartRows: res.foundProducts,
            setIsCompareStone,
            setCompareStoneData
          });
        }
        setRowSelection({});
      })
      .catch((_e: any) => {
        if (
          _e?.status === statusCode.NOT_FOUND ||
          _e?.status === statusCode.INVALID_DATA
        ) {
          if (!showOnlyWithVideo) {
            setError(`We couldn't find any results for this search`);
          }
          setShowEmptyState(true);
        } else if (_e?.status === statusCode.UNAUTHORIZED) {
          setError(_e?.data?.message?.message);
        } else {
          setError('Something went wrong');
        }
      });
  };

  const confirmStoneApiCall = ({ variantIds }: { variantIds: string[] }) => {
    if (variantIds.length) {
      setIsLoading(true);
      confirmProduct({
        variants: variantIds,
        comments: commentValue,
        identifier: confirmTrack.confirmStoneTrack
          ? confirmTrack.confirmStoneTrack
          : 'Dashboard'
      })
        .unwrap()
        .then(res => {
          if (res) {
            setIsLoading(false);
            dispatch(setConfirmStoneTrack(''));

            setCommentValue('');
            setIsDialogOpen(true);
            const formatMessage = (message: string) => {
              return message.split('\n').map((line: string, index: number) => (
                <span key={index}>
                  <span dangerouslySetInnerHTML={{ __html: line }} />
                  <br />
                </span>
              ));
            };

            trackEvent({
              action: Tracking_Search_By_Text.order_executed_pop_up,
              category: 'SearchByText',
              mobile_number: customerMobileNumber,
              status:
                res.status === 'success'
                  ? 'Success'
                  : res.status === 'processing'
                  ? 'Processing'
                  : ''
            });

            setDialogContent(
              <CommonPoppup
                content={<div>{formatMessage(res.message)}</div>}
                status={
                  res.status === 'success'
                    ? 'success'
                    : res.status === 'processing'
                    ? 'info'
                    : ''
                }
                customPoppupBodyStyle="!mt-[70px]"
                header={res.title}
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.continue'),
                    handler: () => {
                      trackEvent({
                        action:
                          Tracking_Search_By_Text.click_continue_order_executed_pop_up,
                        category: 'SearchByText',
                        mobile_number: customerMobileNumber
                      });
                      goBackToListView();
                      // setIsDetailPage(false);
                      dispatch(
                        dashboardResultPage({
                          isResultPage: false,
                          resultPageData:
                            dashboardResultPageData?.resultPageData
                        })
                      );
                      setRowSelection({});
                      setError('');
                      setIsAddCommentDialogOpen(false);
                      setIsDialogOpen(false);
                      router.push('/v2');
                    },
                    customStyle: 'flex-1 w-full h-10'
                  },
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.goToYourOrder'),
                    handler: () => {
                      trackEvent({
                        action:
                          Tracking_Search_By_Text.click_go_to_your_order_order_executed_pop_up,
                        category: 'SearchByText',
                        mobile_number: customerMobileNumber
                      });
                      router.push('/v2/your-orders');
                    },
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            );

            setCommentValue('');

            // getProductById({
            //   search_keyword: stoneId
            // })
            //   .unwrap()
            //   .then((res: any) => {
            //     // setIsLoading(false);
            //     setSearchData(res);
            //     setRowSelection({});
            //     setError('');
            //     setIsDetailPage(true);
            //   })
            //   .catch((_e: any) => {
            //     if (_e?.status === statusCode.NOT_FOUND) {
            //       setError(`We couldn't find any results for this search`);
            //     } else if (_e?.status === statusCode.UNAUTHORIZED) {
            //       setError(_e?.data?.message?.message);
            //     } else {
            //       setError('Something went wrong');
            //     }
            //   });
          }
        })
        .catch(e => {
          setIsLoading(false);
          setCommentValue('');
          dispatch(setConfirmStoneTrack(''));

          if (e.data.type === 'unauthorized') {
            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content="To confirm a stone or make a purchase, KYC verification is
                mandatory. Without verification, access to certain
                features is restricted."
                customPoppupStyle="!h-[220px]"
                customPoppupBodyStyle="!mt-[62px]"
                header={'Important KYC Verification Required!'}
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.cancel'),
                    handler: () => setIsDialogOpen(false),
                    customStyle: 'w-full flex-1'
                  },
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.verifyMyKYCNow'),
                    handler: () => {
                      router.push('/v2/kyc');
                    },
                    customStyle: 'w-full flex-1'
                  }
                ]}
              />
            );
          } else {
            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content={''}
                customPoppupBodyStyle="mt-[70px]"
                header={e?.data?.message}
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => {
                      setIsDialogOpen(false);
                    },
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            );
          }
        });
    }
  };

  const checkLocation = ({
    kamLocation,
    variantIds
  }: {
    kamLocation: string;
    variantIds: string[];
  }) => {
    // Compare Stone locations with KAM location
    let locationMismatch = false;
    confirmStoneData.forEach((stones: any) => {
      const location = stones.location as keyof typeof STONE_LOCATION;
      if (
        STONE_LOCATION[location].toLowerCase() !== kamLocation.toLowerCase()
      ) {
        locationMismatch = true;
      }
    });
    if (locationMismatch) {
      trackEvent({
        action: Tracking_Search_By_Text.disclaimer_pop_up_opens,
        category: 'SearchByText',
        mobile_number: customerMobileNumber
      });
      setIsDialogOpen(true);
      setDialogContent(
        <CommonPoppup
          content={
            <div className="flex flex-col gap-1">
              <div>
                You are trying to confirm some of the stones from another
                region. This might lead to additional charges. By confirming
                your order, you acknowledge and agree to the following:
              </div>

              <div>
                <p>
                  {' '}
                  &#8226; Customs Duties and Taxes: You are responsible for
                  paying any applicable customs duties, taxes, and other charges
                  that may be incurred when importing stones from outside your
                  location.
                </p>

                <p>
                  {' '}
                  &#8226; Import Regulations: Ensure you are aware of and comply
                  with all relevant import regulations and requirements for your
                  region.
                </p>
                <p>
                  {' '}
                  &#8226; Delivery Times: Delivery times may vary due to customs
                  clearance procedures.
                </p>
              </div>
            </div>
          }
          status="warning"
          customPoppupStyle="!h-[475px]"
          customPoppupBodyStyle="!mt-[70px]"
          header={'Disclaimer'}
          actionButtonData={[
            {
              variant: 'secondary',
              label: ManageLocales('app.modal.cancel'),
              handler: () => setIsDialogOpen(false),
              customStyle: 'flex-1 w-full h-10'
            },
            {
              variant: 'primary',
              label: 'Confirm Order',
              handler: () => {
                trackEvent({
                  action:
                    Tracking_Search_By_Text.click_confirm_order_disclaimer_pop_up,
                  category: 'SearchByText',
                  mobile_number: customerMobileNumber
                });
                setIsDialogOpen(false);
                confirmStoneApiCall({ variantIds });
              },
              customStyle: 'flex-1 w-full h-10'
            }
          ]}
        />
      );
    } else {
      confirmStoneApiCall({ variantIds });
    }
  };

  const confirmStone = () => {
    const variantIds: string[] = [];

    trackEvent({
      action: Tracking_Search_By_Text.click_confirm_stone_confirm_page,
      category: 'SearchByText',
      mobile_number: customerMobileNumber
    });

    confirmStoneData.forEach((ids: any) => {
      variantIds.push(ids.variants[0].id);
    });

    checkLocation({
      kamLocation: customerData.customer.kam.location,
      variantIds
    });
    dispatch(kamLocationAction(customerData.customer.kam.location));
  };

  // const handleAddToCart = () => {
  //   let selectedIds = Object.keys(rowSelection);

  //   if (selectedIds.length > 300) {
  //     setIsError(true);
  //     setError(NOT_MORE_THAN_300);
  //   } else if (!selectedIds.length) {
  //     setIsError(true);
  //     setError(NO_STONES_SELECTED);
  //   } else {
  //     setIsLoading(true);
  //     const variantIds = selectedIds
  //       ?.map((id: string) => {
  //         const myCartCheck: IProduct | object | any =
  //           dashboardResultPageData?.resultPageData?.foundProducts.find(
  //             (row: IProduct) => {
  //               return row?.id === id;
  //             }
  //           ) ?? {};

  //         if (myCartCheck && 'variants' in myCartCheck) {
  //           return myCartCheck.variants[0]?.id;
  //         }
  //         return '';
  //       })
  //       ?.filter(Boolean);

  //     // If there are variant IDs, add to the cart
  //     if (variantIds.length) {
  //       trackEvent({
  //         action: Tracking_Search_By_Text.click_add_to_cart_result_page,
  //         category: 'SearchByText',
  //         mobile_number: customerMobileNumber
  //       });
  //       addCart({
  //         variants: variantIds
  //       })
  //         .unwrap()
  //         .then((res: any) => {
  //           setIsLoading(false);
  //           setIsDialogOpen(true);
  //           setDialogContent(
  //             <CommonPoppup
  //               content={''}
  //               status="success"
  //               customPoppupBodyStyle="mt-[70px]"
  //               header={res?.message}
  //               actionButtonData={[
  //                 {
  //                   variant: 'secondary',
  //                   label: ManageLocales('app.modal.continue'),
  //                   handler: () => {
  //                     setIsDialogOpen(false);
  //                     dispatch(
  //                       dashboardResultPage({
  //                         isResultPage: true,
  //                         resultPageData:
  //                           dashboardResultPageData?.resultPageData
  //                       })
  //                     );
  //                   },
  //                   customStyle: 'flex-1 w-full h-10 '
  //                 },
  //                 {
  //                   variant: 'primary',
  //                   label: 'Go to "My Cart"',
  //                   handler: () => {
  //                     router.push('/v2/my-cart');
  //                   },
  //                   customStyle: 'flex-1 w-full h-10'
  //                 }
  //               ]}
  //             />
  //           );

  //           // On success, show confirmation dialog and update badge
  //           setIsError(false);
  //           setError('');
  //           getProductById({
  //             search_keyword: stoneId
  //           })
  //             .unwrap()
  //             .then((res: any) => {
  //               // setSearchData(res);
  //               // setIsDetailPage(true);
  //               dispatch(
  //                 dashboardResultPage({
  //                   isResultPage: true,
  //                   resultPageData: res
  //                 })
  //               );
  //               setError('');
  //             })
  //             .catch((_e: any) => {
  //               if (
  //                 _e?.status === statusCode.NOT_FOUND ||
  //                 _e?.status === statusCode.INVALID_DATA
  //               ) {
  //                 setError(`We couldn't find any results for this search`);
  //               } else if (_e?.status === statusCode.UNAUTHORIZED) {
  //                 setError(_e?.data?.message?.message);
  //               } else {
  //                 setError('Something went wrong');
  //               }
  //             });
  //           dispatch(notificationBadge(true));

  //           // refetchRow();
  //         })
  //         .catch(error => {
  //           setIsLoading(false);
  //           // On error, set error state and error message

  //           setIsDialogOpen(true);
  //           setDialogContent(
  //             <CommonPoppup
  //               content={''}
  //               customPoppupBodyStyle="mt-[70px]"
  //               header={error?.data?.message}
  //               actionButtonData={[
  //                 {
  //                   variant: 'primary',
  //                   label: ManageLocales('app.modal.okay'),
  //                   handler: () => {
  //                     setIsDialogOpen(false);
  //                   },
  //                   customStyle: 'flex-1 w-full h-10'
  //                 }
  //               ]}
  //             />
  //           );
  //         });
  //       // Clear the selected checkboxes
  //       setRowSelection({});
  //     }
  //     // }
  //   }
  // };

  useEffect(() => {
    if (images?.length > 0 && images[0]?.name?.length)
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

  const getCardContent = (data: any) => {
    if (data.label === 'Bid to Buy') {
      if (data.start_at && data.count) {
        return (
          <div className="mt-1 flex items-center gap-2 rounded-[4px] px-1 h-[26px] bg-[#F1FAF8]">
            <Image src={BidHammer} alt="Bid to Buy" className="mb-2" />
            <p className="m-0 p-0 text-neutral-900 text-lRegular">
              Bid starts on {formatDateString(data.start_at)}
            </p>
          </div>
        );
      } else if (data.start_at && !data.count) {
        return (
          <div className="mt-1 flex items-center  gap-2 rounded-[4px] px-1 h-[26px] bg-[#F1FAF8]">
            <Image src={BidHammer} alt="Bid to Buy" className="mb-2" />
            <p className="m-0 p-0 text-neutral-900 sm:text-mMedium text-lRegular">
              Bid starts on {formatDateString(data.start_at)}
              {/* Stay tuned */}
            </p>
          </div>
        );
      } else if (!data.start_at && data.count > 0) {
        return (
          <div className="text-neutral-900 text-headingS">{data.count}</div>
        );
      }
    } else if (data.label === 'My Appointments') {
      if (data.count > 0) {
        return (
          <p className="text-headingS text-neutral900 font-medium">
            {formatDate(
              customerData?.customer?.latest_appointment?.appointment_at
            )}
          </p>
        );
      } else {
        return (
          <p className="text-headingS text-infoMain font-normal">Book Now</p>
        );
      }
    } else {
      return (
        <p className="text-neutral900 text-headingS font-medium">
          {data.isAvailable ? data.count : 'Coming Soon'}
        </p>
      );
    }
  };

  const storedValue = JSON.parse(localStorage.getItem('user_bid_states')!);

  const isPhoneExist = storedValue?.find(
    (user: any) => user.phone === customerData?.customer.phone
  );

  // const renderContactSalesTeamContent = () => {
  //   return (
  //     <>
  //       {' '}
  //       <div className="absolute left-[-84px] top-[-84px]">
  //         <Image src={contactIcon} alt="contactIcon" />
  //       </div>
  //       <div
  //         className="absolute cursor-pointer left-[400px] top-[39px]"
  //         onClick={() => {
  //           modalSetState.setIsInputDialogOpen(false);
  //         }}
  //       >
  //         <Image src={crossIcon} alt="crossIcon" />
  //       </div>
  //       <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[400px]">
  //         <div>
  //           <h1 className="text-headingS text-neutral900">
  //             {' '}
  //             {ManageLocales('app.contactSaleTeam.header')}
  //           </h1>
  //           <p className="text-neutral600 text-mRegular">
  //             {ManageLocales('app.contactSaleTeam.subHeader')}
  //           </p>
  //         </div>
  //         <div>
  //           <textarea
  //             value={contactSaleTeamInputValue}
  //             name="textarea"
  //             rows={5}
  //             className="w-full bg-neutral0 text-neutral700 rounded-[4px] resize-none focus:outline-none p-2 border-neutral-200 border-[1px] mt-2"
  //             style={{ boxShadow: 'var(--input-shadow) inset' }}
  //             onChange={e =>
  //               handleContactSaleTeam(e, setContactSaleTeamInputValue)
  //             }
  //           />
  //         </div>

  //         <div className="flex flex-col  gap-2">
  //           <ActionButton
  //             actionButtonData={[
  //               {
  //                 variant: 'secondary',
  //                 label: 'Email',
  //                 handler: () => {
  //                   const customerDetail = JSON.parse(
  //                     localStorage.getItem('user')!
  //                   );
  //                   // Email subject and body
  //                   const emailSubject = 'Completing KYC to Access Pricing';
  //                   const emailBody = contactSaleTeamInputValue;

  //                   // Create mailto URL
  //                   const mailtoURL = `mailto:${encodeURIComponent(
  //                     customerDetail?.customer?.kam?.email
  //                   )}?cc=${encodeURIComponent(
  //                     'shashank.giri@kgkmail.com'
  //                   )}&subject=${encodeURIComponent(
  //                     emailSubject
  //                   )}&body=${encodeURIComponent(emailBody)}`;

  //                   // Open the user's default email client
  //                   window.location.href = mailtoURL;
  //                 },
  //                 isDisable: !contactSaleTeamInputValue.length,
  //                 customStyle: 'flex-1'
  //               },
  //               {
  //                 variant: 'primary',
  //                 label: 'WhatsApp',
  //                 isDisable: !contactSaleTeamInputValue.length,
  //                 handler: () => {
  //                   const encodedMessage = encodeURIComponent(
  //                     contactSaleTeamInputValue
  //                   );

  //                   // WhatsApp URL with all links
  //                   const whatsappURL = `https://wa.me/?text=${encodedMessage}`;

  //                   // Open WhatsApp in a new tab or window
  //                   window.open(whatsappURL, '_blank');
  //                 },
  //                 customStyle: 'flex-1'
  //               }
  //             ]}
  //           />
  //           <div className="text-center">or</div>
  //           <ActionButton
  //             actionButtonData={[
  //               {
  //                 variant: 'secondary',
  //                 label: 'Request Callback',
  //                 handler: () => {
  //                   triggerRequestCallTimeSlots({}).then(res => {
  //                     let { data } = res.data;

  //                     setRequestCallTimeSlots(data);
  //                     setSelectedDate(Number(data.timeSlots.dates[0].date));
  //                     setSelectedSlot('');
  //                   });
  //                 },
  //                 customStyle: 'flex-1 w-full'
  //               }
  //             ]}
  //           />
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      {error !== '' && (
        <Toast show={error !== ''} message={error} isSuccess={false} />
      )}

      {/* <InputDialogComponent
        isOpen={modalState.isInputDialogOpen}
        onClose={() => modalSetState.setIsInputDialogOpen(false)}
        renderContent={
          Object.keys(requestCallTimeSlots)?.length > 0
            ? renderRequestCallTimeSlot
            : renderContactSalesTeamContent
        }
        dialogStyle={
          Object.keys(requestCallTimeSlots)?.length > 0
            ? '!max-w-[376px]'
            : '!min-h-[470px] !max-w-[450px]'
        }
      /> */}

      {/* <ImageModal
        setIsLoading={setIsLoading}
        isOpen={isModalOpen}
        stockNumber={detailImageData?.lot_id ?? ''}
        trackIdentifier={isResultPageDetails ? 'resultPageDetails' : ''}
        customerMobileNumber={customerMobileNumber}
        onClose={() => {
          setValidImages([]);
          setDetailImageData({});
          setIsModalOpen(!isModalOpen);
          setIsResultPageDetails(false);
        }}
        images={validImages}
      /> */}
      <DialogComponent dialogContent={dialogContent} isOpens={isDialogOpen} />
      {isLoading && <CustomKGKLoader />}
      <AddCommentDialog
        isOpen={isAddCommentDialogOpen}
        onClose={() => setIsAddCommentDialogOpen(false)}
        renderContent={renderAddCommentDialogs}
      />

      {isDiamondDetail && detailPageData?.length ? (
        <div className="mt-[16px]">
          {isGemTrac ? (
            <GemTracPage
              breadCrumLabel={'Search Results'}
              setIsGemTrac={setIsGemTrac}
              setGemTracData={setGemTracData}
              gemTracData={gemTracData}
              goBackToListView={goBack}
            />
          ) : (
            <>
              <DiamondDetailsComponent
                data={dashboardResultPageData?.resultPageData?.foundProducts}
                filterData={detailPageData}
                goBackToListView={goBack}
                handleDetailPage={handleDetailPage}
                breadCrumLabel={
                  breadCrumLabel.length && breadCrumLabel !== 'Dashboard'
                    ? breadCrumLabel
                    : 'Search Results'
                }
                identifier={dashboardIndentifier}
                modalSetState={modalSetState}
                setIsLoading={setIsLoading}
                setIsDiamondDetailLoading={setIsDiamondDetailLoading}
                customerMobileNumber={customerMobileNumber}
                setIsGemTrac={setIsGemTrac}
                setGemTracData={setGemTracData}
                triggerGemTracApi={triggerGemTracApi}
              />
              <div className="p-[8px] flex justify-end items-center border-t-[1px] border-l-[1px] border-neutral-200 gap-3 rounded-b-[8px] shadow-inputShadow mb-1">
                {isDiamondDetailLoading ? (
                  <>
                    {' '}
                    <Skeleton
                      width={128}
                      sx={{ bgcolor: 'var(--neutral-200)' }}
                      height={40}
                      variant="rectangular"
                      animation="wave"
                      className="rounded-[4px]"
                    />{' '}
                    <Skeleton
                      width={128}
                      sx={{ bgcolor: 'var(--neutral-200)' }}
                      height={40}
                      variant="rectangular"
                      animation="wave"
                      className="rounded-[4px]"
                    />
                    <Skeleton
                      width={40}
                      sx={{ bgcolor: 'var(--neutral-200)' }}
                      height={40}
                      variant="rectangular"
                      animation="wave"
                      className="rounded-[4px]"
                    />
                  </>
                ) : (
                  <>
                    <ActionButton
                      actionButtonData={[
                        {
                          variant: 'secondary',
                          // variant: isConfirmStone ? 'primary' : 'secondary',
                          label: ManageLocales('app.searchResult.addToCart'),
                          handler: handleAddToCartDetailPage
                        },

                        {
                          variant: 'primary',
                          label: ManageLocales('app.searchResult.confirmStone'),
                          // isHidden: isConfirmStone,
                          handler: () => {
                            // setIsDetailPage(false);
                            dispatch(
                              dashboardResultPage({
                                isResultPage: false,
                                resultPageData:
                                  dashboardResultPageData?.resultPageData
                              })
                            );
                            const { id } = detailPageData;
                            const selectedRows = { [id]: true };
                            trackEvent({
                              action:
                                Tracking_Search_By_Text.click_confirm_stone_dna_page,
                              category: 'SearchByText',
                              mobile_number: customerMobileNumber
                            });
                            handleConfirmStone({
                              selectedRows: selectedRows,
                              rows: dashboardResultPageData?.resultPageData
                                ?.foundProducts,
                              setIsError,
                              setErrorText: setError,
                              setIsConfirmStone,
                              setConfirmStoneData,
                              setIsDetailPage: setIsDiamondDetail,
                              identifier: 'detailPage',
                              confirmStoneTrack: 'DNA',
                              dispatch,
                              router,
                              modalSetState,
                              checkProductAvailability,
                              setIsLoading,
                              refreshSearchResults
                            });
                          }
                        }
                      ]}
                    />
                    <Dropdown
                      dropdownTrigger={
                        <Image
                          src={threeDotsSvg}
                          alt="threeDotsSvg"
                          width={4}
                          height={43}
                        />
                      }
                      dropdownMenu={[
                        {
                          label: ManageLocales(
                            'app.search.actionButton.bookAppointment'
                          ),
                          handler: () => {},
                          commingSoon: true
                        }
                      ]}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          className={`flex flex-col gap-4 ${
            isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
              ? 'h-[87vh]'
              : 'h-[92vh]'
          } `}
        >
          {' '}
          <div className="flex flex-col gap-4 mb-[20px]">
            <div
              className={`bg-cover ml-[-20px] mr-[-16px]  bg-no-repeat flex justify-center flex-col items-center h-[126px] gap-5`}
              style={{
                backgroundImage:
                  customerData === undefined || !customerData?.customer?.id
                    ? ''
                    : 'url(/gradient.png)'
              }}
            >
              {customerData !== undefined ? (
                <div className="relative">
                  {/* Overlay Background */}
                  {showRadios && (
                    <div
                      className="fixed inset-0 bg-[#101828] opacity-40 z-[100]"
                      onClick={() => setShowRadios(false)} // Close overlay when clicking outside
                    ></div>
                  )}
                  {showRadios && (
                    <div
                      style={{
                        width: `${inputWidth + 8}px`, // Dynamic width applied here.
                        transition: 'width 0.3s ease' // Smooth transition for width change.
                      }}
                      className="absolute bg-white  z-[100] h-[110px] w-[728px] top-[-5px] right-[-4px] rounded-[4px]"
                      onClick={() => setShowRadios(false)} // Close overlay when clicking outside
                    ></div>
                  )}
                  <div
                    className={`relative ${
                      showRadios && 'z-[110]'
                    } flex flex-col items-start bg-neutral0 rounded-[4px] overflow-hidden border-[1px] border-primaryBorder px-2 py-2`}
                    style={{
                      width: `${inputWidth}px`, // Dynamic width applied here.
                      transition: 'width 0.3s ease' // Smooth transition for width change.
                    }}
                  >
                    {/* Input Box */}
                    <div className="relative flex w-full items-center">
                      <input
                        className="pr-[77px] py-1 w-full text-neutral900 rounded-lg focus:outline-none"
                        type="text"
                        placeholder="Search by stone id or certificate number"
                        onClick={() => {
                          window.dataLayer.push({
                            event: Tracking_Dashboard.click_search_by_text,
                            source_page: 'dashboard',
                            user_id: customerData?.customer?.id
                          });
                          setShowRadios(!showRadios);
                        }} // Show radios on input click
                        onChange={handleStoneId}
                        onKeyDown={handleKeyDown}
                        value={dashboardResultPageData.stoneId}
                      />
                      {dashboardResultPageData?.stoneId?.length ? (
                        <>
                          <div
                            className="absolute flex items-center right-[42px] cursor-pointer rounded-[4px]"
                            onClick={() => {
                              dispatch(
                                dashboardResultPage({
                                  stoneId: ''
                                })
                              );
                            }}
                          >
                            <Image
                              src={crossIcon}
                              alt="crossIcon"
                              className="mr-1"
                            />
                            <hr className="h-[24px] w-[1px] bg-neutral200 border-0" />
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                      <div
                        className="absolute right-0 cursor-pointer rounded-[4px]"
                        onClick={handleInputSearch}
                      >
                        <Image
                          src={!showRadios ? searchIconWhite : searchIcon}
                          alt="searchIcon"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Custom Radio Buttons */}
                  {showRadios && (
                    <>
                      {/* Absolute Radio Buttons */}
                      <div className="absolute  left-0 w-full bg-white shadow-lg z-[110] rounded-[4px] px-2 py-[7px]">
                        <div className="text-neutral400 text-sRegular pb-[4px]">
                          Search From
                        </div>
                        <div className="flex gap-4">
                          {radioOptions.map(option => (
                            <RadioButton
                              key={option.value}
                              radioMetaData={{
                                label: option.label,
                                value: option.value,
                                name: option.name,
                                disabled: option.disable,
                                checked:
                                  dashboardResultPageData.searchType ===
                                  option.value
                              }}
                              onChange={handleRadioChange}
                              customStyle={{
                                radio: '!text-mMedium !text-neutral900'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Skeleton
                  width={720}
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  variant="rectangular"
                  height={54}
                  animation="wave"
                  className="rounded-[4px]"
                />
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
              {customerData === undefined || !customerData?.customer?.id
                ? Array(4)
                    .fill(null)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="flex rounded-[8px] w-full gap-4 shadow-sm"
                      >
                        <Skeleton
                          width={'100%'}
                          sx={{ bgcolor: 'var(--neutral-200)' }}
                          height={97}
                          variant="rectangular"
                          animation="wave"
                          className="rounded-[4px]"
                        />
                      </div>
                    ))
                : options.map((data, index) => (
                    <div
                      className={`border-[1px] border-neutral200 p-[24px] flex rounded-[8px] w-full gap-4 hover:border-accentTeal shadow-sm ${
                        data.isKycNotVerified
                          ? 'cursor-not-allowed'
                          : data.isAvailable
                          ? 'cursor-pointer'
                          : 'cursor-default'
                      }`}
                      key={index}
                      onClick={
                        data.isKycNotVerified
                          ? () => {}
                          : data.isAvailable
                          ? () => {
                              if (
                                data.link === Routes.NEW_ARRIVAL ||
                                data.link === Routes.BID_TO_BUY ||
                                data.link === Routes.MY_APPOINTMENTS ||
                                data.link === Routes.MY_CART
                              ) {
                                sessionStorage.setItem(
                                  'source_page',
                                  'dashboard'
                                );
                                sessionStorage.setItem(
                                  'is_side_navigation_bar',
                                  JSON.stringify(false)
                                );
                              }
                              router.push(data.link);
                            }
                          : () => {}
                      }
                    >
                      <div
                        style={{ background: data.color }}
                        className={`${data.color} p-3 rounded-[4px] h-[48px]`}
                      >
                        {data.icon}
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between items-baseline">
                          <p className="text-neutral600 text-mRegular">
                            {data.label}
                            {data.label === 'My Appointments' &&
                              data.count > 0 &&
                              ` (${data.count})`}
                          </p>
                          {data.label === 'Bid to Buy' &&
                            (!data?.start_at && data?.count > 0 ? (
                              <div className="text-successMain text-sMedium">
                                ACTIVE
                              </div>
                            ) : (
                              <div className="text-visRed text-sMedium">
                                INACTIVE
                              </div>
                            ))}
                        </div>
                        {getCardContent(data)}
                      </div>
                    </div>
                  ))}
            </div>
            {tabs.length > 0 && (
              <div className="flex gap-4 ">
                {customerData === undefined || !customerData?.customer?.id ? (
                  <Skeleton
                    height={400}
                    width={'100%'}
                    sx={{ bgcolor: 'var(--neutral-200)' }}
                    animation="wave"
                    variant="rectangular"
                    className="rounded-[4px]"
                  />
                ) : (
                  <div className="w-full overflow-auto border-[1px] border-neutral200 rounded-[8px] flex-1 flex-shrink min-w-0">
                    <div className="border-b-[1px] border-neutral200 p-3">
                      <div className="flex border-b-[1px] border-neutral200 w-full ml-1 text-mMedium font-medium justify-between pr-4">
                        <div>
                          <div className="relative inline-block">
                            {tabs.map(({ label, count }: any) => {
                              return (
                                <button
                                  className={`p-2 ${
                                    activeTab === label
                                      ? 'text-neutral900 border-b-[2px] border-primaryMain'
                                      : 'text-neutral600 '
                                  }`}
                                  key={label}
                                  onClick={() => handleTabs({ tab: label })}
                                >
                                  <div className="flex gap-1">
                                    {label}
                                    <p>{'(' + count + ')'}</p>
                                    <Image
                                      onMouseEnter={() =>
                                        label === 'Pending'
                                          ? setIsHovered(
                                              'Your order is being processed by the sales team.'
                                            )
                                          : setIsHovered(
                                              'Your order has been confirmed and your invoice has been generated by the sales team.'
                                            )
                                      }
                                      onMouseLeave={() => setIsHovered('')}
                                      src={infoSvg}
                                      alt="order meta data"
                                    />
                                  </div>
                                </button>
                              );
                            })}
                            {isHovered !== '' && (
                              <div className="absolute bg-[#ECF2FC] w-[320px] border-[1px] border-[#B6CFF3] rounded-[8px] p-4 text-[#475467] left-0  gap-2 right-[0px] ">
                                <div className="flex flex-col gap-2">
                                  <div className="flex gap-1 items-center">
                                    <Image src={infoHover} alt="your orders" />{' '}
                                    <p className="text-neutral900 font-medium text-mMedium">
                                      Information
                                    </p>
                                  </div>
                                  <p className="text-neutral600 text-[14px]">
                                    {isHovered}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <Link
                          href={redirectLink()}
                          className="cursor-pointer text-infoMain text-sRegular flex items-center"
                        >
                          View All
                        </Link>
                      </div>
                    </div>
                    <div className="p-4 ">
                      {(activeTab === 'In-transit' ||
                        activeTab === 'Pending') && (
                        <div className="max-w-full overflow-x-auto border-[1px] border-neutral200">
                          {/* header */}
                          <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] text-mMedium h-[47px] border-b border-neutral200 bg-neutral50 text-neutral700">
                            {keys?.map(({ label }: any) => (
                              <div
                                key={label}
                                className="p-4 text-left font-medium"
                              >
                                {label}
                              </div>
                            ))}
                          </div>
                          {/* rows */}
                          <div className="">
                            {data?.length > 0 ? (
                              data?.map((items: any) => (
                                <div
                                  key={items.order_id}
                                  onClick={() => {
                                    if (window?.dataLayer) {
                                      window.dataLayer.push({
                                        event:
                                          Tracking_Dashboard.click_individual_order,
                                        source_page: 'dashboard',
                                        user_id: customerData?.customer?.id,
                                        destination_page:
                                          Tracking_Dashboard_Destination_Page.individual_order,
                                        order_id: items.id,
                                        order_type:
                                          activeTab === 'In-transit'
                                            ? 'in_transit'
                                            : 'pending'
                                      });
                                    }

                                    if (activeTab === 'In-transit') {
                                      router.push(
                                        `/v2/your-orders?path=${IN_TRANSIT}&id=${items?.id}`
                                      );
                                    } else {
                                      router.push(
                                        `/v2/your-orders?id=${items?.id}`
                                      );
                                    }
                                    //  handleShowDetails(items?.id);
                                  }}
                                  className="cursor-pointer grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] bg-neutral0 border-b border-neutral-200 hover:bg-neutral-50"
                                >
                                  {keys?.map(
                                    ({ accessor }: any, index: number) => (
                                      <div
                                        key={index}
                                        className="flex items-center text-lRegular space-x-2 py-3 pr-3 pl-4 text-left text-gray-800"
                                      >
                                        {renderCellContent(accessor, items)}
                                      </div>
                                    )
                                  )}
                                </div>
                              ))
                            ) : (
                              // <> <div className="min-h-[73vh] h-[65vh]">
                              <EmptyScreen
                                label="Search Diamonds"
                                onClickHandler={() =>
                                  router.push(
                                    `/v2/search?active-tab=${SubRoutes.NEW_SEARCH}`
                                  )
                                }
                                contentReactNode={
                                  <p className="text-neutral900  w-[17%] text-center">
                                    Looks like you haven't placed any orders
                                    yet. Let’s place some orders!
                                  </p>
                                }
                                imageSrc={emptyOrderSvg}
                              />
                            )}
                          </div>
                        </div>
                      )}
                      {/* </div> */}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4 ">
              {customerData === undefined || !customerData?.customer?.id ? (
                <Skeleton
                  height={420}
                  width={'100%'}
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  animation="wave"
                  variant="rectangular"
                  className="rounded-[4px]"
                />
              ) : (
                <div className="w-full h-[420px] overflow-auto border-[1px] border-neutral200 rounded-[8px] flex-1 flex-shrink min-w-0">
                  <div className="border-b-[1px] border-neutral200 p-3">
                    <div className="flex  w-full ml-1 text-mMedium font-medium justify-between pr-4">
                      <div>
                        <button
                          className={`${'text-neutral900 border-primaryMain'}`}
                          key={'Saved Search'}
                        >
                          Saved Search{' '}
                        </button>
                      </div>
                      <Link
                        href={'v2/search?active-tab=saved-search'}
                        onClick={() => {
                          sessionStorage.setItem('source_page', 'dashboard');
                          sessionStorage.setItem(
                            'is_side_navigation_bar',
                            JSON.stringify(false)
                          );
                        }}
                        className="cursor-pointer text-infoMain text-sRegular flex items-center"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                  <div className="p-[10px] ">
                    {savedSearchData.length > 0 ? (
                      savedSearchData?.map((searchData: any, index: number) => {
                        const gradientIndex = index % gradientClasses.length;
                        // Get the gradient class for the calculated index
                        const gradientClass = gradientClasses[gradientIndex];
                        return (
                          <div
                            className="p-[10px] flex flex-col md:flex-row w-full border-[1px] border-neutral200 cursor-pointer group hover:bg-neutral50"
                            key={searchData?.id}
                            onClick={() =>
                              handleCardClick({
                                id: searchData.id,
                                savedSearchData: [searchData],
                                router,
                                triggerProductCountApi:
                                  searchData.is_matching_pair
                                    ? triggerMatchingPairCountApi
                                    : triggerProductCountApi,
                                setDialogContent,
                                setIsDialogOpen,
                                isMatchingPair: searchData.is_matching_pair,
                                setIsLoading,
                                trackEvent: true,
                                customerData
                              })
                            }
                          >
                            <div className="flex items-center gap-[18px] md:w-[40%]">
                              <div
                                className={` ${gradientClass} text-headingM w-[69px] h-[69px] text-neutral700 uppercase p-[14px] rounded-[4px] font-medium text-center`}
                              >
                                {searchData.name
                                  ?.split(' ') // Split the name into words
                                  .slice(0, 2)
                                  .map((word: string) => word.charAt(0)) // Extract the first character of each word
                                  .join('')}
                              </div>
                              <div className="flex flex-col gap-[4px]">
                                <h1 className="text-neutral900 font-medium text-mMedium capitalize">
                                  {searchData.name}
                                </h1>
                                <div className="text-neutral700 font-regular text-sMedium">
                                  {formatCreatedAt(searchData.created_at)}
                                </div>
                                {searchData.is_matching_pair && (
                                  <div
                                    className="h-[20px] rounded-[2px] border-[1px] border-neutral200 px-[6px] py-[1px] text-neutral600 text-[10px] w-[90px] flex items-center justify-around"
                                    style={{
                                      background:
                                        'linear-gradient(0deg, #EDF0F6 0%,  #FCFDFF 100%)'
                                    }}
                                  >
                                    <Image
                                      src={matchPairIcon}
                                      alt="matchPairIcon"
                                    />
                                    Match Pair
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="w-full md:w-[60%] mt-4 md:mt-0">
                              <DisplayTable
                                column={column}
                                row={[searchData.meta_data]}
                              />
                            </div>
                            <button
                              className="w-full md:w-[10%] flex justify-end items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={e => {
                                e.stopPropagation();
                                handleEdit(
                                  searchData.id,
                                  searchData.is_matching_pair
                                );
                              }}
                            >
                              <Image src={editIcon} alt="editIcon" />
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <EmptyScreen
                        label="Search Diamonds"
                        contentReactNode={
                          <p className="text-neutral900  w-[17%] text-center">
                            No saved searches so far. Let’s save some searches!
                          </p>
                        }
                        onClickHandler={() =>
                          router.push(
                            `/v2/search?active-tab=${SubRoutes.NEW_SEARCH}`
                          )
                        }
                        imageSrc={empty}
                      />
                    )}
                  </div>
                </div>
              )}
              <div className="w-[300px]">
                {customerData === undefined || !customerData?.customer?.id ? (
                  <Skeleton
                    height={420}
                    width={300}
                    animation="wave"
                    sx={{ bgcolor: 'var(--neutral-200)' }}
                    variant="rectangular"
                    className="rounded-[4px]"
                  />
                ) : (
                  <VolumeDiscount
                    totalSpent={
                      customerData?.customer?.volumeDiscount?.totalSpent
                    }
                    expiryTime={
                      // '2024-06-05T08:36:00.118Z'
                      customerData?.customer?.volumeDiscount?.expiryTime
                    }
                    eligibleForDiscount={
                      customerData?.customer?.volumeDiscount
                        ?.eligibleForDiscount
                    }
                  />
                )}
              </div>
            </div>

            <div className="flex w-full gap-4 h-[400px]">
              {' '}
              {/* Ensure the container takes up full width */}
              {/* Carousel Container - Allow it to shrink if necessary but also give it an initial width */}
              <div className="flex-1 flex-shrink min-w-0 border-[1px] border-neutral50">
                {customerData !== undefined ? (
                  <DashboardCarousel
                    images={customerData?.customer?.carousel_items}
                    router={router}
                    customerData={customerData}
                  />
                ) : (
                  <Skeleton
                    animation="wave"
                    width={'100%'}
                    variant="rectangular"
                    height={400}
                    sx={{ bgcolor: 'var(--neutral-200)' }}
                    className="rounded-[4px]"
                  />
                )}
              </div>
              {/* KAMCard Container - Prevent it from shrinking and assign a max width */}
              <div className="flex-shrink-0 w-[300px] max-w-full">
                {customerData === undefined || !customerData?.customer?.id ? (
                  <Skeleton
                    animation="wave"
                    width={'100%'}
                    variant="rectangular"
                    height={400}
                    sx={{ bgcolor: 'var(--neutral-200)' }}
                    className="rounded-[4px]"
                  />
                ) : (
                  <KAMCard
                    name={customerData?.customer.kam?.kam_name ?? '-'}
                    role={
                      customerData?.customer.kam?.post ?? 'Key Account Manager'
                    }
                    location={customerData?.customer.kam?.location ?? '-'}
                    phoneNumber={customerData?.customer.kam?.phone ?? '-'}
                    email={customerData?.customer.kam?.email ?? '-'}
                    image={customerData?.customer.kam?.image ?? ''}
                    customerData={customerData}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className={`  border-t-[1px] mt-auto border-l-[1px] border-r-[1px] rounded-[8px] p-4 flex justify-between border-neutral200 text-lRegular`}
          >
            {/* for fixed footer */}
            {/* fixed bottom-0 left-[84px] right-0 bg-white  */}
            <div className="text-infoMain  flex gap-6 cursor-pointer">
              <p
                onClick={() => {
                  if (window?.dataLayer) {
                    window.dataLayer.push({
                      event: Tracking_Dashboard.click_terms_and_conditions,
                      source_page: 'dashboard',
                      user_id: customerData?.customer?.id,
                      destination_page:
                        Tracking_Dashboard_Destination_Page.terms_and_conditions
                    });
                  }
                  router.push('/v2/my-account?path=terms-and-conditions');
                }}
              >
                Terms & Conditions
              </p>
              <p
                onClick={() => {
                  {
                    if (window?.dataLayer) {
                      window.dataLayer.push({
                        event: Tracking_Dashboard.click_privacy_policy,
                        source_page: 'dashboard',
                        user_id: customerData?.customer?.id,
                        destination_page:
                          Tracking_Dashboard_Destination_Page.privacy_policy
                      });
                    }
                    router.push('/v2/my-account?path=privacy-policy');
                  }
                }}
              >
                Privacy Policy
              </p>
            </div>
            <p className="text-neutral500">
              Copyright © {new Date().getFullYear()} KGK Diamonds. All rights
              reserved.
            </p>
          </div>
          {!isPhoneExist &&
            isKycVerified?.customer?.kyc?.status === kycStatus.APPROVED &&
            !customerData?.customer?.bid_to_buy?.starts_at &&
            customerData?.customer?.bid_to_buy?.count > 0 && (
              <div className="h-4">..</div>
            )}
          {!isPhoneExist &&
            isKycVerified?.customer?.kyc?.status === kycStatus.APPROVED &&
            !customerData?.customer?.bid_to_buy?.starts_at &&
            customerData?.customer?.bid_to_buy?.count > 0 && (
              <div className={` relative`}>
                {/* Footer */}
                <div
                  className={`bg-neutral50 flex items-center border-neutral200 border-[1px] border-solid rounded-t-[4px] px-4 py-1 fixed bottom-0 left-[100px] z-3  w-[calc(100vw-118px)] mx-auto transition-transform duration-300 ${
                    isBottomSheetOpen ? 'translate-y-[-291px]' : ''
                  }`}
                  style={{
                    boxShadow: '0px -16px 14px 0px hsla(0, 0%, 48%, 0.1)'
                  }}
                >
                  {/* Content Section */}
                  <div className="flex items-center gap-2 flex-grow justify-center">
                    <Image
                      src={BidHammer}
                      alt="BidHammer"
                      className="h-[20px]"
                    />
                    <div className="text-neutral900 text-[500]">
                      <span className="font-bold">Bid to Buy</span> - Monthly
                      Opportunity to Secure Diamonds at Exclusive Prices!
                    </div>
                  </div>

                  {/* Chevron Button */}
                  <div onClick={toggleBottomSheet} className="cursor-pointer">
                    <Image
                      src={isBottomSheetOpen ? chevronUp : chevronDown}
                      alt="Chevron"
                    />
                  </div>
                </div>

                {/* Bottom Sheet */}
                <div
                  className={` fixed bottom-0 left-[100px] right-0 z-40 bg-neutral25 border-solid border-[1px] border-t-0 border-neutral200 p-4 max-h-[293px] w-[calc(100vw-118px)] overflow-y-auto shadow-lg transition-transform duration-300 ${
                    isBottomSheetOpen ? 'translate-y-0' : 'translate-y-[100%]'
                  }`}
                >
                  <div className="text-center py-[7px]">
                    {/* Centered Text Container */}
                    <div className="max-w-[700px] mx-auto">
                      <h3
                        className={`${cardo.className} text-[24px] font-normal`}
                      >
                        Bid Upto{' '}
                        <span className="text-[28px] font-bold">5%</span> EXTRA
                        off on P/cts value!
                      </h3>
                      <h1
                        className={`${cardo.className} text-neutral900 text-headingXL font-medium `}
                      >
                        Bid To Buy
                      </h1>
                      <p className="text-neutral900 text-mRegular font-normal pb-3">
                        Every month, we offer you the chance to bid on selected
                        diamonds, available at prices up to 5% cheaper than
                        usual. Browse the stones, place your bids, and secure
                        the best deals on the market. Track your active bids and
                        review bid history to stay informed and take advantage
                        of this exclusive monthly event!
                      </p>
                      <IndividualActionButton
                        onClick={() => {
                          router.push('/v2/bid-2-buy');
                        }}
                        variant={'primary'}
                        size={'custom'}
                        className={`${cardo.className} rounded-[4px] w-[207px] h-[56px] z-[1]`}
                      >
                        BID NOW
                      </IndividualActionButton>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
    </>
  );
};

export default Dashboard;

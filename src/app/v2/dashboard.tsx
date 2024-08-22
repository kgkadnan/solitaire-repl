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
import fireSvg from '@public/v2/assets/icons/data-table/fire-icon.svg';
import { useEffect, useMemo, useState } from 'react';
import searchIcon from '@public/v2/assets/icons/data-table/search-icon.svg';
import noImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import editIcon from '@public/v2/assets/icons/saved-search/edit-button.svg';
import threeDotsSvg from '@public/v2/assets/icons/threedots.svg';
import BidHammer from '@public/v2/assets/icons/dashboard/bid-hammer.svg';
import Image from 'next/image';
import { handleCardClick } from './search/saved-search/helpers/handle-card-click';
import {
  useConfirmProductMutation,
  useGetProductByIdMutation,
  useLazyGetProductCountQuery
} from '@/features/api/product';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { formatCreatedAt } from '@/utils/format-date';
import { DisplayTable } from '@/components/v2/common/display-table';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
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
import { IManageListingSequenceResponse, IProduct } from './search/interface';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import ConfirmStone from './search/result/components';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { AddCommentDialog } from '@/components/v2/common/comment-dialog';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import { handleComment } from './search/result/helpers/handle-comment';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import DataTable from '@/components/v2/common/data-table';
import matchPairIcon from '@public/v2/assets/icons/match-pair-saved.svg';

import Tooltip from '@/components/v2/common/tooltip';
import {
  clarity,
  fluorescenceSortOrder,
  sideBlackSortOrder,
  tableBlackSortOrder,
  tableInclusionSortOrder
} from '@/constants/v2/form';
import {
  RednderLocation,
  RenderAmount,
  RenderCarat,
  RenderDetails,
  RenderDiscount,
  RenderLab,
  RenderLotId,
  RenderMeasurements,
  RenderNumericFields,
  RenderShape,
  RenderTracerId
} from '@/components/v2/common/data-table/helpers/render-cell';
import { MRT_RowSelectionState } from 'material-react-table';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import { NOT_MORE_THAN_300 } from '@/constants/error-messages/search';
import { NO_STONES_SELECTED } from '@/constants/error-messages/cart';
import { notificationBadge } from '@/features/notification/notification-slice';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';
import CompareStone from './search/result/components/compare-stone';
import VolumeDiscount from '@/components/v2/common/volume-discount';
import EmptyScreen from '@/components/v2/common/empty-screen';
import emptyOrderSvg from '@public/v2/assets/icons/empty-order.svg';
import empty from '@public/v2/assets/icons/saved-search/empty-screen-saved-search.svg';
import {
  HOLD_STATUS,
  IN_TRANSIT,
  MEMO_STATUS
} from '@/constants/business-logic';
import {
  SELECT_STONE_TO_PERFORM_ACTION,
  SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH
} from '@/constants/error-messages/confirm-stone';
import { useLazyGetAvailableMyAppointmentSlotsQuery } from '@/features/api/my-appointments';
import { IAppointmentPayload } from './my-appointments/page';
import BookAppointment from './my-appointments/components/book-appointment/book-appointment';
import { Skeleton } from '@mui/material';
import CommonPoppup from './login/component/common-poppup';
import { formatNumberWithCommas } from '@/utils/format-number-with-comma';
import { useLazyGetMatchingPairCountQuery } from '@/features/api/match-pair';
import { useAppSelector } from '@/hooks/hook';
import { setConfirmStoneTrack } from '@/features/confirm-stone-track/confirm-stone-track-slice';
import { STONE_LOCATION } from '@/constants/v2/enums/location';
import { kamLocationAction } from '@/features/kam-location/kam-location';

interface ITabs {
  label: string;
  link: string;
  count: number;
  data: any;
}

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

  const { data: customerData, refetch: refetchCustomerData } =
    useGetCustomerQuery({}, { refetchOnMountOrArgChange: true });
  const [validImages, setValidImages] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<string>('');
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [downloadExcel] = useDownloadExcelMutation();

  const [tabs, setTabs] = useState<ITabs[]>([]);
  const [savedSearchData, setSavedSearchData] = useState([]);
  const optionsClasses = [
    'linear-gradient(90deg, #DBF2FC 0%, #E8E8FF 30%, #FFF4E3 100%)',
    'linear-gradient(90deg, #FFF4E3 0%, #E8E8FF 50%, #DBF2FC 100%)',
    'linear-gradient(90deg, #E1F6F1 0%, #FFF4E3 50%, #EFEFFD 100%)',
    'linear-gradient(90deg, #DBF2FC 0%, #E8E8FF 100%)'
  ];
  const [stoneId, setStoneId] = useState('');
  const [searchData, setSearchData] = useState<any>();
  const [searchColumn, setSearchColumn] = useState<any>();

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
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [isDiamondDetail, setIsDiamondDetail] = useState(false);
  const [isDiamondDetailLoading, setIsDiamondDetailLoading] = useState(true); //

  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentPayload, setAppointmentPayload] =
    useState<IAppointmentPayload>({
      kam: { kam_name: '', image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });
  const [lotIds, setLotIds] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState('');

  const [triggerAvailableSlots] = useLazyGetAvailableMyAppointmentSlotsQuery(
    {}
  );

  let isNudge = localStorage.getItem('show-nudge')! === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  const { errorSetState } = useErrorStateManagement();
  const { setIsError } = errorSetState;

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
        isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
        isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED,
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
  const gradientClasses = [
    styles.gradient1,
    styles.gradient2,
    styles.gradient3,
    styles.gradient4
  ];
  const memoizedRows = useMemo(() => {
    setBreadCrumLabel('Dashboard');
    return Array.isArray(searchData?.foundProducts)
      ? searchData?.foundProducts
      : [];
  }, [searchData?.foundProducts]);
  useEffect(() => {
    if (searchData?.notFoundKeywords?.length > 0) {
      setError('Some stones are not available');
    }
  }, [searchData?.notFoundKeywords]);
  useEffect(() => {
    const fetchColumns = async () => {
      const response = await triggerColumn({});
      const shapeColumn = response.data?.find(
        (column: any) => column.accessor === 'shape'
      );

      if (response.data?.length) {
        let additionalColumn = {
          accessor: 'shape_full',
          id: shapeColumn?.id,
          is_disabled: shapeColumn?.is_disabled,
          is_fixed: shapeColumn?.is_fixed,
          label: shapeColumn?.label,
          sequence: shapeColumn?.sequence,
          short_label: shapeColumn?.short_label
        };

        let addFireIconCol = {
          accessor: 'fire_icon',
          id: 'sub_col_13a',
          is_disabled: false,
          is_fixed: false,
          label: '',
          sequence: 0,
          short_label: ''
        };

        const updatedColumns = [
          ...response.data,
          additionalColumn,
          addFireIconCol
        ];
        setSearchColumn(updatedColumns);
      }
    };

    fetchColumns();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelectorAll('.blink').forEach(element => {
        element.classList.remove(styles.blink);
      });
    }, 4000);

    return () => clearTimeout(timeout);
  }, [isDetailPage, isConfirmStone, isCompareStone, searchData?.foundProducts]);

  const mapColumns = (columns: any) =>
    columns
      ?.filter(({ is_disabled }: any) => !is_disabled)
      ?.sort(({ sequence: a }: any, { sequence: b }: any) => a - b)
      .map(({ accessor, short_label, label }: any) => {
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          enableGlobalFilter: accessor === 'lot_id',
          // enableGrouping: accessor === 'shape',
          enableSorting: accessor !== 'shape_full' && accessor !== 'details',
          minSize: 5,
          maxSize: accessor === 'details' ? 100 : 200,
          size: 5,
          Header: ({ column }: any) => (
            <Tooltip
              tooltipTrigger={<span>{column.columnDef.header}</span>}
              tooltipContent={label}
              tooltipContentStyles={'z-[1000]'}
            />
          )
        };

        switch (accessor) {
          case 'fire_icon':
            return {
              enableSorting: false,
              accessorKey: 'fire_icon',
              header: '',
              minSize: 26,
              size: 26,
              maxSize: 26,
              Cell: ({ row }: { row: any }) => {
                return row.original.in_high_demand ? (
                  <Tooltip
                    tooltipTrigger={
                      <Image
                        id="blinking-image"
                        src={fireSvg}
                        alt="fireSvg"
                        className={`${styles.blink} blink ml-[-5px]`}
                      />
                    }
                    tooltipContent={'In High Demand Now!'}
                    tooltipContentStyles={'z-[1000] '}
                  />
                ) : (
                  ''
                );
              }
            };
          case 'clarity':
            return {
              ...commonProps,
              sortingFn: (rowA: any, rowB: any, columnId: string) => {
                const indexA = clarity.indexOf(rowA.original[columnId]);
                const indexB = clarity.indexOf(rowB.original[columnId]);
                return indexA - indexB;
              }
            };
          case 'table_inclusion':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-',
              sortingFn: (rowA: any, rowB: any, columnId: string) => {
                const indexA = tableInclusionSortOrder.indexOf(
                  rowA.original[columnId]
                );
                const indexB = tableInclusionSortOrder.indexOf(
                  rowB.original[columnId]
                );
                return indexA - indexB;
              }
            };
          case 'table_black':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-',
              sortingFn: (rowA: any, rowB: any, columnId: string) => {
                const indexA = tableBlackSortOrder.indexOf(
                  rowA.original[columnId]
                );
                const indexB = tableBlackSortOrder.indexOf(
                  rowB.original[columnId]
                );
                return indexA - indexB;
              }
            };

          case 'side_black':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-',
              sortingFn: (rowA: any, rowB: any, columnId: string) => {
                const indexA = sideBlackSortOrder.indexOf(
                  rowA.original[columnId]
                );
                const indexB = sideBlackSortOrder.indexOf(
                  rowB.original[columnId]
                );
                return indexA - indexB;
              }
            };

          case 'fluorescence':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-',
              sortingFn: (rowA: any, rowB: any, columnId: string) => {
                const indexA = fluorescenceSortOrder.indexOf(
                  rowA.original[columnId]
                );
                const indexB = fluorescenceSortOrder.indexOf(
                  rowB.original[columnId]
                );
                return indexA - indexB;
              }
            };
          case 'amount':
            return { ...commonProps, Cell: RenderAmount };
          case 'measurements':
            return { ...commonProps, Cell: RenderMeasurements };
          case 'shape_full':
            return { ...commonProps, Cell: RenderShape };
          case 'rap':
          case 'rap_value':
            return { ...commonProps, Cell: RenderNumericFields };
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
          case 'discount':
            return { ...commonProps, Cell: RenderDiscount };
          case 'details':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderDetails({ row, handleDetailImage });
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
          case 'price_per_carat':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
                <span>{`${
                  renderedCellValue === null || renderedCellValue === undefined
                    ? '-'
                    : `$${formatNumberWithCommas(renderedCellValue)}`
                }`}</span>
              )
            };
          case 'lab':
            return { ...commonProps, Cell: RenderLab };
          case 'location':
            return { ...commonProps, Cell: RednderLocation };
          case 'lot_id':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue, row }: any) => {
                return RenderLotId({
                  renderedCellValue,
                  row,
                  handleDetailPage
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
  const memoizedColumns = useMemo(
    () => mapColumns(searchColumn),
    [searchColumn]
  );

  const handleEdit = (stone: string, identifier = false) => {
    let savedSearchEditData = customerData?.customer?.saved_searches?.filter(
      (items: any) => {
        return items.id === stone;
      }
    );

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
    if (customerData) {
      // setIsLoading(false);
      const tabsCopy: ITabs[] = []; // Make a copy of the current tabs

      // Check for pending and active invoices
      if (customerData.customer?.orders?.length > 0) {
        const pendingInvoices = customerData.customer.orders
          .filter((item: any) => item.invoice_id === null)
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
                (item: any) => item.invoice_id === null
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

  const [triggerColumn, { data: columnData }] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();

  const handleStoneId = (e: any) => {
    setStoneId(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsLoading(true);
      getProductById({
        search_keyword: stoneId
      })
        .unwrap()
        .then((res: any) => {
          setIsLoading(false);
          setSearchData(res);
          setError('');
          setIsDetailPage(true);
        })
        .catch((_e: any) => {
          setIsLoading(false);

          if (_e?.status === statusCode.NOT_FOUND) {
            setError(`We couldn't find any results for this search`);
          } else if (_e?.status === statusCode.UNAUTHORIZED) {
            setError(_e?.data?.message?.message);
          } else {
            setError('Something went wrong');
          }
        });
    }
  };
  const handleInputSearch = () => {
    if (stoneId.length > 0) {
      setIsLoading(true);
      getProductById({
        search_keyword: stoneId
      })
        .unwrap()
        .then((res: any) => {
          setIsLoading(false);
          setSearchData(res);
          setError('');
          setIsDetailPage(true);
        })
        .catch((_e: any) => {
          setIsLoading(false);
          if (_e?.status === statusCode.NOT_FOUND) {
            setError(`We couldn't find any results for this search`);
          } else if (_e?.status === statusCode.UNAUTHORIZED) {
            setError(_e?.data?.message?.message);
          } else {
            setError('Something went wrong');
          }
        });
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

  const goBack = () => {
    setIsDiamondDetail(false);
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
                    setIsDetailPage(false);
                    // setSearchData({});
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
              setSearchData(res);
              setError('');
              setIsDetailPage(true);
            })
            .catch((_e: any) => {
              if (_e?.status === statusCode.NOT_FOUND) {
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
      setIsDetailPage(true);
      setBreadCrumLabel('');
    }
    setIsDetailPage(true);
    setIsConfirmStone(false);
    setConfirmStoneData([]);
    setIsCompareStone(false);
    setCompareStoneData([]);
    setShowAppointmentForm(false);
    setAppointmentPayload({
      kam: { kam_name: '', image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });
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
                label: ManageLocales('app.modal.addComment.cancel'),
                handler: () => {
                  setIsAddCommentDialogOpen(false);
                },
                customStyle: 'flex-1'
              },
              {
                variant: 'primary',
                label: ManageLocales('app.modal.addComment.saveComment'),
                handler: () => {
                  setCommentValue(textAreaValue);
                  setIsAddCommentDialogOpen(false);
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
    }
    setIsDiamondDetail(true);
    setIsError(false);
    setError('');
    setDetailPageData(row);
  };

  const handleDetailImage = ({ row }: any) => {
    setDetailImageData(row);
    setIsModalOpen(true);
  };
  const images = [
    {
      name: getShapeDisplayName(detailImageData?.shape ?? ''),
      url: `${FILE_URLS.IMG.replace('***', detailImageData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.IMG.replace(
        '***',
        detailImageData?.lot_id ?? ''
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
        ? detailImageData?.certificate_url
        : '',
      url_check: detailImageData?.assets_pre_check?.CERT_IMG
    },

    {
      name: 'Video',
      url: `${FILE_URLS.B2B.replace('***', detailImageData?.lot_id ?? '')}`,
      url_check: detailImageData?.assets_pre_check?.B2B_CHECK,
      category: 'Video'
    },
    {
      name: 'B2B Sparkle',
      url: `${FILE_URLS.B2B_SPARKLE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      url_check: detailImageData?.assets_pre_check?.B2B_SPARKLE_CHECK,
      category: 'B2B Sparkle'
    },

    {
      name: 'Heart',
      url: `${FILE_URLS.HEART.replace('***', detailImageData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.HEART.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Arrow',
      url: `${FILE_URLS.ARROW.replace('***', detailImageData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.ARROW.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Aset',
      url: `${FILE_URLS.ASET.replace('***', detailImageData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.ASET.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Ideal',
      url: `${FILE_URLS.IDEAL.replace('***', detailImageData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.IDEAL.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Fluorescence',
      url: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    }
  ];

  const handleCreateAppointment = () => {
    let selectedIds = Object.keys(rowSelection);

    if (selectedIds.length > 0) {
      const hasMemoOut = selectedIds?.some((id: string) => {
        const stone = searchData?.foundProducts.find(
          (row: IProduct) => row?.id === id
        );
        return stone?.diamond_status === MEMO_STATUS;
      });

      const hasHold = selectedIds?.some((id: string) => {
        const stone = searchData?.foundProducts.find(
          (row: IProduct) => row?.id === id
        );
        return stone?.diamond_status === HOLD_STATUS;
      });

      if (hasMemoOut) {
        setError(SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH);
      } else if (hasHold) {
        setError(SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH);
      } else {
        setShowAppointmentForm(true);
        triggerAvailableSlots({}).then(payload => {
          let { data } = payload.data;
          setAppointmentPayload(data);
        });

        const lotIdsWithCountry = selectedIds?.map((id: string) => {
          const foundProduct =
            searchData?.foundProducts.find((row: IProduct) => row?.id === id) ??
            {};

          if (foundProduct) {
            const lotId = foundProduct?.lot_id;
            const country = foundProduct?.location; // assuming country is a property in foundProduct
            return `${lotId}(${country})`;
          }

          return '';
        });
        setLotIds(lotIdsWithCountry);
      }
    } else {
      setError(SELECT_STONE_TO_PERFORM_ACTION);
    }
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
                      goBackToListView();
                      setIsAddCommentDialogOpen(false);
                      setIsDialogOpen(false);
                    },
                    customStyle: 'flex-1 w-full h-10'
                  },
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.goToYourOrder'),
                    handler: () => {
                      router.push('/v2/your-orders');
                    },
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            );

            setCommentValue('');
            getProductById({
              search_keyword: stoneId
            })
              .unwrap()
              .then((res: any) => {
                // setIsLoading(false);
                setSearchData(res);
                setRowSelection({});
                setError('');
                setIsDetailPage(true);
              })
              .catch((_e: any) => {
                if (_e?.status === statusCode.NOT_FOUND) {
                  setError(`We couldn't find any results for this search`);
                } else if (_e?.status === statusCode.UNAUTHORIZED) {
                  setError(_e?.data?.message?.message);
                } else {
                  setError('Something went wrong');
                }
              });
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

    confirmStoneData.forEach((ids: any) => {
      variantIds.push(ids.variants[0].id);
    });

    checkLocation({
      kamLocation: customerData.customer.kam.location,
      variantIds
    });
    dispatch(kamLocationAction(customerData.customer.kam.location));
  };

  const handleAddToCart = () => {
    let selectedIds = Object.keys(rowSelection);

    if (selectedIds.length > 300) {
      setIsError(true);
      setError(NOT_MORE_THAN_300);
    } else if (!selectedIds.length) {
      setIsError(true);
      setError(NO_STONES_SELECTED);
    } else {
      setIsLoading(true);
      const variantIds = selectedIds
        ?.map((id: string) => {
          const myCartCheck: IProduct | object =
            searchData?.foundProducts.find((row: IProduct) => {
              return row?.id === id;
            }) ?? {};

          if (myCartCheck && 'variants' in myCartCheck) {
            return myCartCheck.variants[0]?.id;
          }
          return '';
        })
        ?.filter(Boolean);

      // If there are variant IDs, add to the cart
      if (variantIds.length) {
        addCart({
          variants: variantIds
        })
          .unwrap()
          .then((res: any) => {
            setIsLoading(false);
            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content={''}
                status="success"
                customPoppupBodyStyle="mt-[70px]"
                header={res?.message}
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.continue'),
                    handler: () => {
                      setIsDialogOpen(false), setIsDetailPage(true);
                    },
                    customStyle: 'flex-1 w-full h-10 '
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

            // On success, show confirmation dialog and update badge
            setIsError(false);
            setError('');
            getProductById({
              search_keyword: stoneId
            })
              .unwrap()
              .then((res: any) => {
                setSearchData(res);
                setError('');
                setIsDetailPage(true);
              })
              .catch((_e: any) => {
                if (_e?.status === statusCode.NOT_FOUND) {
                  setError(`We couldn't find any results for this search`);
                } else if (_e?.status === statusCode.UNAUTHORIZED) {
                  setError(_e?.data?.message?.message);
                } else {
                  setError('Something went wrong');
                }
              });
            dispatch(notificationBadge(true));

            // refetchRow();
          })
          .catch(error => {
            setIsLoading(false);
            // On error, set error state and error message

            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content={''}
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
        setRowSelection({});
      }
      // }
    }
  };

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
              Stay tuned
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
  return (
    <>
      {error !== '' && (
        <Toast show={error !== ''} message={error} isSuccess={false} />
      )}

      <ImageModal
        setIsLoading={setIsLoading}
        isOpen={isModalOpen}
        onClose={() => {
          setValidImages([]);
          setDetailImageData({});
          setIsModalOpen(!isModalOpen);
        }}
        images={validImages}
      />
      <DialogComponent dialogContent={dialogContent} isOpens={isDialogOpen} />
      {isLoading && <CustomKGKLoader />}
      <AddCommentDialog
        isOpen={isAddCommentDialogOpen}
        onClose={() => setIsAddCommentDialogOpen(false)}
        renderContent={renderAddCommentDialogs}
      />

      {isDiamondDetail && detailPageData?.length ? (
        <div className="mt-[16px]">
          <DiamondDetailsComponent
            data={searchData?.foundProducts}
            filterData={detailPageData}
            goBackToListView={goBack}
            handleDetailPage={handleDetailPage}
            breadCrumLabel={
              breadCrumLabel.length ? breadCrumLabel : 'Search Results'
            }
            modalSetState={modalSetState}
            setIsLoading={setIsLoading}
            setIsDiamondDetailLoading={setIsDiamondDetailLoading}
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
                        setBreadCrumLabel('Detail Page');
                        setIsDetailPage(false);
                        const { id } = detailPageData;
                        const selectedRows = { [id]: true };
                        handleConfirmStone({
                          selectedRows: selectedRows,
                          rows: searchData?.foundProducts,
                          setIsError,
                          setErrorText: setError,
                          setIsConfirmStone,
                          setConfirmStoneData,
                          setIsDetailPage: setIsDiamondDetail,
                          identifier: 'detailPage',
                          confirmStoneTrack: 'DNA',
                          dispatch
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
        </div>
      ) : isCompareStone ? (
        <div>
          <div className="flex py-[8px] items-center ">
            <p className="text-lMedium font-medium text-neutral900">
              Diamond Comparison Overview
            </p>
          </div>
          <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow mt-[16px]">
            <CompareStone
              rows={compareStoneData}
              columns={columnData}
              goBackToListView={goBackToListView}
              activeTab={activeTab}
              isFrom={'Dashboard'}
              handleDetailImage={handleDetailImage}
              setCompareStoneData={setCompareStoneData}
              compareStoneData={compareStoneData}
              setIsError={setIsError}
              setErrorText={setError}
              setIsLoading={setIsLoading}
              setIsDialogOpen={setIsDialogOpen}
              setDialogContent={setDialogContent}
              setIsConfirmStone={setIsConfirmStone}
              setConfirmStoneData={setConfirmStoneData}
              setIsDetailPage={setIsDetailPage}
            />
          </div>
        </div>
      ) : showAppointmentForm ? (
        <>
          <div className="flex py-[8px] items-center ">
            <p className="text-lMedium font-medium text-neutral900">
              {ManageLocales('app.myAppointment.header')}
            </p>
          </div>
          <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow mb-[16px]">
            <BookAppointment
              breadCrumLabel={ManageLocales(
                'app.myAppointments.myAppointments'
              )}
              goBackToListView={goBackToListView}
              appointmentPayload={appointmentPayload}
              setIsLoading={setIsLoading}
              modalSetState={modalSetState}
              lotIds={lotIds}
              setRowSelection={setRowSelection}
              errorSetState={errorSetState}
            />
          </div>
        </>
      ) : isDetailPage && searchData && Object.keys(searchData).length > 0 ? (
        <div className="mb-[10px]">
          <div className="flex py-[8px] items-center ">
            <p className="text-lMedium font-medium text-neutral900">
              {isCompareStone
                ? 'Diamond Comparison Overview'
                : ManageLocales('app.result.headerResult')}
            </p>
          </div>
          <div className="border-[1px] border-neutral200 rounded-[8px]">
            <div className="flex items-center border-b-[1px] border-neutral200 p-2">
              <Image
                src={backWardArrow}
                alt="backWardArrow"
                onClick={() => {
                  setIsDetailPage(false);
                }}
                className="cursor-pointer"
              />
              <div className="flex gap-[8px] items-center">
                <button
                  className="text-neutral600 text-sMedium font-regular cursor-pointer"
                  onClick={() => {
                    setIsDetailPage(false);
                  }}
                >
                  {breadCrumLabel}
                </button>
                <span className="text-neutral600">/</span>
                <p className="text-neutral700 p-[8px] bg-neutral100 rounded-[4px] text-sMedium font-medium">
                  Search Results
                </p>
              </div>
            </div>
            <DataTable
              rows={memoizedRows}
              columns={memoizedColumns}
              setRowSelection={setRowSelection}
              rowSelection={rowSelection}
              showCalculatedField={true}
              isResult={false}
              modalSetState={modalSetState}
              setErrorText={setError}
              downloadExcel={downloadExcel}
              setIsError={setIsError}
              setIsLoading={setIsLoading}
              handleAddToCart={handleAddToCart}
              handleConfirmStone={handleConfirmStone}
              setIsConfirmStone={setIsConfirmStone}
              setConfirmStoneData={setConfirmStoneData}
              isDashboard={true}
              setIsDetailPage={setIsDetailPage}
              setIsCompareStone={setIsCompareStone}
              setCompareStoneData={setCompareStoneData}
              handleCreateAppointment={handleCreateAppointment}
            />
          </div>
        </div>
      ) : isConfirmStone ? (
        <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow mt-[16px]">
          <ConfirmStone
            rows={confirmStoneData}
            columns={columnData}
            goBackToListView={goBackToListView}
            // activeTab={activeTab}
            isFrom={'Dashboard'}
            handleDetailImage={handleDetailImage}
            handleDetailPage={handleDetailPage}
            identifier="Dashboard"
          />
          <div className="px-4 py-2">
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.confirmStone.footer.back'),
                  handler: () => {
                    setIsDetailPage(true);
                  }
                },

                {
                  variant: 'secondary',
                  label: ManageLocales('app.confirmStone.footer.addComment'),
                  handler: () => {
                    setCommentValue('');
                    setIsAddCommentDialogOpen(true);
                  }
                },

                {
                  variant: 'primary',
                  label: ManageLocales('app.confirmStone.footer.confirmStone'),
                  handler: () => confirmStone()
                }
              ]}
            />
          </div>
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
                  customerData === undefined ? '' : 'url(/gradient.png)'
              }}
            >
              {customerData !== undefined ? (
                <div className="flex items-center bg-neutral0 rounded-[4px] overflow-hidden border-[1px] border-primaryBorder w-[720px] px-4 py-2">
                  <div className="relative flex-grow items-center">
                    <input
                      className="px-10 py-2 w-full text-gray-600 rounded-lg focus:outline-none"
                      type="string"
                      placeholder="Search by stone id or certificate number"
                      onChange={handleStoneId}
                      onKeyDown={handleKeyDown}
                    />
                    <div
                      className="absolute left-0 top-[5px]"
                      onClick={handleInputSearch}
                    >
                      <Image src={searchIcon} alt={'searchIcon'} />
                    </div>
                  </div>
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
              {customerData === undefined
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
                              `(${data.count})`}
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
                {customerData === undefined ? (
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
                                >
                                  <div className="flex gap-1">
                                    {label}
                                    <p>{'(' + count + ')'}</p>
                                    <Image
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
              {customerData === undefined ? (
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
                                isMatchingPair: searchData.is_matching_pair
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
                              <div className="flex flex-col gap-[18px]">
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
                {customerData === undefined ? (
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
                {customerData === undefined ? (
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
                    location={customerData?.customer.kam?.location ?? location}
                    phoneNumber={customerData?.customer.kam?.phone ?? '-'}
                    email={customerData?.customer.kam?.email ?? '-'}
                    image={customerData?.customer.kam?.image ?? ''}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="border-t-[1px] mt-auto border-l-[1px] border-r-[1px] rounded-[8px] p-4 flex justify-between border-neutral200 text-lRegular">
            {/* for fixed footer */}
            {/* fixed bottom-0 left-[84px] right-0 bg-white  */}
            <div className="text-infoMain  flex gap-6 cursor-pointer">
              <p
                onClick={() =>
                  router.push('/v2/my-account?path=terms-and-conditions')
                }
              >
                Terms & Conditions
              </p>
              <p
                onClick={() =>
                  router.push('/v2/my-account?path=privacy-policy')
                }
              >
                Privacy Policy
              </p>
            </div>
            <p className="text-neutral500">
              Copyright © {new Date().getFullYear()} KGK Live. All rights
              reserved.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

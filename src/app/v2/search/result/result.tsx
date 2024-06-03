import React, {
  useEffect,
  useMemo,
  useState,
  SetStateAction,
  Dispatch
} from 'react';
import DataTable from '@/components/v2/common/data-table';
import { useDataTableStateManagement } from '@/components/v2/common/data-table/hooks/data-table-state-management';
import {
  HOLD_STATUS,
  LISTING_PAGE_DATA_LIMIT,
  MEMO_STATUS
} from '@/constants/business-logic';
import fallbackImage from '@public/v2/assets/icons/not-found.svg';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
import { useRouter, useSearchParams } from 'next/navigation';
import { ManageLocales } from '@/utils/v2/translate';
import ActionButton from '@/components/v2/common/action-button';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import Tooltip from '@/components/v2/common/tooltip';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import {
  RenderCarat,
  RenderDiscount,
  RenderDetails,
  RenderLab,
  RenderLotId,
  RednderLocation,
  RenderAmount,
  RenderShape,
  RenderMeasurements,
  RenderTracerId
} from '@/components/v2/common/data-table/helpers/render-cell';
import {
  useConfirmProductMutation,
  useLazyGetAllProductQuery
} from '@/features/api/product';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { MRT_RowSelectionState } from 'material-react-table';
import { notificationBadge } from '@/features/notification/notification-slice';
import { useAddCartMutation } from '@/features/api/cart';
import { useAppDispatch } from '@/hooks/hook';
import Image from 'next/image';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { DialogComponent } from '@/components/v2/common/dialog';
import {
  clarity,
  fluorescenceSortOrder,
  sideBlackSortOrder,
  tableBlackSortOrder,
  tableInclusionSortOrder
} from '@/constants/v2/form';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import {
  SELECT_STONE_TO_PERFORM_ACTION,
  SOME_STONES_ARE_ON_HOLD_MODIFY_SEARCH
} from '@/constants/error-messages/confirm-stone';
import { NOT_MORE_THAN_300 } from '@/constants/error-messages/search';
import { NO_STONES_AVAILABLE } from '@/constants/error-messages/compare-stone';
import { NO_STONES_SELECTED } from '@/constants/error-messages/cart';
import { useGetSavedSearchListQuery } from '@/features/api/saved-searches';
import { ISavedSearch } from '../form/form';
import ConfirmStone from './components';
import { handleConfirmStone } from './helpers/handle-confirm-stone';
import { AddCommentDialog } from '@/components/v2/common/comment-dialog';
import { handleComment } from './helpers/handle-comment';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import fireSvg from '@public/v2/assets/icons/data-table/fire-icon.svg';
import threeDotsSvg from '@public/v2/assets/icons/threedots.svg';
import { Dropdown } from '@/components/v2/common/dropdown-menu';
import { IItem } from '../saved-search/saved-search';
import { IManageListingSequenceResponse, IProduct } from '../interface';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import CompareStone from './components/compare-stone';
import { statusCode } from '@/constants/enums/status-code';
import { formatNumber } from '@/utils/fix-two-digit-number';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';
import { useLazyGetAvailableMyAppointmentSlotsQuery } from '@/features/api/my-appointments';
import { IAppointmentPayload } from '../../my-appointments/page';
import BookAppointment from '../../my-appointments/components/book-appointment/book-appointment';
import styles from './style.module.scss';
import DataTableSkeleton from '@/components/v2/skeleton/data-table';
import { Skeleton } from '@mui/material';
import CommonPoppup from '../../login/component/common-poppup';

// Column mapper outside the component to avoid re-creation on each render

const Result = ({
  activeTab,
  searchParameters,
  setActiveTab,
  handleCloseAllTabs,
  handleCloseSpecificTab,
  setSearchParameters,
  setIsLoading,
  setIsInputDialogOpen
}: {
  activeTab: number;
  searchParameters: any;
  setSearchParameters: Dispatch<SetStateAction<ISavedSearch[]>>;
  setActiveTab: Dispatch<SetStateAction<number>>;
  handleCloseAllTabs: () => void;
  handleCloseSpecificTab: (_id: number) => void;
  setIsLoading: any;
  setIsInputDialogOpen: any;
}) => {
  const dispatch = useAppDispatch();

  const [triggerAvailableSlots] = useLazyGetAvailableMyAppointmentSlotsQuery(
    {}
  );

  const { data: searchList }: { data?: IItem[] } =
    useGetSavedSearchListQuery('');
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();
  const { errorState, errorSetState } = useErrorStateManagement();
  const { setIsError, setErrorText } = errorSetState;
  const { isError, errorText } = errorState;
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;
  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const [isAddCommentDialogOpen, setIsAddCommentDialogOpen] = useState(false);
  const [data, setData] = useState([]);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [validImages, setValidImages] = useState<any>([]);
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [detailImageData, setDetailImageData] = useState<any>({});
  const [breadCrumLabel, setBreadCrumLabel] = useState('');

  const [isConfirmStone, setIsConfirmStone] = useState(false);
  const [isCompareStone, setIsCompareStone] = useState(false);

  const [confirmStoneData, setConfirmStoneData] = useState<IProduct[]>([]);
  const [compareStoneData, setCompareStoneData] = useState<IProduct[]>([]);

  const [commentValue, setCommentValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');

  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentPayload, setAppointmentPayload] =
    useState<IAppointmentPayload>({
      kam: { kam_name: '', kam_image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });
  const [lotIds, setLotIds] = useState<string[]>([]);
  const [hasLimitExceeded, setHasLimitExceeded] = useState(false);
  // UseMutation to add items to the cart
  const [addCart] = useAddCartMutation();

  const editRoute = useSearchParams().get('edit');
  const router = useRouter();
  const [searchUrl, setSearchUrl] = useState('');

  const [downloadExcel] = useDownloadExcelMutation();
  const [confirmProduct] = useConfirmProductMutation();

  const [triggerColumn, { data: columnData }] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();
  const [triggerProductApi, { data: productData }] =
    useLazyGetAllProductQuery();

  // Fetch Products

  const fetchProducts = async () => {
    // setIsLoading(true);
    const storedSelection = localStorage.getItem('Search');

    if (!storedSelection) return;

    if (activeTab <= 0) return;

    const selections = JSON.parse(storedSelection);

    const url = constructUrlParams(selections[activeTab - 1]?.queryParams);
    setSearchUrl(url);
    triggerProductApi({ url, limit: LISTING_PAGE_DATA_LIMIT, offset: 0 }).then(
      (res: any) => {
        if (columnData?.length > 0) {
          if (res?.error?.status === statusCode.UNAUTHORIZED) {
            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content={''}
                customPoppupBodyStyle="!mt-[70px]"
                header={res?.error?.data?.message}
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

            setHasLimitExceeded(true);
            dataTableSetState.setRows([]);
          } else {
            setHasLimitExceeded(false);
            dataTableSetState.setRows(res.data?.products);
          }

          setRowSelection({});
          setErrorText('');
          setData(res.data);
          setIsLoading(false);
        }
      }
    );
  };
  const handleDetailPage = ({ row }: { row: any }) => {
    if (isConfirmStone) {
      setBreadCrumLabel('Confirm Stone');
    }
    setIsDetailPage(true);
    setIsError(false);
    setErrorText('');
    setDetailPageData(row);
  };

  const handleDetailImage = ({ row }: any) => {
    setDetailImageData(row);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelectorAll('.blink').forEach(element => {
        element.classList.remove(styles.blink);
      });
    }, 4000);

    return () => clearTimeout(timeout);
  }, [
    isDetailPage,
    isConfirmStone,
    showAppointmentForm,
    isCompareStone,
    activeTab,
    dataTableState.rows
  ]);

  const mapColumns = (columns: any) =>
    columns
      ?.filter(({ is_disabled }: any) => !is_disabled)
      ?.sort(({ sequence: a }: any, { sequence: b }: any) => a - b)
      .map(({ accessor, short_label, label }: any) => {
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          enableGlobalFilter: accessor === 'lot_id',
          enableGrouping: accessor === 'shape',
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
              minSize: 1,
              size: 1,
              maxSize: 2,
              Cell: ({ row }: { row: any }) => {
                return row.original.in_high_demand ? (
                  <Tooltip
                    tooltipTrigger={
                      <Image
                        id="blinking-image"
                        src={fireSvg}
                        alt="fireSvg"
                        className={`${styles.blink} blink`}
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
          case 'carats':
          case 'rap':
          case 'rap_value':
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
                  renderedCellValue === 0
                    ? '0.00'
                    : formatNumber(renderedCellValue) ?? '0.00'
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

  useEffect(() => {
    // setIsLoading(true)
    fetchProducts();
  }, [activeTab, columnData]);

  useEffect(() => {
    setErrorText('');
    setIsError(false);
  }, [rowSelection]);

  // Fetch Columns
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

        dataTableSetState.setColumns(updatedColumns);
      }
    };

    fetchColumns();
  }, [dataTableState.rows]);

  const memoizedRows = useMemo(() => {
    return Array.isArray(dataTableState.rows) ? dataTableState.rows : [];
  }, [dataTableState.rows]);
  const memoizedColumns = useMemo(
    () => mapColumns(dataTableState.columns),
    [dataTableState.columns]
  );
  const handleNewSearch = () => {
    router.push(`${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`);
  };

  const handleCreateAppointment = () => {
    let selectedIds = Object.keys(rowSelection);

    if (selectedIds.length > 0) {
      const hasMemoOut = selectedIds?.some((id: string) => {
        const stone = dataTableState.rows.find(
          (row: IProduct) => row?.id === id
        );
        return stone?.diamond_status === MEMO_STATUS;
      });

      const hasHold = selectedIds?.some((id: string) => {
        const stone = dataTableState.rows.find(
          (row: IProduct) => row?.id === id
        );
        return stone?.diamond_status === HOLD_STATUS;
      });

      if (hasMemoOut) {
        setErrorText(NO_STONES_AVAILABLE);
        setIsError(true);
      } else if (hasHold) {
        setIsError(true);
        setErrorText(SOME_STONES_ARE_ON_HOLD_MODIFY_SEARCH);
      } else {
        setShowAppointmentForm(true);
        triggerAvailableSlots({}).then(payload => {
          let { data } = payload.data;
          setAppointmentPayload(data);
        });

        const lotIds = selectedIds?.map((id: string) => {
          const getLotIds: any =
            dataTableState.rows.find((row: IProduct) => {
              return row?.id === id;
            }) ?? {};

          if (getLotIds) {
            return getLotIds?.lot_id;
          }
          return '';
        });
        setLotIds(lotIds);
      }
    } else {
      setIsError(true);
      setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
    }
  };

  const handleAddToCart = () => {
    let selectedIds = Object.keys(rowSelection);

    if (selectedIds.length > 300) {
      setIsError(true);
      setErrorText(NOT_MORE_THAN_300);
    } else if (!selectedIds.length) {
      setIsError(true);
      setErrorText(NO_STONES_SELECTED);
    } else {
      setIsLoading(true);
      const variantIds = selectedIds
        ?.map((id: string) => {
          const myCartCheck: IProduct | object =
            dataTableState.rows.find((row: IProduct) => {
              return row?.id === id;
            }) ?? {};

          if (myCartCheck && 'variants' in myCartCheck) {
            return myCartCheck.variants[0]?.id;
          }
          return '';
        })
        .filter(Boolean);

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
                customPoppupBodyStyle="!mt-[70px]"
                header={res?.message}
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.continue'),
                    handler: () => setIsDialogOpen(false),
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
            // On success, show confirmation dialog and update badge
            setIsError(false);
            setErrorText('');
            triggerProductApi({
              url: searchUrl,
              limit: LISTING_PAGE_DATA_LIMIT,
              offset: 0
            }).then(res => {
              dataTableSetState.setRows(res.data?.products);
              setRowSelection({});
              setErrorText('');
              setData(res.data);
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
                customPoppupBodyStyle="!mt-[70px]"
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

  const handleAddToCartDetailPage = () => {
    const hasMemoOut = dataTableState.rows.some(
      (row: IProduct) =>
        row.id === detailPageData.id && row.diamond_status === MEMO_STATUS
    );
    const hasHold = dataTableState.rows.some(
      (row: IProduct) =>
        row.id === detailPageData.id && row.diamond_status === HOLD_STATUS
    );

    if (hasMemoOut) {
      setErrorText(NO_STONES_AVAILABLE);
      setIsError(true);
    } else if (hasHold) {
      setIsError(true);
      setErrorText(SOME_STONES_ARE_ON_HOLD_MODIFY_SEARCH);
    } else {
      setIsLoading(true);
      // Extract variant IDs for selected stones
      const variantIds = [detailPageData.id]
        ?.map((_id: string) => {
          const myCartCheck: IProduct | object =
            dataTableState.rows.find((row: IProduct) => {
              return row?.id === detailPageData.id;
            }) ?? {};

          if (myCartCheck && 'variants' in myCartCheck) {
            return myCartCheck.variants[0]?.id;
          }
          return '';
        })
        .filter(Boolean);

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
                customPoppupBodyStyle="!mt-[70px]"
                header={res?.message}
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.continue'),
                    handler: () => {
                      setIsDialogOpen(false);
                      setIsDetailPage(false);
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

            // On success, show confirmation dialog and update badge
            setIsError(false);
            setErrorText('');
            triggerProductApi({
              url: searchUrl,
              limit: LISTING_PAGE_DATA_LIMIT,
              offset: 0
            }).then(res => {
              dataTableSetState.setRows(res.data?.products);
              setRowSelection({});
              setErrorText('');
              setData(res.data);
            });
            dispatch(notificationBadge(true));
          })
          .catch(error => {
            setIsLoading(false);
            // On error, set error state and error message

            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content={''}
                customPoppupBodyStyle="!mt-[70px]"
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
    }
  };

  const goBackToListView = (isFrom?: string) => {
    if (isFrom === 'Detail Page') {
      setIsDetailPage(true);
      setBreadCrumLabel('');
    }
    setIsConfirmStone(false);
    setConfirmStoneData([]);
    setIsCompareStone(false);
    setCompareStoneData([]);
    setShowAppointmentForm(false);
    setAppointmentPayload({
      kam: { kam_name: '', kam_image: '' },
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

  const confirmStoneApiCall = () => {
    const variantIds: string[] = [];

    confirmStoneData.forEach((ids: any) => {
      variantIds.push(ids.variants[0].id);
    });

    if (variantIds.length) {
      setIsLoading(true);
      confirmProduct({
        variants: variantIds,
        comments: commentValue
      })
        .unwrap()
        .then(res => {
          if (res) {
            setIsLoading(false);
            setCommentValue('');
            setIsDialogOpen(true);

            setRowSelection({});
            setDialogContent(
              <CommonPoppup
                content={''}
                status="success"
                customPoppupBodyStyle="!mt-[70px]"
                header={`${variantIds.length} stones have been successfully added to
            "My Diamond"`}
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

            triggerProductApi({
              url: searchUrl,
              limit: LISTING_PAGE_DATA_LIMIT,
              offset: 0
            }).then(res => {
              dataTableSetState.setRows(res.data?.products);
              setRowSelection({});
              setErrorText('');
              setData(res.data);
            });
          }
        })
        .catch(e => {
          setIsLoading(false);
          setCommentValue('');

          if (e.data.type === 'unauthorized') {
            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content={
                  'To confirm a stone or make a purchase, KYC verification is mandatory. Without verification, access to certain features is restricted.'
                }
                customPoppupStyle="h-[270px]"
                customPoppupBodyStyle="!mt-[62px]"
                header={`Important KYC Verification Required!`}
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
                content={e?.data?.message}
                customPoppupBodyStyle="!mt-[70px]"
                header={``}
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

  const images = [
    {
      name: getShapeDisplayName(detailImageData?.shape ?? ''),
      url: `${FILE_URLS.IMG.replace('***', detailImageData?.lot_id ?? '')}`
    },
    {
      name: 'GIA Certificate',
      url: detailImageData?.certificate_url ?? '',
      showDivider: true
    },
    {
      name: 'B2B',
      url: `${FILE_URLS.B2B.replace('***', detailImageData?.lot_id ?? '')}`,
      url_check: `${FILE_URLS.B2B_CHECK.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`
    },
    {
      name: 'B2B Sparkle',
      url: `${FILE_URLS.B2B_SPARKLE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      url_check: `${FILE_URLS.B2B_SPARKLE_CHECK.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      showDivider: true
    },
    {
      name: 'Heart',
      url: `${FILE_URLS.HEART.replace('***', detailImageData?.lot_id ?? '')}`
    },
    {
      name: 'Arrow',
      url: `${FILE_URLS.ARROW.replace('***', detailImageData?.lot_id ?? '')}`
    },
    {
      name: 'Aset',
      url: `${FILE_URLS.ASET.replace('***', detailImageData?.lot_id ?? '')}`
    },
    {
      name: 'Ideal',
      url: `${FILE_URLS.IDEAL.replace('***', detailImageData?.lot_id ?? '')}`
    },
    {
      name: 'Fluorescence',
      url: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      showDivider: true
    }
  ];

  const goBack = () => {
    if (breadCrumLabel === 'Confirm Stone') {
      setBreadCrumLabel('');
    }
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
      loadImages(images, setValidImages, checkImage);
  }, [detailImageData]);
  useEffect(() => {
    if (!validImages.length && images[0].name.length) {
      setValidImages([
        {
          name: '',
          url: fallbackImage,
          showDivider: true
        }
      ]);
    }
  }, [validImages]);

  return (
    <div className="relative">
      {isError && (
        <Toast show={isError} message={errorText} isSuccess={false} />
      )}
      <ImageModal
        setIsLoading={setIsLoading}
        isOpen={isModalOpen}
        onClose={() => {
          setValidImages([]);
          setDetailImageData({});
          setIsModalOpen(!isModalOpen);
        }}
        selectedImageIndex={0}
        images={validImages}
        fromDetailPage={true}
      />
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        dialogStyle={{
          dialogContent: isConfirmStone
            ? 'h-[240px]'
            : hasLimitExceeded
            ? 'h-[250px]'
            : ''
        }}
      />

      <AddCommentDialog
        isOpen={isAddCommentDialogOpen}
        onClose={() => setIsAddCommentDialogOpen(false)}
        renderContent={renderAddCommentDialogs}
      />

      <div className="flex py-[8px] items-center">
        <p className="text-lMedium font-medium text-neutral900">
          {editRoute ? (
            ManageLocales('app.result.headerEdit')
          ) : isCompareStone ? (
            'Diamond Comparison Overview'
          ) : showAppointmentForm ? (
            ManageLocales('app.myAppointment.header')
          ) : isDetailPage ? (
            ''
          ) : productData === undefined ? (
            <Skeleton
              variant="rectangular"
              height={'24px'}
              width={'336px'}
              animation="wave"
            />
          ) : (
            ManageLocales('app.result.headerResult')
          )}
        </p>
      </div>

      {isDetailPage && detailPageData?.length ? (
        <>
          <DiamondDetailsComponent
            data={dataTableState.rows}
            filterData={detailPageData}
            goBackToListView={goBack}
            handleDetailPage={handleDetailPage}
            breadCrumLabel={
              breadCrumLabel.length ? breadCrumLabel : 'Search Results'
            }
            modalSetState={modalSetState}
            setIsLoading={setIsLoading}
          />
          <div className="p-[8px] flex justify-end items-center border-t-[1px] border-l-[1px] border-neutral-200 gap-3 rounded-b-[8px] shadow-inputShadow mb-1">
            <ActionButton
              actionButtonData={[
                {
                  variant: isConfirmStone ? 'primary' : 'secondary',
                  label: ManageLocales('app.searchResult.addToCart'),
                  handler: handleAddToCartDetailPage
                },

                {
                  variant: 'primary',
                  label: ManageLocales('app.searchResult.confirmStone'),
                  isHidden: isConfirmStone,
                  handler: () => {
                    setBreadCrumLabel('Detail Page');
                    const { id } = detailPageData;
                    const selectedRows = { [id]: true };
                    handleConfirmStone({
                      selectedRows: selectedRows,
                      rows: dataTableState.rows,
                      setIsError,
                      setErrorText,
                      setIsConfirmStone,
                      setConfirmStoneData,
                      setIsDetailPage
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
                    'app.search.actionButton.findMatchingPair'
                  ),
                  handler: () => {},
                  commingSoon: true
                }
              ]}
              isDisable={true}
            />
          </div>
        </>
      ) : (
        <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow">
          {isConfirmStone ? (
            <ConfirmStone
              rows={confirmStoneData}
              columns={columnData}
              goBackToListView={goBackToListView}
              activeTab={activeTab}
              isFrom={breadCrumLabel}
              handleDetailImage={handleDetailImage}
              handleDetailPage={handleDetailPage}
              identifier={'result'}
            />
          ) : isCompareStone ? (
            <CompareStone
              rows={compareStoneData}
              columns={columnData}
              goBackToListView={goBackToListView}
              activeTab={activeTab}
              isFrom={breadCrumLabel}
              handleDetailImage={handleDetailImage}
              setCompareStoneData={setCompareStoneData}
              compareStoneData={compareStoneData}
              setIsError={setIsError}
              setErrorText={setErrorText}
              setIsLoading={setIsLoading}
              setIsDialogOpen={setIsDialogOpen}
              setDialogContent={setDialogContent}
              setIsConfirmStone={setIsConfirmStone}
              setConfirmStoneData={setConfirmStoneData}
              setIsDetailPage={setIsDetailPage}
            />
          ) : showAppointmentForm ? (
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
          ) : (
            <div className="">
              {productData === undefined &&
              !memoizedRows.length &&
              !data.length ? (
                <DataTableSkeleton />
              ) : (
                <DataTable
                  rows={memoizedRows}
                  columns={memoizedColumns}
                  setRowSelection={setRowSelection}
                  rowSelection={rowSelection}
                  showCalculatedField={true}
                  isResult={true}
                  activeTab={activeTab}
                  searchParameters={searchParameters}
                  setActiveTab={setActiveTab}
                  handleCloseAllTabs={handleCloseAllTabs}
                  handleCloseSpecificTab={handleCloseSpecificTab}
                  handleNewSearch={handleNewSearch}
                  setSearchParameters={setSearchParameters}
                  modalSetState={modalSetState}
                  data={data}
                  setErrorText={setErrorText}
                  downloadExcel={downloadExcel}
                  setIsError={setIsError}
                  searchList={searchList}
                  setIsLoading={setIsLoading}
                  handleAddToCart={handleAddToCart}
                  setIsConfirmStone={setIsConfirmStone}
                  setConfirmStoneData={setConfirmStoneData}
                  setIsCompareStone={setIsCompareStone}
                  setCompareStoneData={setCompareStoneData}
                  setIsInputDialogOpen={setIsInputDialogOpen}
                  handleCreateAppointment={handleCreateAppointment}
                />
              )}
            </div>
          )}
          {/* <div className="p-[16px] rounded-b-[8px] shadow-inputShadow "> */}
          {isConfirmStone && (
            <div className="px-4 py-2">
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.confirmStone.footer.back'),
                    handler: () => {
                      goBackToListView();
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
                    label: ManageLocales(
                      'app.confirmStone.footer.confirmStone'
                    ),
                    handler: () => confirmStoneApiCall()
                  }
                ]}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Result;

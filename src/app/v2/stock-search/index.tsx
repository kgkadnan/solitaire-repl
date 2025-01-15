'use client';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import { ManageLocales } from '@/utils/v2/translate';
import { useDispatch } from 'react-redux';
import { dashboardResultPage } from '@/features/dashboard/dashboard-slice';
import { MRT_RowSelectionState, MRT_SortingState } from 'material-react-table';
import { trackEvent } from '@/utils/ga';
import { Tracking_Search_By_Text } from '@/constants/funnel-tracking';
import DataTable from '@/components/v2/common/data-table';
import { useAppSelector } from '@/hooks/hook';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import Tooltip from '@/components/v2/common/tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import chevronDown from '@public/v2/assets/icons/dashboard/chevron-down.svg';
import chevronUp from '@public/v2/assets/icons/dashboard/chevron-up.svg';
import contactIcon from '@public/v2/assets/icons/modal/contact-sale.svg';
import noImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import {
  faSort,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';
import { Skeleton } from '@mui/material';
import fireSvg from '@public/v2/assets/icons/data-table/fire-icon.svg';
import { FILE_URLS } from '@/constants/v2/detail-page';
import styles from './stock-search.module.scss';
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
  RenderPricePerCarat,
  RenderShape,
  RenderTracerId
} from '@/components/v2/common/data-table/helpers/render-cell';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MatchRoutes, SubRoutes } from '@/constants/v2/enums/routes';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import {
  useConfirmProductMutation,
  useGetProductByIdMutation
} from '@/features/api/product';
import { useAddCartMutation } from '@/features/api/cart';
import {
  NOT_MORE_THAN_300,
  SELECT_STONE_TO_PERFORM_ACTION
} from '@/constants/error-messages/search';
import { NO_STONES_SELECTED } from '@/constants/error-messages/cart';
import { IManageListingSequenceResponse, IProduct } from '../search/interface';
import CommonPoppup from '../login/component/common-poppup';
import { statusCode } from '@/constants/enums/status-code';
import { notificationBadge } from '@/features/notification/notification-slice';
import { handleConfirmStone } from '../search/result/helpers/handle-confirm-stone';
import { AVAILABLE_STATUS, HOLD_STATUS } from '@/constants/business-logic';
import {
  SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH,
  STONE_NOT_AVAILABLE_MODIFY_SEARCH
} from '@/constants/error-messages/confirm-stone';
import { IAppointmentPayload } from '../my-appointments';
import { useLazyGetAvailableMyAppointmentSlotsQuery } from '@/features/api/my-appointments';
import { handleCompareStone } from '../search/result/helpers/handle-compare-stone';
import BookAppointment from '../my-appointments/components/book-appointment/book-appointment';
import CompareStone from '../search/result/components/compare-stone';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import ConfirmStone from '../search/result/components';
import ActionButton from '@/components/v2/common/action-button';
import { kamLocationAction } from '@/features/kam-location/kam-location';
import { STONE_LOCATION } from '@/constants/v2/enums/location';
import { setConfirmStoneTrack } from '@/features/confirm-stone-track/confirm-stone-track-slice';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';
import {
  useLazyGetRequestCallBackTimeSlotsQuery,
  useReuestCallBackMutation
} from '@/features/api/request-call-back';
import { handleContactSaleTeam } from '../search/result/helpers/sale-team';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import { DialogComponent } from '@/components/v2/common/dialog';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { AddCommentDialog } from '@/components/v2/common/comment-dialog';
import { handleComment } from '../search/result/helpers/handle-comment';
import { getBreadcrumbLabel } from './helpers/getBreadcrumbLabel';
import DataTableSkeleton from '@/components/v2/skeleton/data-table';

const StockSearch = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const path = useSearchParams().get('path');

  const [downloadExcel] = useDownloadExcelMutation();
  const { errorSetState } = useErrorStateManagement();
  const [getProductById] = useGetProductByIdMutation();
  const [triggerAvailableSlots] = useLazyGetAvailableMyAppointmentSlotsQuery(
    {}
  );
  const [reuestCallBack] = useReuestCallBackMutation({});
  const [triggerColumn, { data: columnData }] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();
  const [addCart] = useAddCartMutation();
  const [triggerRequestCallTimeSlots] = useLazyGetRequestCallBackTimeSlotsQuery(
    {}
  );

  const [confirmProduct] = useConfirmProductMutation();

  const confirmTrack = useAppSelector(state => state.setConfirmStoneTrack);

  const { setIsError } = errorSetState;
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [isSomeStoneNotFoundShowed, setIsSomeStoneNotFoundShowed] =
    useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [validImages, setValidImages] = useState<any>([]);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [showOnlyWithVideo, setShowOnlyWithVideo] = useState(false);
  const [customerMobileNumber, setCustomerMobileNumber] = useState('');
  const [breadCrumLabel, setBreadCrumLabel] = useState('');
  const dashboardResultPageData = useAppSelector(
    state => state.dashboardResultPage
  );
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isResultPageDetails, setIsResultPageDetails] = useState(false);
  const [detailImageData, setDetailImageData] = useState<any>({});
  const [contactSaleTeamInputValue, setContactSaleTeamInputValue] =
    useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;

  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const [isConfirmStone, setIsConfirmStone] = useState(false);
  const [isDiamondDetail, setIsDiamondDetail] = useState(false);
  const [error, setError] = useState('');
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isCompareStone, setIsCompareStone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [confirmStoneData, setConfirmStoneData] = useState<IProduct[]>([]);
  const [compareStoneData, setCompareStoneData] = useState<IProduct[]>([]);
  const [isAddCommentDialogOpen, setIsAddCommentDialogOpen] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentPayload, setAppointmentPayload] =
    useState<IAppointmentPayload>({
      kam: { kam_name: '', image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });
  const [commentValue, setCommentValue] = useState('');
  const [lotIds, setLotIds] = useState<string[]>([]);

  const [requestCallTimeSlots, setRequestCallTimeSlots] = useState<any>({});

  const memoizedRows = useMemo(() => {
    setBreadCrumLabel(getBreadcrumbLabel(path ?? ''));
    return Array.isArray(dashboardResultPageData?.resultPageData?.foundProducts)
      ? dashboardResultPageData?.resultPageData?.foundProducts
      : [];
  }, [dispatch, dashboardResultPageData?.resultPageData]);

  useEffect(() => {
    if (
      dashboardResultPageData?.resultPageData?.notFoundKeywords?.length > 0 &&
      !isSomeStoneNotFoundShowed
    ) {
      setError('Some stones are not available');
      setIsSomeStoneNotFoundShowed(true);
    }
  }, [dashboardResultPageData?.resultPageData?.notFoundKeywords]);

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
        // setSearchColumn(updatedColumns);
        dispatch(dashboardResultPage({ columnData: updatedColumns }));
      }
    };

    const customerDetail = JSON.parse(localStorage.getItem('user')!);

    setCustomerMobileNumber(
      `+${customerDetail.customer.country_code}${customerDetail.customer.phone}`
    );

    fetchColumns();
  }, []);

  useEffect(() => {
    error &&
      setTimeout(() => {
        setError(''); // Hide the toast notification after some time
      }, 4000);
  }, [error]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelectorAll('.blink').forEach(element => {
        element.classList.remove(styles.blink);
      });
    }, 4000);

    return () => clearTimeout(timeout);
  }, [
    dashboardResultPageData?.isResultPage,
    isConfirmStone,
    isCompareStone,
    dashboardResultPageData?.resultPageData?.foundProducts
  ]);

  const handleDetailImageWithTrack = ({ row }: any) => {
    trackEvent({
      action: Tracking_Search_By_Text.click_stone_assets_result_page,
      category: 'SearchByText',
      mobile_number: customerMobileNumber
    });
    setIsResultPageDetails(true);
    setDetailImageData(row);
    setIsModalOpen(true);
  };

  const handleSelectData = ({ date }: { date: string }) => {
    if (Number(date) !== selectedDate) {
      setSelectedDate(Number(date));
      setSelectedSlot('');
    }
  };

  const handleSelectSlot = ({ slot }: { slot: string }) => {
    setSelectedSlot(prevSlot => (prevSlot === slot ? '' : slot));
  };

  const handleTrackEvent = () => {
    trackEvent({
      action: Tracking_Search_By_Text.click_stone_lab_result_page,
      category: 'SearchByText',
      mobile_number: customerMobileNumber
    });
  };

  const mapColumns = (columns: any) =>
    columns
      ?.filter(({ is_disabled }: any) => !is_disabled)
      ?.sort(({ sequence: a }: any, { sequence: b }: any) => a - b)
      .map(({ accessor, short_label, label }: any) => {
        const currentSort = sorting.find(sort => sort.id === accessor);
        const nonSortableAccessors = ['shape_full', 'details', 'fire_icon'];

        // Check if sorting should be disabled for the column's accessor
        const isSortable = !nonSortableAccessors.includes(accessor);
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          enableGlobalFilter: accessor === 'lot_id',
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
          case 'fire_icon':
            return {
              enableSorting: false,
              accessorKey: 'fire_icon',
              header: '',
              minSize: 20,
              size: 20,
              maxSize: 20,
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

          case 'table_inclusion':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-'
            };
          case 'table_black':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-'
            };

          case 'side_black':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-'
            };

          case 'fluorescence':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-'
            };
          case 'amount':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderAmount({
                  row,
                  modalSetState,
                  setContactSaleTeamInputValue
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
                return RenderNumericFields({
                  renderedCellValue,
                  modalSetState,
                  setContactSaleTeamInputValue,
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
          case 'discount':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue, row }: any) => {
                return RenderDiscount({
                  renderedCellValue,
                  modalSetState,
                  setContactSaleTeamInputValue,
                  row
                });
              }
            };
          case 'details':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderDetails({
                  row,
                  handleDetailImage: handleDetailImageWithTrack
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
          case 'price_per_carat':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue, row }: any) => {
                return RenderPricePerCarat({
                  renderedCellValue,
                  modalSetState,
                  setContactSaleTeamInputValue,
                  row
                });
              }
            };
          case 'lab':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue, row }: any) => {
                return RenderLab({
                  renderedCellValue,
                  row,
                  handleTrackEvent
                });
              }
            };
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
    () => mapColumns(dashboardResultPageData.columnData),
    [dashboardResultPageData.columnData, sorting]
  );

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
          const myCartCheck: IProduct | object | any =
            dashboardResultPageData?.resultPageData?.foundProducts.find(
              (row: IProduct) => {
                return row?.id === id;
              }
            ) ?? {};

          if (myCartCheck && 'variants' in myCartCheck) {
            return myCartCheck.variants[0]?.id;
          }
          return '';
        })
        ?.filter(Boolean);

      // If there are variant IDs, add to the cart
      if (variantIds.length) {
        trackEvent({
          action: Tracking_Search_By_Text.click_add_to_cart_result_page,
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
                content={''}
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
                          isResultPage: true,
                          resultPageData:
                            dashboardResultPageData?.resultPageData
                        })
                      );
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
              search_keyword: dashboardResultPageData.stoneId,
              search_type: dashboardResultPageData.searchType
            })
              .unwrap()
              .then((res: any) => {
                // setSearchData(res);
                // setIsDetailPage(true);
                dispatch(
                  dashboardResultPage({
                    resultPageData: res
                  })
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

  const handleCreateAppointment = () => {
    let selectedIds = Object.keys(rowSelection);

    if (selectedIds.length > 0) {
      // const hasMemoOut = selectedIds?.some((id: string) => {
      //   const stone =
      //     dashboardResultPageData?.resultPageData?.foundProducts.find(
      //       (row: any) => row?.id === id
      //     );
      //   return stone?.diamond_status === MEMO_STATUS;
      // });

      const hasHold = selectedIds?.some((id: string) => {
        const stone: any =
          dashboardResultPageData?.resultPageData?.foundProducts.find(
            (row: IProduct) => row?.id === id
          );
        return stone?.diamond_status === HOLD_STATUS;
      });

      // Check for stones with AVAILABLE_STATUS
      const hasAvailable = selectedIds?.some((id: string) => {
        const stone: any =
          dashboardResultPageData?.resultPageData?.foundProducts.find(
            (row: IProduct) => row?.id === id
          );
        return stone?.diamond_status === AVAILABLE_STATUS;
      });

      if (hasHold && hasAvailable) {
        setError(SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH);
      }
      // else if (hasMemoOut) {
      //   setError(STONE_NOT_AVAILABLE_MODIFY_SEARCH);
      // }
      else if (hasHold) {
        setError(STONE_NOT_AVAILABLE_MODIFY_SEARCH);
      } else {
        trackEvent({
          action: Tracking_Search_By_Text.click_book_appointment_result_page,
          category: 'SearchByText',
          mobile_number: customerMobileNumber
        });

        setShowAppointmentForm(true);
        triggerAvailableSlots({}).then(payload => {
          let { data } = payload.data;
          setAppointmentPayload(data);
        });

        const lotIdsWithCountry = selectedIds?.map((id: string) => {
          const foundProduct: any =
            dashboardResultPageData?.resultPageData?.foundProducts.find(
              (row: IProduct) => row?.id === id
            ) ?? {};

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

  const refreshSearchResults = (showOnlyWithVideo: boolean) => {
    getProductById({
      search_keyword: dashboardResultPageData.stoneId,
      search_type: dashboardResultPageData.searchType,
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

    setShowAppointmentForm(false);
    setAppointmentPayload({
      kam: { kam_name: '', image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });
    setBreadCrumLabel(getBreadcrumbLabel(path ?? ''));

    if (isFrom !== 'Compare Stone') {
      setIsCompareStone(false);
      setCompareStoneData([]);
    }
  };
  const handleDetailImage = ({ row }: any) => {
    setDetailImageData(row);
    setIsModalOpen(true);
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

    const customerDetail = JSON.parse(localStorage.getItem('user')!);

    checkLocation({
      kamLocation: customerDetail.customer.kam.location,
      variantIds
    });
    dispatch(kamLocationAction(customerDetail.customer.kam.location));
  };

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

  const renderContactSalesTeamContent = () => {
    return (
      <>
        {' '}
        <div className="absolute left-[-84px] top-[-84px]">
          <Image src={contactIcon} alt="contactIcon" />
        </div>
        <div
          className="absolute cursor-pointer left-[400px] top-[39px]"
          onClick={() => {
            modalSetState.setIsInputDialogOpen(false);
          }}
        >
          <Image src={crossIcon} alt="crossIcon" />
        </div>
        <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[400px]">
          <div>
            <h1 className="text-headingS text-neutral900">
              {' '}
              {ManageLocales('app.contactSaleTeam.header')}
            </h1>
            <p className="text-neutral600 text-mRegular">
              {ManageLocales('app.contactSaleTeam.subHeader')}
            </p>
          </div>
          <div>
            <textarea
              value={contactSaleTeamInputValue}
              name="textarea"
              rows={5}
              className="w-full bg-neutral0 text-neutral700 rounded-[4px] resize-none focus:outline-none p-2 border-neutral-200 border-[1px] mt-2"
              style={{ boxShadow: 'var(--input-shadow) inset' }}
              onChange={e =>
                handleContactSaleTeam(e, setContactSaleTeamInputValue)
              }
            />
          </div>

          <div className="flex flex-col  gap-2">
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: 'Email',
                  handler: () => {
                    const customerDetail = JSON.parse(
                      localStorage.getItem('user')!
                    );
                    // Email subject and body
                    const emailSubject = 'Completing KYC to Access Pricing';
                    const emailBody = contactSaleTeamInputValue;

                    // Create mailto URL
                    const mailtoURL = `mailto:${encodeURIComponent(
                      customerDetail?.customer?.kam?.email
                    )}?cc=${encodeURIComponent(
                      'shashank.giri@kgkmail.com'
                    )}&subject=${encodeURIComponent(
                      emailSubject
                    )}&body=${encodeURIComponent(emailBody)}`;

                    // Open the user's default email client
                    window.location.href = mailtoURL;
                  },
                  isDisable: !contactSaleTeamInputValue.length,
                  customStyle: 'flex-1'
                },
                {
                  variant: 'primary',
                  label: 'WhatsApp',
                  isDisable: !contactSaleTeamInputValue.length,
                  handler: () => {
                    const encodedMessage = encodeURIComponent(
                      contactSaleTeamInputValue
                    );

                    // WhatsApp URL with all links
                    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;

                    // Open WhatsApp in a new tab or window
                    window.open(whatsappURL, '_blank');
                  },
                  customStyle: 'flex-1'
                }
              ]}
            />
            <div className="text-center">or</div>
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
                    });
                  },
                  customStyle: 'flex-1 w-full'
                }
              ]}
            />
          </div>
        </div>
      </>
    );
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

  return (
    <>
      {error !== '' && (
        <Toast show={error !== ''} message={error} isSuccess={false} />
      )}

      <InputDialogComponent
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
      />
      <ImageModal
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
      />

      <DialogComponent dialogContent={dialogContent} isOpens={isDialogOpen} />
      {isLoading && <CustomKGKLoader />}
      <AddCommentDialog
        isOpen={isAddCommentDialogOpen}
        onClose={() => setIsAddCommentDialogOpen(false)}
        renderContent={renderAddCommentDialogs}
      />

      {isConfirmStone ? (
        <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow mt-[16px]">
          <ConfirmStone
            rows={confirmStoneData}
            columns={columnData}
            goBackToListView={goBackToListView}
            // activeTab={activeTab}
            isFrom={
              detailPageData?.length
                ? 'Detail Page'
                : isCompareStone
                ? 'Compare Stone'
                : 'Search Results'
            }
            handleDetailImage={handleDetailImage}
            handleDetailPage={handleDetailPage}
            identifier="Dashboard"
            customerMobileNumber={customerMobileNumber}
          />
          <div className="px-4 py-2">
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.confirmStone.footer.back'),
                  handler: () => {
                    trackEvent({
                      action: Tracking_Search_By_Text.click_back_confirm_page,
                      category: 'SearchByText',
                      mobile_number: customerMobileNumber
                    });

                    goBackToListView(
                      detailPageData?.length
                        ? 'Detail Page'
                        : isCompareStone
                        ? 'Compare Stone'
                        : 'Dashboard'
                    );
                  }
                },

                {
                  variant: 'secondary',
                  label: ManageLocales('app.confirmStone.footer.addComment'),
                  handler: () => {
                    trackEvent({
                      action:
                        Tracking_Search_By_Text.click_add_comment_confirm_page,
                      category: 'SearchByText',
                      mobile_number: customerMobileNumber
                    });
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
              isFrom={'Search Results'}
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
              dispatch={dispatch}
              dashboardResultPageData={dashboardResultPageData}
              modalSetState={modalSetState}
              refreshCompareStone={refreshSearchResults}
              setIsCompareStone={setIsCompareStone}
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
      ) : (
        <div className="mb-[10px]">
          {columnData?.length ? (
            <div className="flex py-[8px] items-center ">
              <p className="text-lMedium font-medium text-neutral900">
                {isCompareStone
                  ? 'Diamond Comparison Overview'
                  : ManageLocales('app.result.headerResult')}
              </p>
            </div>
          ) : (
            <Skeleton
              width={336}
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={24}
              variant="rectangular"
              animation="wave"
              className="rounded-[4px]"
            />
          )}
          {columnData?.length && memoizedRows?.length ? (
            <div className="border-[1px] border-neutral200 rounded-[8px]">
              <div className="flex items-center border-b-[1px] border-neutral200 p-2">
                <Image
                  src={backWardArrow}
                  alt="backWardArrow"
                  onClick={() => {
                    // setIsDetailPage(false);

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
                    if (breadCrumLabel === 'Dashboard') {
                      router.push('/v2');
                    } else {
                      router.back();
                    }

                    setShowEmptyState(false);
                    setIsSomeStoneNotFoundShowed(false);
                    setSorting([]);
                    setRowSelection({});
                    setShowOnlyWithVideo(false);
                    trackEvent({
                      action: Tracking_Search_By_Text.click_back_results_page,
                      category: 'SearchByText',
                      mobile_number: customerMobileNumber
                    });
                  }}
                  className="cursor-pointer"
                />
                <div className="flex gap-[8px] items-center">
                  <button
                    className="text-neutral600 text-sMedium font-regular cursor-pointer"
                    onClick={() => {
                      // setIsDetailPage(false);
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
                      if (breadCrumLabel === 'Dashboard') {
                        router.push('/v2');
                      } else {
                        router.back();
                      }
                      setShowEmptyState(false);
                      setIsSomeStoneNotFoundShowed(false);
                      setSorting([]);
                      setRowSelection({});
                      setShowOnlyWithVideo(false);
                      trackEvent({
                        action: Tracking_Search_By_Text.click_back_results_page,
                        category: 'SearchByText',
                        mobile_number: customerMobileNumber
                      });
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
                setSorting={setSorting}
                sorting={sorting}
                setIsError={setIsError}
                setIsLoading={setIsLoading}
                handleAddToCart={handleAddToCart}
                handleConfirmStone={handleConfirmStone}
                setIsConfirmStone={setIsConfirmStone}
                setConfirmStoneData={setConfirmStoneData}
                isDashboard={true}
                setIsCompareStone={setIsCompareStone}
                setCompareStoneData={setCompareStoneData}
                handleCreateAppointment={handleCreateAppointment}
                refreshSearchResults={refreshSearchResults}
                customerMobileNumber={customerMobileNumber}
                showOnlyWithVideo={showOnlyWithVideo}
                setShowOnlyWithVideo={setShowOnlyWithVideo}
                showEmptyState={showEmptyState}
                dispatch={dispatch}
                dashboardResultPageData={dashboardResultPageData}
              />
            </div>
          ) : (
            <DataTableSkeleton />
          )}
        </div>
      )}
    </>
  );
};

export default StockSearch;

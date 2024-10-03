'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  RenderCarat,
  RenderDiscount,
  RenderDetails,
  RenderLab,
  RednderLocation,
  RenderShape,
  RenderMeasurements,
  RenderTracerId,
  RenderNewArrivalBidDiscount,
  RenderNewArrivalPricePerCarat,
  RenderBidDate,
  RenderNumericFields,
  RenderLotId,
  RenderAmount
} from '@/components/v2/common/data-table/helpers/render-cell';
import Tooltip from '@/components/v2/common/tooltip';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { columnHeaders } from './constant';
import noImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import { useLazyGetCustomerQuery } from '@/features/api/dashboard';
import CommonPoppup from '../login/component/common-poppup';
import { DialogComponent } from '@/components/v2/common/dialog';
import ActionButton from '@/components/v2/common/action-button';
import {
  MRT_RowSelectionState,
  MRT_TablePagination
} from 'material-react-table';
import Image from 'next/image';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';
import { Dropdown } from '@/components/v2/common/dropdown-menu';
import threeDotsSvg from '@public/v2/assets/icons/threedots.svg';
import { ManageLocales } from '@/utils/v2/translate';
import { IAppointmentPayload } from '../my-appointments/page';
import { useLazyGetAvailableMyAppointmentSlotsQuery } from '@/features/api/my-appointments';
import {
  SELECT_STONE_TO_PERFORM_ACTION,
  SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH,
  STONE_NOT_AVAILABLE_MODIFY_SEARCH
} from '@/constants/error-messages/confirm-stone';
import BookAppointment from '../my-appointments/components/book-appointment/book-appointment';
import {
  AVAILABLE_STATUS,
  HOLD_STATUS,
  LISTING_PAGE_DATA_LIMIT,
  MEMO_STATUS
} from '@/constants/business-logic';
import { kycStatus } from '@/constants/enums/kyc';
import BiddingSkeleton from '@/components/v2/skeleton/bidding';
import { useAppSelector } from '@/hooks/hook';
import Form from '../search/form/form';
import useValidationStateManagement from '../search/hooks/validation-state-management';
import useFormStateManagement from '../search/form/hooks/form-state';
import useNumericFieldValidation from '../search/form/hooks/numeric-field-validation-management';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import {
  useCheckProductAvailabilityMutation,
  useConfirmProductMutation,
  useLazyGetAllTurkeyProductQuery
} from '@/features/api/product';
import { statusCode } from '@/constants/enums/status-code';
import { NO_PRODUCT_FOUND } from '@/constants/error-messages/saved';
import TurkeyDataTable from './components/data-table';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { IManageListingSequenceResponse, IProduct } from '../search/interface';
import { NOT_MORE_THAN_300 } from '@/constants/error-messages/search';
import { handleConfirmStone } from '../search/result/helpers/handle-confirm-stone';
import { handleCompareStone } from '../search/result/helpers/handle-compare-stone';
import { NO_STONES_SELECTED } from '@/constants/error-messages/cart';
import { notificationBadge } from '@/features/notification/notification-slice';
import { useDispatch } from 'react-redux';
import { useAddCartMutation } from '@/features/api/cart';
import ConfirmStone from '../search/result/components';
import CompareStone from '../search/result/components/compare-stone';
import { STONE_LOCATION } from '@/constants/v2/enums/location';
import { kamLocationAction } from '@/features/kam-location/kam-location';
import { setConfirmStoneTrack } from '@/features/confirm-stone-track/confirm-stone-track-slice';
import { AddCommentDialog } from '@/components/v2/common/comment-dialog';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import { handleComment } from '../search/result/helpers/handle-comment';
import { generateQueryParams } from '../search/form/helpers/generate-query-parameters';
import { constructUrlParams } from '@/utils/v2/construct-url-params';

const Turkey = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const subRoute = useSearchParams().get('active-tab');
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [detailImageData, setDetailImageData] = useState<any>({});
  const [validImages, setValidImages] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [searchLoading, setSearchLoading] = useState(false);
  const [triggerTurkeyProductApi] = useLazyGetAllTurkeyProductQuery();
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);

  const { setSearchUrl, searchUrl } = useValidationStateManagement();
  const { state, setState, carat } = useFormStateManagement();
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [isAddDemand, setIsAddDemand] = useState(false);
  const [column, setColumn] = useState<any>([]);
  const [isAddCommentDialogOpen, setIsAddCommentDialogOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');

  const [commentValue, setCommentValue] = useState('');
  const kamLocation = useAppSelector(state => state.kamLocation);
  const confirmTrack = useAppSelector(state => state.setConfirmStoneTrack);
  const queryParamsData = useAppSelector(state => state.queryParams);

  const [isConfirmStone, setIsConfirmStone] = useState(false);
  const [confirmStoneData, setConfirmStoneData] = useState<IProduct[]>([]);
  const [compareStoneData, setCompareStoneData] = useState<IProduct[]>([]);
  const [isCompareStone, setIsCompareStone] = useState(false);

  const handleDetailPage = ({ row }: { row: any }) => {
    setIsDetailPage(true);
    setDetailPageData(row);
  };

  const handleDetailImage = ({ row }: any) => {
    setDetailImageData(row);
    setIsModalOpen(true);
  };
  let queryData = constructUrlParams(queryParamsData.queryParams);

  useEffect(() => {
    setSearchUrl(queryData), fetchProducts(queryData);
  }, [queryData]);

  const [triggerColumn, { data: columnData }] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();
  const mapColumns = (columns: any) =>
    columns
      ?.filter(({ is_disabled }: any) => !is_disabled)
      .map(({ accessor, short_label, label }: any) => {
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          enableGlobalFilter: accessor === 'lot_id',
          // enableGrouping: accessor === 'shape',
          enableSorting:
            accessor !== 'shape_full' &&
            accessor !== 'details' &&
            accessor !== 'fire_icon',
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
          case 'rap':
          case 'rap_value':
            return { ...commonProps, Cell: RenderNumericFields };
          case 'amount':
            return { ...commonProps, Cell: RenderAmount };
          case 'measurements':
            return { ...commonProps, Cell: RenderMeasurements };
          case 'shape':
            return { ...commonProps, Cell: RenderShape };
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
          case 'current_max_bid':
            return { ...commonProps, Cell: RenderNewArrivalBidDiscount };
          case 'last_bid_date':
            return { ...commonProps, Cell: RenderBidDate };

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
                return RenderDetails({ row, handleDetailImage });
              }
            };
          case 'lab':
            return { ...commonProps, Cell: RenderLab };
          case 'location':
            return { ...commonProps, Cell: RednderLocation };

          case 'price_per_carat':
            return { ...commonProps, Cell: RenderNewArrivalPricePerCarat };

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

  const fetchProducts = async (query?: string) => {
    setIsSkeletonLoading(true);
    triggerTurkeyProductApi({
      url: query ?? searchUrl,
      limit: 300,
      offset: 0
    }).then((res: any) => {
      if (columnHeaders?.length > 0) {
        if (res?.error?.status === statusCode.UNAUTHORIZED) {
          // setHasLimitExceeded(true);
          setBid([]);
        } else {
          // setHasLimitExceeded(false);
          if (res.data?.products.length > 0) {
            setBid(res.data?.products);
            setIsSkeletonLoading(false);
          } else {
            modalSetState.setIsDialogOpen(true);
            modalSetState.setDialogContent(
              <CommonPoppup
                status="warning"
                content={''}
                customPoppupBodyStyle="!mt-[70px]"
                header={NO_PRODUCT_FOUND}
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => {
                      modalSetState.setIsDialogOpen(false);
                    },
                    customStyle: 'flex-1 h-10'
                  }
                ]}
              />
            );
          }
          // res.data?.products;
        }

        setRowSelection({});
        setErrorText('');
        setBid(res.data?.products);
        setIsLoading(false);
      }
    });
  };
  useEffect(() => {
    // setIsLoading(true)
    // let queryData=generateQueryParams(queryParamsData.queryParams)

    queryData === '' && fetchProducts();
  }, []);

  const [bid, setBid] = useState<any>();

  useEffect(() => {
    const fetchColumns = async () => {
      const response = await triggerColumn({});
      // const shapeColumn = response.data?.find(
      //   (column: any) => column.accessor === 'shape'
      // );

      if (response.data?.length) {
        // let additionalColumn = {
        //   accessor: 'shape_full',
        //   id: shapeColumn?.id,
        //   is_disabled: shapeColumn?.is_disabled,
        //   is_fixed: shapeColumn?.is_fixed,
        //   label: shapeColumn?.label,
        //   sequence: shapeColumn?.sequence,
        //   short_label: shapeColumn?.short_label
        // };

        // let addFireIconCol = {
        //   accessor: 'fire_icon',
        //   id: 'sub_col_13a',
        //   is_disabled: false,
        //   is_fixed: false,
        //   label: '',
        //   sequence: 0,
        //   short_label: ''
        // };

        const updatedColumns = [
          ...response.data
          // additionalColumn,
          // addFireIconCol
        ];

        setColumn(updatedColumns);
      }
    };

    fetchColumns();
  }, [bid]);
  const memoizedColumns = useMemo(() => mapColumns(column), [column]);
  const { modalState, modalSetState } = useModalStateManagement();
  const { errorState, errorSetState } = useErrorStateManagement();
  const formErrorState = useNumericFieldValidation();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentPayload, setAppointmentPayload] =
    useState<IAppointmentPayload>({
      kam: { kam_name: '', image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });

  const [triggerAvailableSlots] = useLazyGetAvailableMyAppointmentSlotsQuery(
    {}
  );
  const [checkProductAvailability] = useCheckProductAvailabilityMutation({});
  const [triggerGetCustomer] = useLazyGetCustomerQuery({});
  const [confirmProduct] = useConfirmProductMutation();

  const [lotIds, setLotIds] = useState<string[]>([]);

  const { setIsError, setErrorText } = errorSetState;
  const { isError, errorText } = errorState;

  const [downloadExcel] = useDownloadExcelMutation();
  const [addCart] = useAddCartMutation();

  const handleCreateAppointment = () => {
    let selectedIds = Object.keys(rowSelection);

    let data: any = bid;

    if (selectedIds.length > 0) {
      const hasMemoOut = selectedIds?.some((id: string) => {
        const stone = data.find((row: any) => row?.id === id);
        return stone?.diamond_status === MEMO_STATUS;
      });

      const hasHold = selectedIds?.some((id: string) => {
        const stone = data.find((row: any) => row?.id === id);
        return stone?.diamond_status === HOLD_STATUS;
      });

      setShowAppointmentForm(true);
      triggerAvailableSlots({}).then(payload => {
        let { data } = payload.data;
        setAppointmentPayload(data);
      });

      // Check for stones with AVAILABLE_STATUS
      const hasAvailable = selectedIds?.some((id: string) => {
        const stone = data.find((row: any) => row?.id === id);
        return stone?.diamond_status === AVAILABLE_STATUS;
      });

      if ((hasHold && hasAvailable) || (hasMemoOut && hasAvailable)) {
        setErrorText(SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH);
        setIsError(true);
      } else if (hasMemoOut) {
        setErrorText(STONE_NOT_AVAILABLE_MODIFY_SEARCH);
        setIsError(true);
      } else if (hasHold) {
        setErrorText(STONE_NOT_AVAILABLE_MODIFY_SEARCH);
        setIsError(true);
      } else {
        const lotIdsWithCountry = selectedIds?.map((id: string) => {
          const foundProduct: any =
            data.find((row: any) => {
              return row?.id === id;
            }) ?? {};

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
            bid?.find((row: IProduct) => {
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
            modalSetState.setIsDialogOpen(true);
            modalSetState.setDialogContent(
              <CommonPoppup
                content={''}
                status="success"
                customPoppupBodyStyle="!mt-[70px]"
                header={res?.message}
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.continue'),
                    handler: () => modalSetState.setIsDialogOpen(false),
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
            triggerTurkeyProductApi({
              url: searchUrl,
              limit: LISTING_PAGE_DATA_LIMIT,
              offset: 0
            }).then(res => {
              if (res.data?.products.length > 0) {
                setBid(res.data?.products);
              } else {
                modalSetState.setIsDialogOpen(true);
                modalSetState.setDialogContent(
                  <CommonPoppup
                    status="warning"
                    content={''}
                    customPoppupBodyStyle="!mt-[70px]"
                    header={NO_PRODUCT_FOUND}
                    actionButtonData={[
                      {
                        variant: 'primary',
                        label: ManageLocales('app.modal.okay'),
                        handler: () => {
                          modalSetState.setIsDialogOpen(false);
                        },
                        customStyle: 'flex-1 h-10'
                      }
                    ]}
                  />
                );
              }
              // res.data?.products;
              setRowSelection({});
              setErrorText('');
              setBid(res.data?.products);
            });
            dispatch(notificationBadge(true));

            // refetchRow();
          })
          .catch(error => {
            setIsLoading(false);
            // On error, set error state and error message

            modalSetState.setIsDialogOpen(true);
            modalSetState.setDialogContent(
              <CommonPoppup
                content={''}
                customPoppupBodyStyle="!mt-[70px]"
                header={error?.data?.message}
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => {
                      modalSetState.setIsDialogOpen(false);
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
    setIsLoading(true);
    // Extract variant IDs for selected stones
    const variantIds = [detailPageData.id]
      ?.map((_id: string) => {
        const myCartCheck: IProduct | object =
          bid.find((row: IProduct) => {
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
          modalSetState.setIsDialogOpen(true);
          modalSetState.setDialogContent(
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
                    modalSetState.setIsDialogOpen(false);
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
          triggerTurkeyProductApi({
            url: searchUrl,
            limit: LISTING_PAGE_DATA_LIMIT,
            offset: 0
          }).then(res => {
            if (res.data?.products.length > 0) {
              setBid(res.data?.products);
            } else {
              modalSetState.setIsDialogOpen(true);
              modalSetState.setDialogContent(
                <CommonPoppup
                  status="warning"
                  content={''}
                  customPoppupBodyStyle="!mt-[70px]"
                  header={NO_PRODUCT_FOUND}
                  actionButtonData={[
                    {
                      variant: 'primary',
                      label: ManageLocales('app.modal.okay'),
                      handler: () => {
                        modalSetState.setIsDialogOpen(false);
                      },
                      customStyle: 'flex-1 h-10'
                    }
                  ]}
                />
              );
            }
            res.data?.products;
            setRowSelection({});
            setErrorText('');
            setBid(res.data?.products);
          });
          dispatch(notificationBadge(true));
        })
        .catch(error => {
          setIsLoading(false);
          // On error, set error state and error message

          modalSetState.setIsDialogOpen(true);
          modalSetState.setDialogContent(
            <CommonPoppup
              content={''}
              customPoppupBodyStyle="!mt-[70px]"
              header={error?.data?.message}
              actionButtonData={[
                {
                  variant: 'primary',
                  label: ManageLocales('app.modal.okay'),
                  handler: () => {
                    modalSetState.setIsDialogOpen(false);
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
  };
  const renderFooter = (table: any) => {
    if (bid?.length > 0) {
      return (
        <div className="flex items-center justify-between px-4 py-0">
          <div className="flex gap-2">
            <div className=" border-[1px] border-lengendInCardBorder rounded-[4px] bg-legendInCartFill text-legendInCart">
              <p className="text-mMedium font-medium px-[6px] py-[4px]">
                In Cart
              </p>
            </div>
            <div className=" border-[1px] border-lengendHoldBorder rounded-[4px] bg-legendHoldFill text-legendHold">
              <p className="text-mMedium font-medium px-[6px] py-[4px]">
                {' '}
                Hold
              </p>
            </div>
            <div className="border-[1px] border-lengendMemoBorder rounded-[4px] bg-legendMemoFill text-legendMemo">
              <p className="text-mMedium font-medium px-[6px] py-[4px]">
                {' '}
                Memo
              </p>
            </div>
          </div>
          <MRT_TablePagination table={table} />
          <div className="flex items-center gap-3">
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.searchResult.addToCart'),
                  handler: () => handleAddToCart(),
                  isDisable: true //!Object.keys(rowSelection).length
                },

                {
                  variant: 'primary',
                  label: ManageLocales('app.searchResult.confirmStone'),
                  isDisable: true, //!Object.keys(rowSelection).length,
                  handler: () => {
                    handleConfirmStone({
                      selectedRows: rowSelection,
                      rows: bid,
                      setIsError,
                      setErrorText,
                      setIsConfirmStone,
                      setConfirmStoneData,
                      checkProductAvailability,
                      modalSetState,
                      router,
                      setIsLoading
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
                  width={43}
                  height={43}
                />
              }
              dropdownMenu={[
                {
                  label: 'Compare Stone',
                  handler: () =>
                    handleCompareStone({
                      isCheck: rowSelection,
                      setIsError,
                      setErrorText,
                      activeCartRows: bid,
                      setIsCompareStone,
                      setCompareStoneData
                    }),
                  isDisable: true // !Object.keys(rowSelection).length
                },
                {
                  label: ManageLocales(
                    'app.search.actionButton.bookAppointment'
                  ),
                  handler: () => {
                    handleCreateAppointment();
                  },
                  isDisable: true
                  // !Object.keys(rowSelection).length ||
                  // isKycVerified?.customer?.kyc?.status ===
                  //   kycStatus.INPROGRESS ||
                  // isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED
                }
              ]}
            />
          </div>
        </div>
      );
    } else {
      return <></>;
    }
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
      name: 'Sparkle',
      url: `${FILE_URLS.B2B_SPARKLE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      url_check: detailImageData?.assets_pre_check?.B2B_SPARKLE_CHECK,
      category: 'Sparkle'
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

  const goBack = () => {
    setIsDetailPage(false);
    setDetailPageData({});
    setShowAppointmentForm(false);
    setAppointmentPayload({
      kam: { kam_name: '', image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });
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

  const goBackToListView = (isFrom?: string) => {
    if (isFrom === 'Detail Page') {
      setIsDetailPage(true);
      // setBreadCrumLabel('');
    }
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

  const confirmStone = () => {
    const variantIds: string[] = [];

    confirmStoneData.forEach((ids: any) => {
      variantIds.push(ids.variants[0].id);
    });

    if (!kamLocation.location) {
      triggerGetCustomer({}).then(res => {
        let kamLocation = res.data.customer.kam.location;
        dispatch(kamLocationAction(kamLocation));
        checkLocation({ kamLocation, variantIds });
      });
    } else {
      checkLocation({ kamLocation: kamLocation.location, variantIds });
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
      modalSetState.setIsDialogOpen(true);
      modalSetState.setDialogContent(
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
              handler: () => modalSetState.setIsDialogOpen(false),
              customStyle: 'flex-1 w-full h-10'
            },
            {
              variant: 'primary',
              label: 'Confirm Order',
              handler: () => {
                modalSetState.setIsDialogOpen(false);
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

  const confirmStoneApiCall = ({ variantIds }: { variantIds: string[] }) => {
    if (variantIds.length) {
      setIsLoading(true);
      confirmProduct({
        variants: variantIds,
        comments: commentValue,
        identifier: confirmTrack.confirmStoneTrack
          ? confirmTrack.confirmStoneTrack
          : 'Searching'
      })
        .unwrap()
        .then(res => {
          if (res) {
            setIsLoading(false);
            setCommentValue('');
            modalSetState.setIsDialogOpen(true);
            setRowSelection({});
            dispatch(setConfirmStoneTrack(''));

            const formatMessage = (message: string) => {
              return message.split('\n').map((line: string, index: number) => (
                <span key={index}>
                  <span dangerouslySetInnerHTML={{ __html: line }} />
                  <br />
                </span>
              ));
            };
            modalSetState.setDialogContent(
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
                      modalSetState.setIsDialogOpen(false);
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

            triggerTurkeyProductApi({
              url: searchUrl,
              limit: LISTING_PAGE_DATA_LIMIT,
              offset: 0
            }).then(res => {
              if (res.data?.products.length > 0) {
                setBid(res.data?.products);
              } else {
                modalSetState.setIsDialogOpen(true);
                modalSetState.setDialogContent(
                  <CommonPoppup
                    status="warning"
                    content={''}
                    customPoppupBodyStyle="!mt-[70px]"
                    header={NO_PRODUCT_FOUND}
                    actionButtonData={[
                      {
                        variant: 'primary',
                        label: ManageLocales('app.modal.okay'),
                        handler: () => {
                          modalSetState.setIsDialogOpen(false);
                        },
                        customStyle: 'flex-1 h-10'
                      }
                    ]}
                  />
                );
              }
              res.data?.products;
              setRowSelection({});
              setErrorText('');
              setBid(res.data?.products);
            });
          }
        })
        .catch(e => {
          setIsLoading(false);
          setCommentValue('');
          dispatch(setConfirmStoneTrack(''));

          if (e.data.type === 'unauthorized') {
            modalSetState.setIsDialogOpen(true);
            modalSetState.setDialogContent(
              <CommonPoppup
                content={
                  'To confirm a stone or make a purchase, KYC verification is mandatory. Without verification, access to certain features is restricted.'
                }
                customPoppupStyle="h-[260px]"
                customPoppupBodyStyle="!mt-[62px]"
                header={`Important KYC Verification Required!`}
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.cancel'),
                    handler: () => modalSetState.setIsDialogOpen(false),
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
            modalSetState.setIsDialogOpen(true);
            modalSetState.setDialogContent(
              <CommonPoppup
                content={e?.data?.message}
                customPoppupBodyStyle="!mt-[70px]"
                header={``}
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => {
                      modalSetState.setIsDialogOpen(false);
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
  return (
    <div className="mb-[4px] relative">
      {isError && (
        <Toast show={isError} message={errorText} isSuccess={false} />
      )}
      {isLoading && <CustomKGKLoader />}

      <ImageModal
        isOpen={isModalOpen}
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
        dialogStyle={{ dialogContent: isAddDemand ? 'min-h-[280px]' : '' }}
      />
      <AddCommentDialog
        isOpen={isAddCommentDialogOpen}
        onClose={() => setIsAddCommentDialogOpen(false)}
        renderContent={renderAddCommentDialogs}
      />
      {isDetailPage ? (
        <div className="mt-[16px]">
          <div>
            <DiamondDetailsComponent
              data={bid}
              filterData={detailPageData}
              goBackToListView={goBack}
              handleDetailPage={handleDetailPage}
              breadCrumLabel={'Diamond List'}
              modalSetState={modalSetState}
              setIsLoading={setIsLoading}
              activeTab={activeTab}
            />
            <div className="p-[8px] flex justify-end items-center border-t-[1px] border-l-[1px] border-neutral-200 gap-3 rounded-b-[8px] shadow-inputShadow mb-1">
              <ActionButton
                actionButtonData={[
                  {
                    variant: isConfirmStone ? 'primary' : 'secondary',
                    label: ManageLocales('app.searchResult.addToCart'),
                    handler: handleAddToCartDetailPage,
                    isDisable: true
                  },

                  {
                    variant: 'primary',
                    label: ManageLocales('app.searchResult.confirmStone'),
                    isHidden: isConfirmStone,
                    isDisable: true,
                    handler: () => {
                      // setBreadCrumLabel('Detail Page');
                      const { id } = detailPageData;
                      const selectedRows = { [id]: true };
                      handleConfirmStone({
                        selectedRows: selectedRows,
                        rows: bid,
                        setIsError,
                        setErrorText,
                        setIsConfirmStone,
                        setConfirmStoneData,
                        setIsDetailPage,
                        identifier: 'detailPage',
                        confirmStoneTrack: 'DNA',
                        dispatch,
                        router,
                        modalSetState,
                        checkProductAvailability,
                        setIsLoading
                        // refreshSearchResults
                      });
                    }
                  }
                ]}
              />
            </div>
          </div>
        </div>
      ) : isConfirmStone ? (
        <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow">
          <ConfirmStone
            rows={confirmStoneData}
            columns={columnData}
            goBackToListView={goBackToListView}
            activeTab={activeTab}
            isFrom={'Diamond List'}
            handleDetailImage={handleDetailImage}
            handleDetailPage={handleDetailPage}
            identifier={'Event'}
          />
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
                  label: ManageLocales('app.confirmStone.footer.confirmStone'),
                  handler: () => confirmStone()
                }
              ]}
            />
          </div>
        </div>
      ) : isCompareStone ? (
        <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow">
          <CompareStone
            rows={compareStoneData}
            columns={columnData}
            goBackToListView={goBackToListView}
            activeTab={activeTab}
            isFrom={'Diamond List'}
            handleDetailImage={handleDetailImage}
            setCompareStoneData={setCompareStoneData}
            compareStoneData={compareStoneData}
            setIsError={setIsError}
            setErrorText={setErrorText}
            setIsLoading={setIsLoading}
            setIsDialogOpen={modalSetState.setIsDialogOpen}
            setDialogContent={modalSetState.setDialogContent}
            setIsConfirmStone={setIsConfirmStone}
            setConfirmStoneData={setConfirmStoneData}
            setIsDetailPage={setIsDetailPage}
            modalSetState={modalSetState}
            // refreshCompareStone={refreshSearchResults}
          />
        </div>
      ) : showAppointmentForm ? (
        <>
          <div className="flex  py-[12px] items-center justify-between">
            <p className="text-lMedium font-medium text-neutral900">
              {ManageLocales('app.myAppointment.header')}
            </p>
          </div>
          <div className="border-[1px] border-neutral200 rounded-[8px]">
            <BookAppointment
              breadCrumLabel={ManageLocales(
                'app.myAppointments.myAppointments'
              )}
              goBackToListView={goBack}
              appointmentPayload={appointmentPayload}
              setIsLoading={setIsLoading}
              modalSetState={modalSetState}
              lotIds={lotIds}
              setRowSelection={setRowSelection}
              errorSetState={errorSetState}
            />
          </div>
        </>
      ) : bid === undefined ? (
        <BiddingSkeleton />
      ) : (
        <>
          {subRoute === 'form' ? (
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
              setIsCommonLoading={setIsLoading}
              isMatchingPair={false}
              isLoading={searchLoading}
              isTurkey={true}
            />
          ) : (
            <>
              {isSkeletonLoading ? (
                ''
              ) : (
                <div className="flex py-[4px] items-center justify-between">
                  <>
                    {' '}
                    <p className="text-lMedium font-medium text-neutral900">
                      Diamond List
                    </p>
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
                  <TurkeyDataTable
                    searchUrl={searchUrl}
                    setSearchUrl={setSearchUrl}
                    columns={memoizedColumns}
                    modalSetState={modalSetState}
                    setErrorText={setErrorText}
                    downloadExcel={downloadExcel}
                    setIsError={setIsError}
                    activeTab={0}
                    rows={bid}
                    isSkeletonLoading={isSkeletonLoading}
                    setIsSkeletonLoading={setIsSkeletonLoading}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                    setIsLoading={setIsLoading}
                    renderFooter={renderFooter}
                    router={router}
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
export default Turkey;

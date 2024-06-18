'use client';
import DataTable from '@/components/v2/common/data-table';
import { useDataTableStateManagement } from '@/components/v2/common/data-table/hooks/data-table-state-management';
import {
  AVAILABLE_STATUS,
  BID_TO_BUY_STATUS,
  HOLD_STATUS,
  MEMO_STATUS,
  SOLD_STATUS
} from '@/constants/business-logic';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { ManageLocales } from '@/utils/v2/translate';
import { MRT_RowSelectionState } from 'material-react-table';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import Image from 'next/image';
import Tooltip from '@/components/v2/common/tooltip';
import React, { useEffect, useState } from 'react';
import {
  useDeleteCartMutation,
  useLazyGetCartQuery
} from '@/features/api/cart';
import ActionButton from '@/components/v2/common/action-button';
import EmptyScreen from '@/components/v2/common/empty-screen';
import empty from '@public/v2/assets/icons/my-cart/empty-cart.svg';
import { DialogComponent } from '@/components/v2/common/dialog';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import deleteIcon from '@public/v2/assets/icons/modal/bin.svg';

import threeDotsSvg from '@public/v2/assets/icons/threedots.svg';
import {
  RednderLocation,
  RenderAmount,
  RenderCarat,
  RenderCartLotId,
  RenderDetails,
  RenderDiscount,
  RenderLab,
  RenderMeasurements,
  RenderShape,
  RenderTracerId
} from '@/components/v2/common/data-table/helpers/render-cell';

import {
  clarity,
  fluorescenceSortOrder,
  sideBlackSortOrder,
  tableBlackSortOrder,
  tableInclusionSortOrder
} from '@/constants/v2/form';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { NO_STONES_SELECTED } from '@/constants/error-messages/cart';
import { handleConfirmStone } from '../search/result/helpers/handle-confirm-stone';
import ConfirmStone from '../search/result/components';
import { AddCommentDialog } from '@/components/v2/common/comment-dialog';
import { handleComment } from '../search/result/helpers/handle-comment';
import { useRouter, useSearchParams } from 'next/navigation';
import { useConfirmProductMutation } from '@/features/api/product';
import { Dropdown } from '@/components/v2/common/dropdown-menu';
import { IProduct, IProductItem } from '../search/interface';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import { FILE_URLS } from '@/constants/v2/detail-page';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { SubRoutes } from '@/constants/v2/enums/routes';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import { kycStatus } from '@/constants/enums/kyc';
import { formatNumber } from '@/utils/fix-two-digit-number';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';
import { IAppointmentPayload } from '../my-appointments/page';
import { NO_STONES_AVAILABLE } from '@/constants/error-messages/compare-stone';
import { useLazyGetAvailableMyAppointmentSlotsQuery } from '@/features/api/my-appointments';
import { SELECT_STONE_TO_PERFORM_ACTION } from '@/constants/error-messages/confirm-stone';
import BookAppointment from '../my-appointments/components/book-appointment/book-appointment';
import CommonPoppup from '../login/component/common-poppup';

const MyCart = () => {
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;
  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const { errorState, errorSetState } = useErrorStateManagement();
  const { isError, errorText } = errorState;
  const { setErrorText, setIsError } = errorSetState;
  const { rows } = dataTableState;
  const { setRows } = dataTableSetState;
  const [activeTab, setActiveTab] = useState<string>(AVAILABLE_STATUS);
  const [isAddCommentDialogOpen, setIsAddCommentDialogOpen] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [downloadExcel] = useDownloadExcelMutation();
  const [cartItems, setCartItems] = useState<any>([]);
  const [isConfirmStone, setIsConfirmStone] = useState(false);
  const [confirmStoneData, setConfirmStoneData] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [validImages, setValidImages] = useState<any>([]);
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [detailImageData, setDetailImageData] = useState<any>({});

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
  const [lotIds, setLotIds] = useState<string[]>([]);

  const [diamondStatusCounts, setDiamondStatusCounts] = useState({
    Available: 0,
    Memo: 0,
    Hold: 0,
    Sold: 0,
    BidToBuy: 0
  });
  const [tiggerCart] = useLazyGetCartQuery();
  const subRoute = useSearchParams().get('path');
  // Mutation for deleting items from the cart
  const [deleteCart] = useDeleteCartMutation();
  const [confirmProduct] = useConfirmProductMutation();
  const router = useRouter();
  const [triggerColumn, { data: columnData }] =
    useLazyGetManageListingSequenceQuery<any>();

  useEffect(() => {
    if (subRoute?.length) {
      setActiveTab(subRoute);
    }
  }, []);
  useEffect(() => {
    isError &&
      setTimeout(() => {
        setIsError(false); // Hide the toast notification after some time
      }, 4000);
  }, [isError]);
  const processCartItems = ({
    cartItems,
    activeTab
  }: {
    cartItems: any;
    activeTab: string;
  }) => {
    const counts = {
      Available: 0,
      Memo: 0,
      Hold: 0,
      Sold: 0,
      BidToBuy: 0
    };

    const filteredRows = cartItems.filter((item: IProductItem) => {
      counts[item?.product?.diamond_status]++;
      if (activeTab === AVAILABLE_STATUS) {
        return (
          item?.product?.diamond_status === BID_TO_BUY_STATUS ||
          item?.product?.diamond_status === AVAILABLE_STATUS
        );
      } else {
        return item?.product?.diamond_status === activeTab;
      }
    });

    const mappedRows = filteredRows.map((row: any) => row?.product);
    setRows(mappedRows);
    return { filteredRows, counts };
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchMyAPI = async () => {
      await tiggerCart({})
        .then((response: any) => {
          const { filteredRows, counts } = processCartItems({
            cartItems: response.data.cart.items,
            activeTab
          });

          setCartItems(filteredRows);
          setDiamondStatusCounts(counts);
          setRowSelection({});
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
          error?.data?.message && setIsDialogOpen(true);
          error?.data?.message &&
            setDialogContent(
              <CommonPoppup
                content={''}
                customPoppupBodyStyle="mt-[70px]"
                header={error?.data?.message}
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => setIsDialogOpen(false),
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            );
        });
    };

    fetchMyAPI();
  }, [activeTab]);

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

        const updatedColumns = [...response.data, additionalColumn];
        dataTableSetState.setColumns(mapColumns(updatedColumns));
      }
    };

    fetchColumns();
  }, []);

  const myCartTabs = [
    {
      label: 'Active',
      status: AVAILABLE_STATUS,
      count: diamondStatusCounts.Available + diamondStatusCounts.BidToBuy
    },
    {
      label: 'Memo',
      status: MEMO_STATUS,
      count: diamondStatusCounts.Memo
    },
    {
      label: 'Hold',
      status: HOLD_STATUS,
      count: diamondStatusCounts.Hold
    },
    {
      label: 'Sold',
      status: SOLD_STATUS,
      count: diamondStatusCounts.Sold
    }
  ];

  const goBackToListView = () => {
    setIsConfirmStone(false);
    setIsDetailPage(false);
    setConfirmStoneData([]);
    setShowAppointmentForm(false);
    setAppointmentPayload({
      kam: { kam_name: '', image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });
  };

  const handleTabs = ({ tab }: { tab: string }) => {
    setErrorText('');
    setIsError(false);
    setActiveTab(tab);
  };

  const handleDelete = ({ selectedIds }: { selectedIds: string[] }) => {
    const deleteCartIds = selectedIds
      ?.map((id: string) => {
        const selectedRow: any =
          cartItems.find((row: IProductItem) => {
            return row?.product.id === id;
          }) ?? {};
        if (selectedRow) {
          return selectedRow?.id;
        }
        return '';
      })
      .filter(Boolean);

    setIsLoading(true);
    deleteCart({
      items: deleteCartIds
    })
      .unwrap()
      .then(res => {
        setIsLoading(false);
        const { filteredRows, counts } = processCartItems({
          cartItems: res.cart.items,
          activeTab
        });
        setIsDialogOpen(true);
        setDialogContent(
          <CommonPoppup
            content={''}
            status="success"
            customPoppupBodyStyle="mt-[70px]"
            header={`${deleteCartIds.length} ${
              deleteCartIds.length === 1 ? 'stone' : 'stones'
            } successfully deleted from “My Cart”`}
            actionButtonData={[
              {
                variant: 'primary',
                label: ManageLocales('app.modal.okay'),
                handler: () => setIsDialogOpen(false),
                customStyle: 'flex-1 w-full h-10'
              }
            ]}
          />
        );

        setCartItems(filteredRows);
        setDiamondStatusCounts(counts);
        setRowSelection({});
      })
      .catch(error => {
        setIsLoading(false);
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
                handler: () => setIsDialogOpen(false),
                customStyle: 'flex-1 w-full h-10'
              }
            ]}
          />
        );
      });
  };

  // Handle the actual deletion of stones
  const deleteCartHandler = () => {
    let selectedIds = Object.keys(rowSelection);
    if (selectedIds?.length) {
      setIsError(false);
      setDialogContent(
        <>
          {' '}
          <div className="absolute left-[-84px] top-[-84px]">
            <Image src={deleteIcon} alt="deleteIcon" />
          </div>
          <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
            <div>
              <h1 className="text-headingS text-neutral900">Are you sure?</h1>
              <p className="text-neutral600 text-mRegular">
                Do you want to delete the selected stones?
              </p>
            </div>
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.modal.no'),
                  handler: () => setIsDialogOpen(false),
                  customStyle: 'flex-1 h-10'
                },
                {
                  variant: 'primary',
                  label: ManageLocales('app.modal.yes'),
                  handler: () => {
                    handleDelete({ selectedIds });
                    setIsDialogOpen(false);
                  },
                  customStyle: 'flex-1 h-10'
                }
              ]}
            />
          </div>
        </>
      );
      setIsDialogOpen(true);
    } else {
      setIsError(true);
      setErrorText(NO_STONES_SELECTED);
    }
  };

  const rederAddCommentDialogs = () => {
    return (
      <>
        {' '}
        <div className="flex flex-col gap-[15px] p-[24px]">
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
          <div className="pt-[12px]">
            <textarea
              value={textAreaValue}
              name="textarea"
              rows={10}
              className="w-full bg-neutral0 text-neutral900 rounded-xl resize-none focus:outline-none p-2 border-neutral-200 border-[1px] mt-2"
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
      confirmProduct({
        variants: variantIds,
        comments: commentValue
      })
        .unwrap()
        .then(res => {
          if (res) {
            setCommentValue('');
            setIsDialogOpen(true);

            setRowSelection({});
            setDialogContent(
              <CommonPoppup
                content={''}
                status="success"
                customPoppupBodyStyle="mt-[70px]"
                header={`${variantIds.length} stones have been successfully added to "My Diamond"`}
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

            tiggerCart({}).then((response: any) => {
              const { filteredRows, counts } = processCartItems({
                cartItems: response.data.cart.items,
                activeTab
              });

              setCartItems(filteredRows);
              setDiamondStatusCounts(counts);
              setRowSelection({});
            });
          }
        })
        .catch(e => {
          setCommentValue('');

          if (e.data.type === 'unauthorized') {
            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content={
                  'To confirm a stone or make a purchase, KYC verification is mandatory. Without verification, access to certain features is restricted.'
                }
                customPoppupStyle="h-[260px]"
                customPoppupBodyStyle="!mt-[55px]"
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
                content={''}
                customPoppupBodyStyle="!mt-[70px]"
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

  const goBack = () => {
    setIsDetailPage(false);
    setDetailPageData({});
  };
  const images = [
    {
      name: getShapeDisplayName(detailImageData?.shape ?? ''),
      url: `${FILE_URLS.IMG.replace('***', detailImageData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'GIA Certificate',
      url: detailImageData?.certificate_url ?? '',
      category: 'Certificate'
    },

    {
      name: 'B2B',
      url: `${FILE_URLS.B2B.replace('***', detailImageData?.lot_id ?? '')}`,
      url_check: `${FILE_URLS.B2B_CHECK.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Video'
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
      category: 'B2B Sparkle'
    },

    {
      name: 'Heart',
      url: `${FILE_URLS.HEART.replace('***', detailImageData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'Arrow',
      url: `${FILE_URLS.ARROW.replace('***', detailImageData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'Aset',
      url: `${FILE_URLS.ASET.replace('***', detailImageData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'Ideal',
      url: `${FILE_URLS.IDEAL.replace('***', detailImageData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'Fluorescence',
      url: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    }
  ];

  const handleDetailPage = ({ row }: { row: any }) => {
    setIsDetailPage(true);
    setIsError(false);
    setErrorText('');
    setDetailPageData(row);
  };

  const handleDetailImage = ({ row }: any) => {
    setDetailImageData(row);
    setIsModalOpen(true);
  };

  const mapColumns = (columns: any) =>
    columns
      ?.filter(({ is_disabled }: any) => !is_disabled)
      ?.sort(({ sequence: a }: any, { sequence: b }: any) => a - b)
      .map(({ accessor, short_label, label }: any) => {
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          enableGlobalFilter: accessor === 'lot_id',
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

          case 'amount':
            return { ...commonProps, Cell: RenderAmount };
          case 'measurements':
            return { ...commonProps, Cell: RenderMeasurements };
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
          case 'shape_full':
            return { ...commonProps, Cell: RenderShape };
          case 'discount':
            return { ...commonProps, Cell: RenderDiscount };
          case 'details':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderDetails({ row, handleDetailImage });
              }
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

  const handleCreateAppointment = () => {
    let selectedIds = Object.keys(rowSelection);

    if (selectedIds.length > 0) {
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
    } else {
      setIsError(true);
      setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
    }
  };

  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);

  useEffect(() => {
    if (images.length > 0 && images[0].name.length)
      loadImages(images, setValidImages, checkImage);
  }, [detailImageData]);

  useEffect(() => {
    if (!validImages.length && images[0].name.length) {
      setValidImages([
        {
          name: 'No Data Found',
          url: ''
        }
      ]);
    }
  }, [validImages]);

  return (
    <div className="relative">
      {isLoading && <CustomKGKLoader />}
      {isError && (
        <Toast show={isError} message={errorText} isSuccess={false} />
      )}
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
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        dialogStyle={{ dialogContent: isConfirmStone ? 'h-[240px]' : '' }}
      />
      <AddCommentDialog
        isOpen={isAddCommentDialogOpen}
        onClose={() => setIsAddCommentDialogOpen(false)}
        renderContent={rederAddCommentDialogs}
      />

      <div className="flex  py-[8px] items-center ">
        <p className="text-lMedium font-medium text-neutral900">
          {showAppointmentForm
            ? ManageLocales('app.myAppointment.header')
            : isConfirmStone
            ? ''
            : isDetailPage
            ? ''
            : ManageLocales('app.myCart.mycart')}
        </p>
      </div>

      {isDetailPage && detailPageData?.length ? (
        <>
          <DiamondDetailsComponent
            data={dataTableState.rows}
            filterData={detailPageData}
            goBackToListView={goBack}
            handleDetailPage={handleDetailPage}
            breadCrumLabel={'My Cart'}
            modalSetState={modalSetState}
          />
          <div className="p-[8px] flex justify-end items-center border-t-[1px] border-l-[1px] border-neutral-200 gap-3 rounded-b-[8px] shadow-inputShadow ">
            <ActionButton
              actionButtonData={[
                {
                  variant: 'primary',
                  label: ManageLocales('app.searchResult.confirmStone'),
                  isHidden: isConfirmStone,
                  handler: () => {
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
                  width={43}
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
                },
                {
                  label: ManageLocales(
                    'app.search.actionButton.findMatchingPair'
                  ),
                  handler: () => {},
                  commingSoon: true
                }
              ]}
            />
          </div>
        </>
      ) : (
        <div
          className={`border-[1px] border-neutral200 rounded-[8px] ${
            showAppointmentForm && 'mb-[30px]'
          } ${
            isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
              ? showAppointmentForm
                ? 'h-[calc(100vh-113px)]'
                : isConfirmStone
                ? 'h-[calc(100vh-184px)]'
                : 'h-[calc(100vh-210px)]'
              : showAppointmentForm
              ? 'h-[calc(100vh-43px)]'
              : 'h-[calc(100vh-132px)]'
          }  shadow-inputShadow`}
        >
          {isConfirmStone ? (
            <>
              <ConfirmStone
                rows={confirmStoneData}
                columns={columnData}
                goBackToListView={goBackToListView}
                isFrom={'My Cart'}
                handleDetailImage={handleDetailImage}
                handleDetailPage={handleDetailPage}
                identifier={'myCart'}
              />
              {rows.length > 0 ? (
                <div className="flex gap-3 justify-end items-center px-4 py-2">
                  {isConfirmStone && (
                    <>
                      <ActionButton
                        actionButtonData={[
                          {
                            variant: 'secondary',
                            label: ManageLocales(
                              'app.confirmStone.footer.back'
                            ),
                            handler: () => {
                              goBackToListView();
                            }
                          },

                          {
                            variant: 'secondary',
                            label: ManageLocales(
                              'app.confirmStone.footer.addComment'
                            ),
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
                    </>
                  )}
                </div>
              ) : (
                <></>
              )}
            </>
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
            <>
              {' '}
              <div className="flex h-[72px] items-center border-b-[1px] border-neutral200">
                <div className="flex border-b border-neutral200 w-full ml-3 text-mMedium font-medium">
                  {myCartTabs.map(({ label, status, count }) => {
                    return (
                      <button
                        className={`px-[16px] py-[8px] ${
                          activeTab === status
                            ? 'text-neutral900 border-b-[2px] border-primaryMain'
                            : 'text-neutral600'
                        }`}
                        key={label}
                        onClick={() => handleTabs({ tab: status })}
                      >
                        {label} {count > 0 && `(${count})`}
                      </button>
                    );
                  })}
                </div>
              </div>
              {!rows.length && !isLoading ? (
                <EmptyScreen
                  label={ManageLocales(
                    'app.emptyCart.actionButton.searchDiamonds'
                  )}
                  contentReactNode={
                    <p className="text-neutral900  w-[17%] text-center">
                      No diamonds in your cart yet. Let’s change that!
                    </p>
                  }
                  onClickHandler={() =>
                    router.push(`/v2/search?active-tab=${SubRoutes.NEW_SEARCH}`)
                  }
                  imageSrc={empty}
                />
              ) : (
                dataTableState.columns.length > 0 && (
                  <DataTable
                    rows={rows}
                    columns={dataTableState.columns}
                    setRowSelection={setRowSelection}
                    rowSelection={rowSelection}
                    showCalculatedField={activeTab !== SOLD_STATUS}
                    modalSetState={modalSetState}
                    downloadExcel={downloadExcel}
                    myCart={true}
                    setIsError={setIsError}
                    setErrorText={setErrorText}
                    setIsLoading={setIsLoading}
                    deleteCartHandler={deleteCartHandler}
                    activeCartTab={activeTab}
                    setIsConfirmStone={setIsConfirmStone}
                    setConfirmStoneData={setConfirmStoneData}
                    handleCreateAppointment={handleCreateAppointment}
                  />
                )
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCart;

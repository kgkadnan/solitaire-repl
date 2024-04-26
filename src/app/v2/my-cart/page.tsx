'use client';
import DataTable from '@/components/v2/common/data-table';
import { useDataTableStateManagement } from '@/components/v2/common/data-table/hooks/data-table-state-management';
import {
  AVAILABLE_STATUS,
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
import React, { useEffect, useMemo, useState } from 'react';
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
import confirmIcon from '@public/v2/assets/icons/modal/confirm.svg';
import errorIcon from '@public/v2/assets/icons/modal/error.svg';

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
import errorSvg from '@public/v2/assets/icons/modal/error.svg';
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

  const [diamondStatusCounts, setDiamondStatusCounts] = useState({
    Available: 0,
    Memo: 0,
    Hold: 0,
    Sold: 0
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
      Sold: 0
    };

    const filteredRows = cartItems.filter((item: IProductItem) => {
      counts[item?.product?.diamond_status]++;
      return item?.product?.diamond_status === activeTab;
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
          setIsDialogOpen(true);
          setDialogContent(
            <>
              <div className="absolute left-[-84px] top-[-84px]">
                <Image src={errorIcon} alt="errorIcon" />
              </div>
              <h1 className="text-headingS text-neutral900">
                {error?.data?.message}
              </h1>
              <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                <ActionButton
                  actionButtonData={[
                    {
                      variant: 'primary',
                      label: ManageLocales('app.modal.okay'),
                      handler: () => setIsDialogOpen(false),
                      customStyle: 'flex-1 w-full h-10'
                    }
                  ]}
                />
              </div>
            </>
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
      count: diamondStatusCounts.Available
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
    setIsDetailPage(true);
    setConfirmStoneData([]);
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
    // selectedIds.map((id: string) => {
    //   const selectedRow = cartItems.find(
    //     (row: IProductItem) => row.product.id === id
    //   );
    //   return selectedRow?.id;
    // });
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
          <>
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={confirmIcon} alt="confirmIcon" />
            </div>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
              <h1 className="text-headingS text-neutral900">
                {deleteCartIds.length}{' '}
                {`${deleteCartIds.length === 1 ? 'stone' : 'stones'} `}{' '}
                successfully deleted from “My Cart”
              </h1>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => setIsDialogOpen(false),
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            </div>
          </>
        );
        setCartItems(filteredRows);
        setDiamondStatusCounts(counts);
        setRowSelection({});
      })
      .catch(error => {
        setIsLoading(false);
        setIsDialogOpen(true);
        setDialogContent(
          <>
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={errorIcon} alt="errorIcon" />
            </div>
            <h1 className="text-headingS text-neutral900">
              {error?.data?.message}
            </h1>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => setIsDialogOpen(false),
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            </div>
          </>
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
              // placeholder='Write Description'
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
              <>
                {' '}
                <div className="absolute left-[-84px] top-[-84px]">
                  <Image src={confirmIcon} alt="confirmIcon" />
                </div>
                <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                  <h1 className="text-headingS text-neutral900">
                    {variantIds.length} stones have been successfully added to
                    &quot;My Diamond&quot;
                  </h1>
                  <ActionButton
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
                </div>
              </>
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
              <>
                <div className="absolute left-[-84px] top-[-84px]">
                  <Image src={errorSvg} alt="errorSvg" />
                </div>
                <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                  <div>
                    <h1 className="text-headingS text-neutral900">
                      Important KYC Verification Required!
                    </h1>
                    <p className="text-neutral600 text-mRegular">
                      To confirm a stone or make a purchase, KYC verification is
                      mandatory. Without verification, access to certain
                      features is restricted.
                    </p>
                  </div>
                  <ActionButton
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
                </div>
              </>
            );
          } else {
            setIsDialogOpen(true);
            setDialogContent(
              <>
                {' '}
                <div className="absolute left-[-84px] top-[-84px]">
                  <Image src={errorSvg} alt="errorSvg" />
                </div>
                <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                  <p className="text-headingS text-neutral900 font-medium">
                    {e?.data?.message}
                  </p>
                  <ActionButton
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
                </div>
              </>
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
      url: `${FILE_URLS.IMG.replace('***', detailImageData?.lot_id ?? '')}`
    },
    {
      name: 'GIA Certificate',
      url: detailImageData?.certificate_url ?? '',
      showDivider: true
    },
    {
      name: 'B2B',
      url: `${FILE_URLS.B2B.replace('***', detailImageData?.lot_id ?? '')}`
    },
    {
      name: 'B2B Sparkle',
      url: `${FILE_URLS.B2B_SPARKLE.replace(
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
          enableSorting: accessor !== 'shape',
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

  // const memoizedColumns = useMemo(
  //   () => mapColumns(dataTableState.columns),
  //   [dataTableState.columns]
  // );

  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);

  useEffect(() => {
    loadImages(images, setValidImages, checkImage);
  }, [detailImageData]);

  return (
    <div className="relative">
      {isLoading && <CustomKGKLoader />}
      {isError && (
        <Toast show={isError} message={errorText} isSuccess={false} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        selectedImageIndex={0}
        images={validImages}
        setIsLoading={setIsLoading}
        fromDetailPage={true}
      />
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        dialogStyle={{ dialogContent: isConfirmStone ? 'h-[240px]' : '' }}
      />
      <AddCommentDialog
        isOpen={isAddCommentDialogOpen}
        onClose={() => setIsAddCommentDialogOpen(false)}
        renderContent={rederAddCommentDialogs}
      />
      {(isConfirmStone || !isDetailPage) && (
        <div className="flex  py-[8px] items-center ">
          <p className="text-lMedium font-medium text-neutral900">
            {ManageLocales('app.myCart.mycart')}
          </p>
        </div>
      )}
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
          <div className="p-[16px] flex justify-end items-center border-t-[1px] border-l-[1px] border-neutral-200 gap-3 rounded-b-[8px] shadow-inputShadow ">
            {/* {isError && (
              <div>
                <span className="hidden  text-successMain" />
                <span
                  className={`text-mRegular font-medium text-dangerMain pl-[8px]`}
                >
                  {errorText}
                </span>
              </div>
            )} */}
            <ActionButton
              actionButtonData={[
                {
                  variant: 'primary',
                  label: ManageLocales('app.searchResult.confirmStone'),
                  isHidden: isConfirmStone,
                  handler: () => {
                    // setIsDetailPage(false);
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
                  handler: () => {}
                },
                {
                  label: ManageLocales(
                    'app.search.actionButton.findMatchingPair'
                  ),
                  handler: () => {}
                }
              ]}
              isDisable={true}
            />
          </div>
        </>
      ) : (
        <div
          className={`border-[1px] border-neutral200 rounded-[8px] ${
            isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
              ? 'h-[calc(100vh-200px)]'
              : 'h-[calc(100vh-132px)]'
          }  shadow-inputShadow`}
        >
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

          {isConfirmStone ? (
            <ConfirmStone
              rows={confirmStoneData}
              columns={columnData}
              goBackToListView={goBackToListView}
              isFrom={'My Cart'}
              handleDetailImage={handleDetailImage}
              handleDetailPage={handleDetailPage}
              identifier={'cart'}
            />
          ) : (
            <>
              {!rows.length && !isLoading ? (
                <EmptyScreen
                  label={ManageLocales(
                    'app.emptyCart.actionButton.searchDiamonds'
                  )}
                  message="No diamonds in your cart yet. Let’s change that!"
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
                  />
                )
              )}
            </>
          )}

          {rows.length > 0 ? (
            <div className="flex gap-3 justify-end items-center px-4 py-2">
              {isConfirmStone && (
                <>
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
        </div>
      )}
    </div>
  );
};

export default MyCart;

'use client';
import { IManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
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
import { IProductItem } from '@/app/my-cart/interface/interface';
import ActionButton from '@/components/v2/common/action-button';
import EmptyScreen from '@/components/v2/common/empty-screen';
import empty from '@public/v2/assets/icons/data-table/empty-cart.svg';
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
  RenderDetails,
  RenderDiscount,
  RenderLab,
  RenderMeasurements,
  RenderShape,
  RenderTracerId
} from '@/components/v2/common/data-table/helpers/render-cell';
import Loader from '@/components/v2/common/loader';
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
import { IProduct } from '@/app/search/result/result-interface';
import ConfirmStone from '../search/result/components';
import { AddCommentDialog } from '@/components/v2/common/comment-dialog';
import { handleComment } from '../search/result/helpers/handle-comment';
import { useRouter } from 'next/navigation';
import errorSvg from '@public/v2/assets/icons/modal/error.svg';
import { useConfirmProductMutation } from '@/features/api/product';
import { Dropdown } from '@/components/v2/common/dropdown-menu';

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

  const [diamondStatusCounts, setDiamondStatusCounts] = useState({
    Available: 0,
    Memo: 0,
    Hold: 0,
    Sold: 0
  });
  const [tiggerCart, { isLoading }] = useLazyGetCartQuery();
  // Mutation for deleting items from the cart
  const [deleteCart] = useDeleteCartMutation();
  const [confirmProduct] = useConfirmProductMutation();
  const router = useRouter();
  const [triggerColumn, { data: columnData }] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();

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
        })
        .catch(error => {
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
              tooltipContentStyles={'z-[4]'}
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
          case 'carat':
            return { ...commonProps, Cell: RenderCarat };
          case 'shape_full':
            return { ...commonProps, Cell: RenderShape };
          case 'discount':
            return { ...commonProps, Cell: RenderDiscount };
          case 'details':
            return { ...commonProps, Cell: RenderDetails };
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
        dataTableSetState.setColumns(updatedColumns);
      }
    };

    fetchColumns();
  }, []);

  const memoizedColumns = useMemo(
    () => mapColumns(dataTableState.columns),
    [dataTableState.columns]
  );

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
    setConfirmStoneData([]);
  };

  const handleTabs = ({ tab }: { tab: string }) => {
    setActiveTab(tab);
  };

  const handleDelete = ({ selectedIds }: { selectedIds: string[] }) => {
    const deleteCartIds = selectedIds.map((id: string) => {
      const selectedRow = cartItems.find(
        (row: IProductItem) => row.product.id === id
      );
      return selectedRow?.id;
    });

    deleteCart({
      items: deleteCartIds
    })
      .unwrap()
      .then(res => {
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
                Item successfully deleted from “My Cart”
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
                  handler: () => handleDelete({ selectedIds }),
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
                    “My Diamond
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

          setIsDialogOpen(true);
          setDialogContent(
            <>
              {' '}
              <div className="absolute left-[-84px] top-[-84px]">
                <Image src={errorSvg} alt="errorSvg" />
              </div>
              <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                <p className="text-neutral600 text-mRegular font-sans">
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
        });
    }
  };

  return (
    <div className="relative">
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <AddCommentDialog
        isOpen={isAddCommentDialogOpen}
        onClose={() => setIsAddCommentDialogOpen(false)}
        renderContent={rederAddCommentDialogs}
      />
      <div className="flex h-[81px] items-center ">
        <p className="text-headingM font-medium text-neutral900">
          {ManageLocales('app.myCart.mycart')}
        </p>
      </div>
      <div className="border-[1px] border-neutral200 rounded-[8px] h-[calc(100vh-185px)] shadow-inputShadow">
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

        {isLoading ? (
          <Loader />
        ) : isConfirmStone ? (
          <ConfirmStone
            rows={confirmStoneData}
            columns={columnData}
            goBackToListView={goBackToListView}
            isFromMyCart={true}
          />
        ) : rows.length && memoizedColumns.length ? (
          <div>
            <DataTable
              rows={rows}
              columns={memoizedColumns}
              setRowSelection={setRowSelection}
              rowSelection={rowSelection}
              showCalculatedField={activeTab !== SOLD_STATUS}
              modalSetState={modalSetState}
              downloadExcel={downloadExcel}
              myCart={true}
              setIsError={setIsError}
              setErrorText={setErrorText}
            />
          </div>
        ) : (
          <EmptyScreen
            label={ManageLocales('app.emptyCart.actionButton.searchDiamonds')}
            message="No diamonds in your cart yet. Let’s change that!"
            onClickHandler={() => {}}
            imageSrc={empty}
          />
        )}

        {rows.length > 0 ? (
          <div className="flex gap-3 justify-end items-center p-[16px]  ">
            {isConfirmStone ? (
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
            ) : (
              <>
                {' '}
                {isError && (
                  <div>
                    <span className="hidden  text-successMain" />
                    <span
                      className={`text-mRegular font-medium text-dangerMain pl-[8px]`}
                    >
                      {errorText}
                    </span>
                  </div>
                )}
                <ActionButton
                  actionButtonData={[
                    {
                      variant: 'secondary',
                      label: ManageLocales('app.myCart.actionButton.delete'),
                      handler: deleteCartHandler
                    },
                    // {
                    //   variant: 'secondary',
                    //   label: ManageLocales(
                    //     'app.myCart.actionButton.bookAppointment'
                    //   ),
                    //   handler: () => {},
                    //   isHidden: activeTab !== AVAILABLE_STATUS
                    // },
                    {
                      variant: 'primary',
                      label: ManageLocales(
                        'app.myCart.actionButton.confirmStone'
                      ),
                      handler: () => {
                        handleConfirmStone({
                          selectedRows: rowSelection,
                          rows: dataTableState.rows,
                          setIsError,
                          setErrorText,
                          setIsConfirmStone,
                          setConfirmStoneData
                        });
                      },
                      isHidden: activeTab !== AVAILABLE_STATUS
                    }
                    // {
                    //   variant: 'secondary',
                    //   label: ManageLocales('app.myCart.actionButton.compareStone'),
                    //   handler: () => {},
                    //   isHidden:
                    //     activeTab !== HOLD_STATUS && activeTab !== MEMO_STATUS
                    // }
                    // {
                    //   variant: 'primary',
                    //   label: ManageLocales(
                    //     'app.myCart.actionButton.viewSimilarStone'
                    //   ),
                    //   handler: () => {},
                    //   isHidden: activeTab === AVAILABLE_STATUS
                    // }
                  ]}
                />
                <Dropdown
                  dropdownTrigger={
                    <Image
                      src={threeDotsSvg}
                      alt="threeDotsSvg"
                      width={40}
                      height={40}
                    />
                  }
                  dropdownMenu={[
                    {
                      label: ManageLocales(
                        'app.myCart.actionButton.compareStone'
                      ),
                      handler: () => {},
                      isHidden: activeTab === SOLD_STATUS
                    },
                    {
                      label: ManageLocales(
                        'app.myCart.actionButton.findMatchingPair'
                      ),
                      handler: () => {},
                      isHidden: activeTab !== AVAILABLE_STATUS
                    },
                    {
                      label: ManageLocales(
                        'app.myCart.actionButton.bookAppointment'
                      ),
                      handler: () => {},
                      isHidden: activeTab !== AVAILABLE_STATUS
                    },
                    {
                      label: ManageLocales(
                        'app.myCart.actionButton.viewSimilarStone'
                      ),
                      handler: () => {},
                      isHidden: activeTab === AVAILABLE_STATUS
                    }
                  ]}
                  isDisable={true}
                />
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MyCart;

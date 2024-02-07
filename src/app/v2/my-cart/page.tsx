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
import {
  RednderLocation,
  RenderCarat,
  RenderDetails,
  RenderDiscount,
  RenderLab
} from '@/components/v2/common/data-table/helpers/render-cell';
import Loader from '@/components/v2/common/loader';
import {
  clarity,
  fluorescenceSortOrder,
  sideBlackSortOrder,
  tableBlackSortOrder,
  tableInclusionSortOrder
} from '@/constants/v2/form';

const MyCart = () => {
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;
  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const { rows } = dataTableState;
  const { setRows } = dataTableSetState;
  const [activeTab, setActiveTab] = useState<string>(AVAILABLE_STATUS);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [cartItems, setCartItems] = useState<any>([]);
  const [diamondStatusCounts, setDiamondStatusCounts] = useState({
    Available: 0,
    Memo: 0,
    Hold: 0,
    Sold: 0
  });
  const [tiggerCart, { isLoading }] = useLazyGetCartQuery({});
  // Mutation for deleting items from the cart
  const [deleteCart] = useDeleteCartMutation();

  const [triggerColumn] =
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

    return { filteredRows, mappedRows, counts };
  };

  useEffect(() => {
    const fetchMyAPI = async () => {
      try {
        const cartResponse = await tiggerCart({});
        if (cartResponse.data.cart.items.length) {
          const { filteredRows, mappedRows, counts } = processCartItems({
            cartItems: cartResponse.data.cart.items,
            activeTab
          });

          setCartItems(filteredRows);
          setDiamondStatusCounts(counts);
          setRowSelection({});
          setRows(mappedRows);
        }
      } catch (error: any) {
        setIsDialogOpen(true);
        setDialogContent(
          <>
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={errorIcon} alt="errorIcon" />
            </div>
            <h1 className="text-headingS text-neutral900">
              {error.data.message}
            </h1>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[350px]">
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => setIsDialogOpen(false),
                    customStyle: 'flex-1 w-full'
                  }
                ]}
              />
            </div>
          </>
        );
      }
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

          case 'carat':
            return { ...commonProps, Cell: RenderCarat };
          case 'discount':
            return { ...commonProps, Cell: RenderDiscount };
          case 'details':
            return { ...commonProps, Cell: RenderDetails };
          case 'lab':
            return { ...commonProps, Cell: RenderLab };
          case 'location':
            return { ...commonProps, Cell: RednderLocation };

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
      if (response.data) {
        dataTableSetState.setColumns(response.data);
        dataTableSetState.setColumns((prev: any) => [
          ...prev,
          {
            accessor: 'shape_full',
            id: 'cus_ma-lis-seq_01HHM4RTY66QR24P4RCXHF53XB',
            is_disabled: false,
            is_fixed: false,
            label: 'Shape',
            sequence: -1,
            short_label: 'Shape'
          }
        ]);
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
        const { filteredRows, mappedRows, counts } = processCartItems({
          cartItems: res.cart.items,
          activeTab
        });
        setIsDialogOpen(true);
        setDialogContent(
          <>
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={confirmIcon} alt="confirmIcon" />
            </div>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[350px]">
              <h1 className="text-headingS text-neutral900">
                Item successfully deleted from “My Cart”
              </h1>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => setIsDialogOpen(false),
                    customStyle: 'flex-1 w-full'
                  }
                ]}
              />
            </div>
          </>
        );
        setCartItems(filteredRows);
        setDiamondStatusCounts(counts);
        setRowSelection({});
        setRows(mappedRows);
      })
      .catch(error => {
        setIsDialogOpen(true);
        setDialogContent(
          <>
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={errorIcon} alt="errorIcon" />
            </div>
            <h1 className="text-headingS text-neutral900">
              {error.data.message}
            </h1>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[350px]">
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => setIsDialogOpen(false),
                    customStyle: 'flex-1 w-full'
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
      setDialogContent(
        <>
          {' '}
          <div className="absolute left-[-84px] top-[-84px]">
            <Image src={deleteIcon} alt="deleteIcon" />
          </div>
          <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[350px]">
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
                  customStyle: 'flex-1'
                },
                {
                  variant: 'primary',
                  label: ManageLocales('app.modal.yes'),
                  handler: () => handleDelete({ selectedIds }),
                  customStyle: 'flex-1'
                }
              ]}
            />
          </div>
        </>
      );
      setIsDialogOpen(true);
    }
  };

  return (
    <div className="relative">
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div className="flex h-[81px] items-center ">
        <p className="text-headingM font-medium text-neutral900">
          {ManageLocales('app.myCart.mycart')}
        </p>
      </div>
      <div className="border-[1px] border-neutral200 rounded-top-[8px] h-[calc(100vh-150px)] shadow-inputShadow">
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
                  {label}({count})
                </button>
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : rows.length ? (
          <div>
            <div className="border-b-[1px] border-t-[1px] border-neutral200">
              <DataTable
                rows={rows}
                columns={memoizedColumns}
                setRowSelection={setRowSelection}
                rowSelection={rowSelection}
                hideCalculatedField={activeTab !== SOLD_STATUS}
              />
            </div>
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
          <div className="p-[16px] border-[1px] border-t-0 border-b-0 border-neutral200 shadow-inputShadow ">
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.myCart.actionButton.delete'),
                  handler: deleteCartHandler
                },
                {
                  variant: 'secondary',
                  label: ManageLocales(
                    'app.myCart.actionButton.bookAppointment'
                  ),
                  handler: () => {},
                  isHidden: activeTab !== AVAILABLE_STATUS
                },
                {
                  variant: 'primary',
                  label: ManageLocales('app.myCart.actionButton.confirmStone'),
                  handler: () => {},
                  isHidden: activeTab !== AVAILABLE_STATUS
                },
                {
                  variant: 'secondary',
                  label: ManageLocales('app.myCart.actionButton.compareStone'),
                  handler: () => {},
                  isHidden:
                    activeTab !== HOLD_STATUS && activeTab !== MEMO_STATUS
                },
                {
                  variant: 'primary',
                  label: ManageLocales(
                    'app.myCart.actionButton.viewSimilarStone'
                  ),
                  handler: () => {},
                  isHidden: activeTab === AVAILABLE_STATUS
                }
              ]}
            />{' '}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MyCart;

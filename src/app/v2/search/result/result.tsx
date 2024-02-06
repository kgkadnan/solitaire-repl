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
import confirmIcon from '@public/v2/assets/icons/modal/confirm.svg';

import { constructUrlParams } from '@/utils/v2/construct-url-params';
import { useRouter, useSearchParams } from 'next/navigation';
import { ManageLocales } from '@/utils/v2/translate';
import ActionButton from '@/components/v2/common/action-button';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import CalculatedField from '@/components/v2/common/calculated-field';
import Tooltip from '@/components/v2/common/tooltip';
import Breadcrum from '@/components/v2/common/search-breadcrum/breadcrum';
import {
  RenderCarat,
  RenderDiscount,
  RenderDetails,
  RenderLab,
  RenderLotId,
  RednderLocation
} from '@/components/v2/common/data-table/helpers/render-cell';
import BinIcon from '@public/v2/assets/icons/bin.svg';
import NewSearchIcon from '@public/v2/assets/icons/new-search.svg';
import { useLazyGetAllProductQuery } from '@/features/api/product';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { MRT_RowSelectionState } from 'material-react-table';
import { IManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
// import { NOT_MORE_THAN_100 } from '@/constants/error-messages/search';
// import { NO_STONES_SELECTED } from '@/constants/error-messages/cart';
import { IProduct } from '@/app/search/result/result-interface';
// import { NO_STONES_AVAILABLE } from '@/constants/error-messages/compare-stone';
// import { SOME_STONES_ARE_ON_HOLD_MODIFY_SEARCH } from '@/constants/error-messages/confirm-stone';
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

// Column mapper outside the component to avoid re-creation on each render
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
        case 'lot_id':
          return { ...commonProps, Cell: RenderLotId };
        default:
          return {
            ...commonProps,
            Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
              <span>{renderedCellValue ?? '-'}</span>
            )
          };
      }
    });
const Result = ({
  activeTab,
  searchParameters,
  setActiveTab,
  handleCloseAllTabs,
  handleCloseSpecificTab
}: {
  activeTab: number;
  searchParameters: any;
  setActiveTab: Dispatch<SetStateAction<number>>;
  handleCloseAllTabs: () => void;
  handleCloseSpecificTab: (id: number) => void;
}) => {
  const dispatch = useAppDispatch();
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;
  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  // UseMutation to add items to the cart
  const [addCart] = useAddCartMutation();

  const editRoute = useSearchParams().get('edit');
  const router = useRouter();

  // const { saveSearchName } = commonState;
  let [triggerProductApi] = useLazyGetAllProductQuery();

  const [triggerColumn] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      const storedSelection = localStorage.getItem('Search');

      if (!storedSelection) return;

      if (activeTab <= 0) return;

      const selections = JSON.parse(storedSelection);

      const url = constructUrlParams(selections[activeTab - 1]?.queryParams);

      const response = await triggerProductApi({
        offset: 0,
        limit: LISTING_PAGE_DATA_LIMIT,
        url
      });
      if (response?.data?.products?.length) {
        dataTableSetState.setRows(response.data.products);
      }
    };

    fetchProducts();
  }, [activeTab]);

  // Fetch Columns
  useEffect(() => {
    const fetchColumns = async () => {
      const response = await triggerColumn({});
      if (response.data) {
        dataTableSetState.setColumns(response.data);
      }
    };

    fetchColumns();
  }, []);

  const memoizedColumns = useMemo(
    () => mapColumns(dataTableState.columns),
    [dataTableState.columns]
  );

  const handleNewSearch = () => {
    router.push(`${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`);
  };

  const handleAddToCart = () => {
    let selectedIds = Object.keys(rowSelection);
    if (selectedIds.length > 100) {
      // setIsError(true);
      // setErrorText(NOT_MORE_THAN_100);
    } else if (!selectedIds.length) {
      // setIsError(true);
      // setErrorText(NO_STONES_SELECTED);
    } else {
      const hasMemoOut = selectedIds.some((id: string) => {
        return dataTableState.rows.some(
          (row: IProduct) => row.id === id && row.diamond_status === MEMO_STATUS
        );
      });

      const hasHold = selectedIds.some((id: string) => {
        return dataTableState.rows.some(
          (row: IProduct) => row.id === id && row.diamond_status === HOLD_STATUS
        );
      });

      if (hasMemoOut) {
        // setErrorText(NO_STONES_AVAILABLE);
        // setIsError(true);
      } else if (hasHold) {
        // setIsError(true);
        // setErrorText(SOME_STONES_ARE_ON_HOLD_MODIFY_SEARCH);
      } else {
        // Extract variant IDs for selected stones
        const variantIds = selectedIds?.map((id: string) => {
          const myCartCheck: IProduct | object =
            dataTableState.rows.find((row: IProduct) => {
              return row?.id === id;
            }) ?? {};

          if (myCartCheck && 'variants' in myCartCheck) {
            return myCartCheck.variants[0]?.id;
          }

          return null;
        });

        // If there are variant IDs, add to the cart
        if (variantIds.length) {
          addCart({
            variants: variantIds
          })
            .unwrap()
            .then((res: any) => {
              setIsDialogOpen(true);
              setDialogContent(
                <>
                  <div className="absolute left-[-84px] top-[-84px]">
                    <Image src={confirmIcon} alt="confirmIcon" />
                  </div>
                  <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[350px]">
                    <h1 className="text-headingS text-neutral900">
                      {res?.message}
                    </h1>
                    <ActionButton
                      actionButtonData={[
                        {
                          variant: 'primary',
                          label: ManageLocales('app.modal.continue'),
                          handler: () => setIsDialogOpen(false),
                          customStyle: 'flex-1 w-full'
                        },
                        {
                          variant: 'primary',
                          label: 'Go to "My Cart"',
                          handler: () => {
                            router.push('/v2/my-cart');
                          },
                          customStyle: 'flex-1 w-full'
                        }
                      ]}
                    />
                  </div>
                </>
              );
              // On success, show confirmation dialog and update badge
              // setIsError(false);
              // setErrorText('');

              dispatch(notificationBadge(true));

              // refetchRow();
            })
            .catch(() => {
              // On error, set error state and error message
              // setIsError(true);
              // setErrorText(error?.data?.message);
            });
          // Clear the selected checkboxes
          // setIsCheck([]);
          // setIsCheckAll && setIsCheckAll(false);
        }
      }
    }
  };

  return (
    <div>
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div className="flex h-[81px] items-center">
        <p className="text-headingM font-medium text-neutral900">
          {editRoute
            ? ManageLocales('app.result.headerEdit')
            : ManageLocales('app.result.headerResult')}
        </p>
      </div>
      <div className="border-[1px] border-neutral200 rounded-[8px] h-[calc(100vh-180px)] shadow-inputShadow">
        <div className=" min-h-[72px] items-center justify-between border-b-[1px] border-neutral200 flex p-[16px]">
          <div className="flex lg-w-[calc(100%-400px)] gap-[12px] flex-wrap">
            <Breadcrum
              searchParameters={searchParameters}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleCloseSpecificTab={handleCloseSpecificTab}
            />
          </div>
          <div className="pr-[2px] flex gap-[12px]  justify-end flex-wrap">
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.search.saveSearch'),
                  handler: handleNewSearch
                },
                {
                  variant: 'secondary',
                  svg: NewSearchIcon,
                  label: ManageLocales('app.search.newSearch'),
                  handler: handleNewSearch
                },
                {
                  variant: 'secondary',
                  svg: BinIcon,
                  handler: handleCloseAllTabs
                }
              ]}
            />
          </div>
        </div>
        <div>
          <CalculatedField
            rows={dataTableState.rows}
            selectedProducts={rowSelection}
          />
        </div>
        <div className="border-b-[1px] border-t-[1px] border-neutral200">
          <DataTable
            rows={dataTableState.rows}
            columns={memoizedColumns}
            setRowSelection={setRowSelection}
            rowSelection={rowSelection}
          />
        </div>
        <div className="p-[16px] border-[1px] border-t-0 border-neutral200 rounded-b-[8px] shadow-inputShadow ">
          {dataTableState.rows.length > 0 ? (
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <div className="px-[4px] py-[6px] border-[1px] border-lengendInCardBorder rounded-[4px] bg-legendInCartFill text-legendInCart">
                  In Cart
                </div>
                <div className="px-[4px] py-[6px] border-[1px] border-lengendHoldBorder rounded-[4px] bg-legendHoldFill text-legendHold">
                  Hold
                </div>
                <div className="px-[4px] py-[6px] border-[1px] border-lengendMemoBorder rounded-[4px] bg-legendMemoFill text-legendMemo">
                  Memo
                </div>
              </div>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.searchResult.addToCart'),
                    handler: handleAddToCart
                  },

                  {
                    variant: 'primary',
                    label: ManageLocales('app.searchResult.confirmStone'),
                    handler: () => {}
                  }
                ]}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default Result;

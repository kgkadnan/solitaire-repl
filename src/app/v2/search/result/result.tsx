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

      const selections = JSON.parse(storedSelection);

      //   // Always fetch data, even on initial load
      const url = constructUrlParams(selections[activeTab]?.queryParams);
      // const url = constructUrlParams(queryParams);
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
            .then(() => {
              // On success, show confirmation dialog and update badge
              // setIsError(false);
              // setErrorText('');
              // setIsPersistDialogOpen(true);
              // setPersistDialogContent(
              //   <div className="text-center  flex flex-col justify-center items-center ">
              //     <div className="w-[350px] flex justify-center items-center mb-3">
              //       <Image src={confirmImage} alt="vector image" />
              //     </div>
              //     <div className="w-[350px]  text-center text-solitaireTertiary pb-3">
              //       {res?.message}
              //     </div>
              //     <Link
              //       href={'/my-cart?active-tab=active'}
              //       className={` p-[6px] w-[150px] bg-solitaireQuaternary text-[#fff] text-[14px] rounded-[5px]`}
              //     >
              //       Go To &quot;MyCart&quot;
              //     </Link>
              //   </div>
              // );
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
      <div className="flex h-[81px] items-center">
        <p className="text-headingM font-medium text-neutral900">
          {editRoute
            ? ManageLocales('app.result.headerEdit')
            : ManageLocales('app.result.headerResult')}
        </p>
      </div>
      <div className="border-[1px] border-neutral200 rounded-[8px] h-[calc(100vh-160px)] shadow-inputShadow">
        <div className=" min-h-[72px] items-center justify-between border-b-[1px] border-neutral200 grid grid-cols-3 p-[16px]">
          <div className="flex col-span-2 gap-[12px] flex-wrap">
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
        <div className="p-[16px] ">
          {dataTableState.rows.length > 0 ? (
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default Result;

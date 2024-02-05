import React, { useEffect, useMemo, useState, useCallback, SetStateAction, Dispatch } from 'react';
import DataTable from '@/components/v2/common/data-table';
import { useDataTableStateManagement } from '@/components/v2/common/data-table/hooks/data-table-state-management';
import { LISTING_PAGE_DATA_LIMIT } from '@/constants/business-logic';

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
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();
  const { rows, columns } = dataTableState;
  const { setRows, setColumns } = dataTableSetState;
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const editRoute = useSearchParams().get('edit');
  const router = useRouter();

  // const { saveSearchName } = commonState;
  let [triggerProductApi] = useLazyGetAllProductQuery();

  const [triggerColumn] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();
  useEffect(() => {
    const fetchMyAPI = async () => {
      const yourSelection = localStorage.getItem('Search');

      if (yourSelection) {
        const parseYourSelection = JSON.parse(yourSelection);

        // Always fetch data, even on initial load
        const url = constructUrlParams(parseYourSelection[0]?.queryParams);
        triggerProductApi({
          offset: 0,
          limit: LISTING_PAGE_DATA_LIMIT,
          url: url
        }).then(res => {
          if (res?.data?.products?.length) {
            setRows(res?.data?.products);
          }
        });
      }
    }
    fetchMyAPI()
  });
  

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      const storedSelection = localStorage.getItem('Search');

      if (!storedSelection) return;

      const selections = JSON.parse(storedSelection);

      console.log('activeTab', activeTab);

      //   // Always fetch data, even on initial load
      const url = constructUrlParams(selections[0]?.queryParams);
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
  const handleNewSearch = useCallback(() => {
    router.push(`${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`);
  }, [router]);

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
       
      </div>
    </div>
  );
};
export default Result;

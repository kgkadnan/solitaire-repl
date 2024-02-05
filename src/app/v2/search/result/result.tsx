import DataTable from '@/components/v2/common/data-table';
import { useDataTableStateManagement } from '@/components/v2/common/data-table/hooks/data-table-state-management';
import React, { useEffect, useState } from 'react';
import { LISTING_PAGE_DATA_LIMIT } from '@/constants/business-logic';
import { useLazyGetAllProductQuery } from '@/features/api/product';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
import { IManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { MRT_RowSelectionState } from 'material-react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import { ManageLocales } from '@/utils/v2/translate';
import Bin from '@public/v2/assets/icons/bin.svg';
import Add from '@public/v2/assets/icons/add.svg';

import ActionButton from '@/components/v2/common/action-button';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import CalculatedField from '@/components/v2/common/calculated-field';

import Tooltip from '@/components/v2/common/tooltip';
import Pill from '@/components/v2/common/search-breadcrum/pill';
import {
  RednderLocation,
  RenderCarat,
  RenderDetails,
  RenderDiscount,
  RenderLab,
  RenderLotId
} from '@/components/v2/common/data-table/helpers/render-cell';

interface ITableColumn {
  accessorKey: any;
  header: any;
  Header: any;
  enableGlobalFilter: boolean;
  Cell?: React.ComponentType<any>; // Define the Cell property
  accessorFn?: any;
  id?: any;
  enableSorting: any;
  minSize?: number;
  maxSize?: number;
  size?: number;
  // Add other properties as needed
}

const Result = () => {
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();
  const { rows, columns } = dataTableState;
  const { setRows, setColumns } = dataTableSetState;
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const editRoute = useSearchParams().get('edit');
  const router = useRouter();

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
    };
    fetchMyAPI();
  }, []);

  const mapColumns = (columns: any) => {
    return columns
      ?.filter((column: any) => !column.is_disabled)
      ?.sort((a: any, b: any) => a.sequence - b.sequence)
      .map((col: any) => {
        let columnDefinition: ITableColumn = {
          accessorKey: col.accessor,
          header: col.short_label,
          enableGlobalFilter: false,
          enableSorting: true,
          minSize: 5, //min size enforced during resizing
          maxSize: 200, //max size enforced during resizing
          size: 5, //medium column,
          Cell: ({ renderedCellValue }: any) => (
            <span>{renderedCellValue ?? `-`}</span>
          ),

          Header: ({ column }: any) => (
            <>
              <Tooltip
                tooltipTrigger={<span>{column.columnDef.header}</span>}
                tooltipContent={col.label}
                tooltipContentStyles={'z-[4]'}
              />
            </>
          ) //arrow function
          // Add other properties as needed
        };

        if (col.accessor === 'carat') {
          columnDefinition.Cell = RenderCarat;
        }

        if (col.accessor === 'shape') {
          columnDefinition.enableSorting = false;
        }

        if (col.accessor === 'discount') {
          columnDefinition.Cell = RenderDiscount;
        }

        // Check if the column accessor is 'lot_id'
        if (col.accessor === 'lot_id') {
          columnDefinition.enableGlobalFilter = true;
          columnDefinition.Cell = RenderLotId;
        }

        if (col.accessor === 'details') {
          columnDefinition.Cell = RenderDetails;
        }
        if (col.accessor === 'amount') {
          columnDefinition.id = 'amount';
          columnDefinition.accessorFn = (row: any) =>
            row.variants[0].prices[0].amount;
        }

        if (col.accessor === 'lab') {
          columnDefinition.Cell = RenderLab;
        }

        // Check if the column accessor is 'some_column'
        if (col.accessor === 'location') {
          // Map the Cell property for 'some_column'
          columnDefinition.Cell = RednderLocation;
        }

        // Add more conditions for other columns as needed

        return columnDefinition;
      });
  };

  useEffect(() => {
    triggerColumn({}).then(res => {
      setColumns(mapColumns(res.data));
    });
  }, []);

  const handleNewSearch = () => {
    router.push(`${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`);
  };
  return (
    <div>
      <div className="flex h-[81px] items-center ">
        <p className="text-headingM font-medium text-neutral900">
          {editRoute
            ? ManageLocales('app.result.headerEdit')
            : ManageLocales('app.result.headerResult')}
        </p>
      </div>
      <div className="border-[1px] border-neutral200 rounded-[8px] h-[calc(100vh-160px)] shadow-inputShadow">
        <div className="flex h-[72px] items-center justify-between border-b-[1px] border-neutral200">
          <Pill
            isActive={true}
            label={'Result'}
            handlePillClick={() => {}}
            handlePillEdit={() => {}}
            handlePillDelete={() => {}}
          />{' '}
          <Pill
            isActive={false}
            label={'wwwwwwwwwwwwwwwwwwwwwwwww'}
            handlePillClick={() => {}}
            handlePillEdit={() => {}}
            handlePillDelete={() => {}}
          />
          <div className="pr-[2px] flex gap-[12px]">
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  svg: Add,
                  label: ManageLocales('app.search.newSearch'),
                  handler: handleNewSearch
                },
                {
                  variant: 'secondary',
                  svg: Bin,
                  handler: handleNewSearch
                }
              ]}
            />
          </div>
        </div>
        <div>
          <CalculatedField rows={rows} selectedProducts={rowSelection} />
        </div>
        <div className="border-b-[1px] border-t-[1px] border-neutral200">
          <DataTable
            rows={rows}
            columns={columns}
            setRowSelection={setRowSelection}
            rowSelection={rowSelection}
          />
        </div>
      </div>
    </div>
  );
};

export default Result;

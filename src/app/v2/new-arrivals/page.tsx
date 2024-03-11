'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Tab from './components/tabs';
import Timer from './components/timer';
import NewArrivalDataTable from './components/data-table';
import { useDataTableStateManagement } from '@/components/v2/common/data-table/hooks/data-table-state-management';
import {
  RenderCarat,
  RenderDiscount,
  RenderDetails,
  RenderLab,
  RenderLotId,
  RednderLocation,
  RenderAmount,
  RenderShape,
  RenderMeasurements,
  RenderTracerId
} from '@/components/v2/common/data-table/helpers/render-cell';
import Tooltip from '@/components/v2/common/tooltip';
import { MRT_RowSelectionState } from 'material-react-table';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { LISTING_PAGE_DATA_LIMIT } from '@/constants/business-logic';
import { useLazyGetAllProductQuery } from '@/features/api/product';
import Test from './features/test';
import { IManageListingSequenceResponse } from '../search/interface';

const NewArrivals = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabLabels = ['Bid Stone (100)', 'Active Bid (3)', 'Bid History (3)'];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const mapColumns = (columns: any) =>
    columns
      ?.filter(({ is_disabled }: any) => !is_disabled)
      // ?.sort(({ sequence: a }: any, { sequence: b }: any) => a - b)
      .map(({ accessor, short_label, label }: any) => {
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          enableGlobalFilter: accessor === 'lot_id',
          enableGrouping: accessor === 'shape',
          enableSorting: accessor !== 'shape_full' && accessor !== 'details',
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
          case 'amount':
            return { ...commonProps, Cell: RenderAmount };
          case 'measurements':
            return { ...commonProps, Cell: RenderMeasurements };
          case 'shape_full':
            return { ...commonProps, Cell: RenderShape };
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
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const { dataTableState, dataTableSetState } = useDataTableStateManagement();
  const memoizedColumns = useMemo(
    () => mapColumns(dataTableState.columns),
    [dataTableState.columns]
  );
  const { modalState, modalSetState } = useModalStateManagement();
  const { errorState, errorSetState } = useErrorStateManagement();

  const { setIsError, setErrorText, setInputError } = errorSetState;
  const [downloadExcel] = useDownloadExcelMutation();
  const [triggerColumn, { data: columnData }] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();
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
  const [triggerProductApi] = useLazyGetAllProductQuery();

  const fetchProducts = async () => {
    triggerProductApi({
      url: 'shape[]=RAD',
      limit: LISTING_PAGE_DATA_LIMIT,
      offset: 0
    }).then(res => {
      dataTableSetState.setRows(res.data.products);
      setRowSelection({});
      setErrorText('');
      // setData(res.data);
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [activeTab]);
  return (
    <div className="mb-[20px] relative">
      <div className="flex h-[81px] items-center justify-between">
        <p className="text-headingM font-medium text-neutral900">
          New Arrivals
        </p>
        <Timer initialHours={1} initialMinutes={40} initialSeconds={10} />
      </div>
      <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow">
        <div className="w-[450px]">
          <Tab
            labels={tabLabels}
            activeIndex={activeTab}
            onTabClick={handleTabClick}
          />
        </div>
        <div className="border-b-[1px] border-neutral200">
          <NewArrivalDataTable
            rows={dataTableState.rows}
            columns={memoizedColumns}
            setRowSelection={setRowSelection}
            rowSelection={rowSelection}
            modalSetState={modalSetState}
            setErrorText={setErrorText}
            downloadExcel={downloadExcel}
            setIsError={setIsError}
          />
        </div>
        <Test />
      </div>
    </div>
  );
};
export default NewArrivals;

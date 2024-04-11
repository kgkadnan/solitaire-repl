import {
  RenderMeasurements,
  RenderTracerId
} from '@/components/v2/common/data-table/helpers/render-cell';
import Tooltip from '@/components/v2/common/tooltip';
import Table from '@/components/v2/table';
import {
  RednderLocation,
  RenderAmount,
  RenderCarat,
  RenderCartLotId,
  RenderDetails,
  RenderDiscount,
  RenderLab
} from '@/components/v2/table/helpers/render-cell';

import React, { useEffect, useMemo, useState } from 'react';

const ConfirmStone = ({
  rows,
  columns,
  goBackToListView,
  activeTab,
  isFrom,
  handleDetailImage,
  handleDetailPage,
  identifier
}: any) => {
  const [rowSelection, setRowSelection] = useState({});

  const [breadCrumLabel, setBreadCrumLabel] = useState('');

  useEffect(() => {
    if (isFrom === 'My Cart') {
      setBreadCrumLabel('My Cart');
    }
    if (isFrom.length) {
      setBreadCrumLabel(isFrom);
    } else {
      const storedSelection = localStorage.getItem('Search');

      if (!storedSelection) return;

      if (activeTab <= 0) return;

      const selections = JSON.parse(storedSelection);

      const isExcist = selections[activeTab - 1]?.saveSearchName;

      if (isExcist?.length > 0) {
        setBreadCrumLabel(isExcist);
      } else {
        setBreadCrumLabel(`Result ${activeTab}`);
      }
    }
  }, []);

  const mapColumns = (columns: any) =>
    columns
      ?.filter(({ is_disabled }: any) => !is_disabled)
      ?.sort(({ sequence: a }: any, { sequence: b }: any) => a - b)
      .map(({ accessor, short_label, label }: any) => {
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          enableGlobalFilter: accessor === 'lot_id',
          minSize: 5,
          maxSize: accessor === 'details' ? 100 : 200,
          size: accessor === 'measurements' ? 183 : 5,
          Header: ({ column }: any) => (
            <Tooltip
              tooltipTrigger={<span>{column.columnDef.header}</span>}
              tooltipContent={label}
              tooltipContentStyles={'z-[1000]'}
            />
          )
        };

        switch (accessor) {
          case 'amount':
            return { ...commonProps, Cell: RenderAmount };
          case 'carat':
            return { ...commonProps, Cell: RenderCarat };
          case 'measurements':
            return { ...commonProps, Cell: RenderMeasurements };
          case 'discount':
            return { ...commonProps, Cell: RenderDiscount };
          case 'details':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderDetails({ row, handleDetailImage });
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
          case 'price_per_carat':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
                <span>{`${
                  renderedCellValue === 0
                    ? '0.00'
                    : renderedCellValue?.toFixed(2) ?? '0.00'
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
  const memoizedColumns = useMemo(() => mapColumns(columns), [columns]);

  return (
    <>
      {memoizedColumns?.length > 0 && rows?.length > 0 && (
        <Table
          rows={rows}
          columns={memoizedColumns}
          isRowSelectionNeeded={false}
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
          isEnableTopToolBar={true}
          showGloablFilter={true}
          goBackToListView={() => {
            goBackToListView(isFrom);
          }}
          breadCrumLabel={breadCrumLabel}
          identifier={identifier}
        />
      )}
    </>
  );
};

export default ConfirmStone;

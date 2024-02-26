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
  RenderDetails,
  RenderDiscount,
  RenderLab
} from '@/components/v2/table/helpers/render-cell';

import React, { useEffect, useMemo, useState } from 'react';

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
        case 'carat':
          return { ...commonProps, Cell: RenderCarat };
        case 'measurements':
          return { ...commonProps, Cell: RenderMeasurements };
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

const ConfirmStone = ({ rows, columns, goBackToListView, activeTab }: any) => {
  const [rowSelection, setRowSelection] = useState({});
  const memoizedColumns = useMemo(() => mapColumns(columns), [columns]);
  const [breadCrumLabel, setBreadCrumLabel] = useState('');

  useEffect(() => {
    const storedSelection = localStorage.getItem('Search');

    if (!storedSelection) return;

    if (activeTab <= 0) return;

    const selections = JSON.parse(storedSelection);

    const isExcist = selections[activeTab - 1]?.saveSearchName;

    if (isExcist.length > 0) {
      setBreadCrumLabel(isExcist);
    } else {
      setBreadCrumLabel(`Result ${activeTab}`);
    }
  }, []);

  return (
    <div className="">
      {memoizedColumns?.length > 0 && rows?.length > 0 && (
        <Table
          rows={rows}
          columns={memoizedColumns}
          isRowSelectionNeeded={false}
          setRowSelection={setRowSelection}
          rowSelection={rowSelection}
          isEnableTopToolBar={true}
          showGloablFilter={true}
          goBackToListView={goBackToListView}
          breadCrumLabel={breadCrumLabel}
        />
      )}
    </div>
  );
};

export default ConfirmStone;

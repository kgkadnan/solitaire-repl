import {
  RenderMeasurements,
  RenderNumericFields,
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
import { Tracking_Search_By_Text } from '@/constants/funnel-tracking';
import { formatNumberWithCommas } from '@/utils/format-number-with-comma';
import { trackEvent } from '@/utils/ga';

import React, { useEffect, useMemo, useState } from 'react';

const ConfirmStone = ({
  rows,
  columns,
  goBackToListView,
  activeTab,
  isFrom,
  handleDetailImage,
  handleDetailPage,
  identifier,
  isMatchingPair,
  customerMobileNumber
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
      const storedSelection = isMatchingPair
        ? localStorage.getItem('MatchingPair')
        : localStorage.getItem('Search');

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

  useEffect(() => {
    if (identifier === 'Dashboard') {
      trackEvent({
        action: Tracking_Search_By_Text.confirm_page_pageview,
        category: 'SearchByText',
        mobile_number: customerMobileNumber
      });
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
          case 'rap':
          case 'rap_value':
            return { ...commonProps, Cell: RenderNumericFields };
          case 'carats':
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
          case 'price_per_carat':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
                <span>{`${
                  renderedCellValue === null || renderedCellValue === undefined
                    ? '-'
                    : `$${formatNumberWithCommas(renderedCellValue)}`
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
            if (identifier === 'Dashboard') {
              trackEvent({
                action: Tracking_Search_By_Text.click_back_confirm_page,
                category: 'SearchByText',
                mobile_number: customerMobileNumber
              });
            }
            goBackToListView(isFrom);
          }}
          breadCrumLabel={breadCrumLabel}
          identifier={identifier}
          isMatchingPair={isMatchingPair}
        />
      )}
    </>
  );
};

export default ConfirmStone;

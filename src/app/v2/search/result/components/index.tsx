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
import {
  faSort,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';
import { Tracking_Search_By_Text } from '@/constants/funnel-tracking';
import { formatNumberWithCommas } from '@/utils/format-number-with-comma';
import { trackEvent } from '@/utils/ga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MRT_SortingState } from 'material-react-table';

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
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  console.log('rows', rows);

  const [breadCrumLabel, setBreadCrumLabel] = useState('');

  useEffect(() => {
    if (isFrom === 'My Cart') {
      setBreadCrumLabel('My Cart');
    }
    if (isFrom?.length) {
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
        const currentSort = sorting.find(sort => sort.id === accessor);
        const nonSortableAccessors = ['shape_full', 'details', 'fire_icon'];

        // Check if sorting should be disabled for the column's accessor
        const isSortable = !nonSortableAccessors.includes(accessor);
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          enableGlobalFilter: accessor === 'lot_id',
          minSize: 0,
          maxSize: 0,
          size: 0,
          Header: ({ column }: any) => (
            <div className="flex items-center group">
              <Tooltip
                tooltipTrigger={<span>{column.columnDef.header}</span>}
                tooltipContent={label}
                tooltipContentStyles={'z-[1000]'}
              />
              {isSortable &&
                (currentSort ? (
                  <FontAwesomeIcon
                    icon={currentSort.desc ? faSortDown : faSortUp}
                    width={8}
                    height={8}
                    style={{ marginLeft: '2px' }} // Optional styling for spacing
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faSort} // Default icon when not sorted
                    width={8}
                    height={8}
                    className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" // Show on hover
                    style={{ marginLeft: '2px' }}
                  />
                ))}
            </div>
          )
        };

        switch (accessor) {
          case 'amount':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderAmount({
                  row
                });
              }
            };
          case 'rap':
          case 'rap_value':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue, row }: any) => {
                return RenderNumericFields({
                  renderedCellValue,
                  row
                });
              }
            };
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
  const memoizedColumns = useMemo(
    () => mapColumns(columns),
    [columns, sorting]
  );

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
          setSorting={setSorting}
          sorting={sorting}
          breadCrumLabel={breadCrumLabel}
          identifier={identifier}
          isMatchingPair={isMatchingPair}
        />
      )}
    </>
  );
};

export default ConfirmStone;

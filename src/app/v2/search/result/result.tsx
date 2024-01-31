import DataTable from '@/components/v2/common/data-table';
import { useDataTableStateManagement } from '@/components/v2/common/data-table/hooks/data-table-state-management';
import React, { useEffect, useState } from 'react';
import {
  GIA_LINK,
  HOLD_STATUS,
  LISTING_PAGE_DATA_LIMIT,
  MEMO_STATUS
} from '@/constants/business-logic';
import { useLazyGetAllProductQuery } from '@/features/api/product';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
import { IManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { MRT_RowSelectionState } from 'material-react-table';
import Link from 'next/link';
import Image from 'next/image';
import Ind from '@public/v2/assets/png/data-table/IND.png';
import Usa from '@public/v2/assets/png/data-table/USA.png';
import Media from '@public/v2/assets/icons/data-table/Media.svg';
import Tooltip from '@/components/v2/common/tooltip';

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

  // const columnHelper = createMRTColumnHelper<any>();

  const RednderLocation = ({ renderedCellValue }: any) => {
    let imageSrc;

    switch (renderedCellValue) {
      case 'IND':
        imageSrc = Ind;
        break;
      case 'USA':
        imageSrc = Usa;
        break;
      default:
        return null; // or any other fallback JSX
    }

    return <Image src={imageSrc} alt={renderedCellValue} />;
  };
  const RenderLotId = ({ renderedCellValue, row }: any) => {
    console.log('row', row.original.diamond_status);

    let statusClass = '';
    let borderClass = '';

    if (row.original.diamond_status === MEMO_STATUS) {
      statusClass = 'bg-legendMemoFill';
      borderClass = 'border-lengendMemoBorder';
    } else if (row.original.diamond_status === HOLD_STATUS) {
      statusClass = 'bg-legendHoldFill';
      borderClass = 'border-lengendHoldBorder';
    } else if (row.original.in_cart?.length) {
      statusClass = 'bg-legendInCartFill';
      borderClass = 'border-lengendInCardBorder';
    } else {
      statusClass = 'bg-lneutral0';
      borderClass = 'border-neutral0';
    }

    return (
      <span
        className={`rounded-[4px] ${statusClass} border-[1px] px-[8px] py-[3px] ${borderClass}`}
      >
        {renderedCellValue}
      </span>
    );
  };
  const RenderLab = ({ renderedCellValue, row }: any) => {
    return (
      <>
        {' '}
        {row.original.lab === 'GIA' ? (
          <Link href={`${GIA_LINK}${row.rpt_number}`} target="_blank">
            {renderedCellValue}
          </Link>
        ) : (
          <span>{renderedCellValue}</span>
        )}
      </>
    );
  };

  const RenderDetails = () => {
    return <Image src={Media} alt="Media" />;
  };

  const RenderDiscount = ({ renderedCellValue }: any) => {
    return (
      <div
        className={`text-successMain border-[1px] border-successBorder bg-successSurface px-[8px] py-[2px] w-full rounded-[4px]`}
      >
        {`${renderedCellValue.toFixed(2)}%`}
      </div>
    );
  };

  const mapColumns = (columns: any) => {
    return columns.map((col: any) => {
      let columnDefinition: ITableColumn = {
        accessorKey: col.accessor,
        header: col.short_label,
        enableGlobalFilter: false,
        enableSorting: true,
        minSize: 5, //min size enforced during resizing
        maxSize: 200, //max size enforced during resizing
        size: 5, //medium column,

        Header: ({ column }: any) => (
          <Tooltip
            tooltipTrigger={<span>{column.columnDef.header}</span>}
            tooltipContent={col.label}
            tooltipContentStyles={'z-[4]'}
          />
        ) //arrow function
        // Add other properties as needed
      };

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

  return (
    <DataTable
      rows={rows}
      columns={columns}
      setRowSelection={setRowSelection}
      rowSelection={rowSelection}
    />
  );
};

export default Result;

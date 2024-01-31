'use client';
import { IManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import CalculatedField from '@/components/v2/common/calculated-field';
import DataTable from '@/components/v2/common/data-table';
import { useDataTableStateManagement } from '@/components/v2/common/data-table/hooks/data-table-state-management';
import {
  AVAILABLE_STATUS,
  GIA_LINK,
  HOLD_STATUS,
  MEMO_STATUS,
  SOLD_STATUS
} from '@/constants/business-logic';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { ManageLocales } from '@/utils/v2/translate';
import { MRT_RowSelectionState } from 'material-react-table';
import Link from 'next/link';
import Image from 'next/image';
import Ind from '@public/v2/assets/png/data-table/IND.png';
import Usa from '@public/v2/assets/png/data-table/USA.png';
import Media from '@public/v2/assets/icons/data-table/Media.svg';
import Tooltip from '@/components/v2/common/tooltip';

import React, { useEffect, useState } from 'react';
import { useLazyGetCartQuery } from '@/features/api/cart';
import { IProductItem } from '@/app/my-cart/interface/interface';
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
const MyCart = () => {
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();
  const { rows, columns } = dataTableState;
  const { setRows, setColumns } = dataTableSetState;
  const [activeTab, setActiveTab] = useState<string>(AVAILABLE_STATUS);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const [tiggerCart] = useLazyGetCartQuery({});

  const [triggerColumn] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();

  useEffect(() => {
    const fetchMyAPI = async () => {
      tiggerCart({}).then(res => {
        if (res.data.cart.items.length) {
          let cartData = res.data.cart.items;
          const rowData = cartData
            ?.filter(
              (item: IProductItem) =>
                item?.product?.diamond_status === activeTab
            )
            .map((row: IProductItem) => row?.product);
          setRows(rowData);
        }
      });
    };
    fetchMyAPI();
  }, [activeTab, setActiveTab]);

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

  const myCartTabs = [
    {
      label: 'Active',
      status: AVAILABLE_STATUS
    },
    {
      label: 'Memo',
      status: MEMO_STATUS
    },
    {
      label: 'Hold',
      status: HOLD_STATUS
    },
    {
      label: 'Sold',
      status: SOLD_STATUS
    }
  ];

  const handleTabs = ({ tab }: { tab: string }) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex h-[81px] items-center ">
        <p className="text-headingM font-medium text-neutral900">
          {ManageLocales('app.myCart.mycart')}
        </p>
      </div>
      <div className="border-[1px] border-neutral200 rounded-[8px] h-[calc(100vh-160px)] shadow-inputShadow">
        <div className="flex h-[72px] items-center border-b-[1px] border-neutral200">
          <div className="flex border-b border-neutral200 w-full ml-3 text-mMedium font-medium">
            {myCartTabs.map(({ label, status }) => {
              return (
                <button
                  className={`px-[16px] py-[8px] ${
                    activeTab === status
                      ? 'text-neutral900 border-b-[2px] border-primaryMain'
                      : 'text-neutral600'
                  }`}
                  key={label}
                  onClick={() => handleTabs({ tab: status })}
                >
                  {label}
                </button>
              );
            })}
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

export default MyCart;

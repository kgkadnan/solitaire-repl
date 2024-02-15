import { IManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import Tooltip from '@/components/v2/common/tooltip';
import Table from '@/components/v2/table';
import {
  RenderAmount,
  RednderLocation,
  RenderCarat,
  RenderDetails,
  RenderDiscount,
  RenderLab
} from '@/components/v2/table/helpers/render-cell';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { formatCreatedAt } from '@/utils/format-date';
import { formatNumberWithLeadingZeros } from '@/utils/format-number-withLeadingZeros';
import { ManageLocales } from '@/utils/v2/translate';
import React, { useEffect, useMemo, useState } from 'react';

interface IOrderDetail {
  productDetailData: any;
  goBackToListView: () => void;
}

const mapColumns = (columns: any) =>
  columns
    ?.filter(({ is_disabled }: any) => !is_disabled)
    ?.sort(({ sequence: a }: any, { sequence: b }: any) => a - b)
    .map(({ accessor, short_label, label }: any) => {
      const commonProps = {
        accessorKey: accessor,
        header: short_label,
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
        case 'discount':
          return { ...commonProps, Cell: RenderDiscount };
        case 'details':
          return { ...commonProps, Cell: RenderDetails };
        case 'lab':
          return { ...commonProps, Cell: RenderLab };
        case 'location':
          return { ...commonProps, Cell: RednderLocation };

        default:
          return {
            ...commonProps,
            Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
              <span>{renderedCellValue ?? '-'}</span>
            )
          };
      }
    });

const OrderDetail: React.FC<IOrderDetail> = ({
  goBackToListView,
  productDetailData
}) => {
  const [triggerColumn] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();

  const [rowSelection, setRowSelection] = useState({});
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  console.log('productDetailData', productDetailData.created_at);
  useEffect(() => {
    setRows(productDetailData?.items?.map((items: any) => items.product) || []);
  }, [productDetailData]);

  // Fetch Columns
  useEffect(() => {
    const fetchColumns = async () => {
      const response = await triggerColumn({});
      if (response.data) {
        setColumns(response.data);
      }
    };

    fetchColumns();
  }, []);

  const memoizedColumns = useMemo(() => mapColumns(columns), [columns]);

  return (
    <div>
      {' '}
      {productDetailData && Object.keys(productDetailData).length > 0 && (
        <div
          onClick={() => {
            goBackToListView;
          }}
        >
          <div className="">
            <div className="flex gap-[10px]">
              {' '}
              <p className="text-neutral600 text-mMedium font-regular">
                {ManageLocales('app.yourOrder.description.dataAndTime')}:{' '}
              </p>
              <span className="text-neutral900 text-mRegular font-medium">
                {' '}
                {formatCreatedAt(productDetailData?.created_at)}
              </span>
            </div>
            <div className="bg-neutral25 flex ">
              <div className="bg-neutral0 border-[1px] border-solid border-neutral200 rounded-[8px] shadow-popupsShadow">
                <div className="flex flex-col p-[16px]">
                  <p className="text-neutral600 text-mRegular font-regular">
                    {ManageLocales('app.yourOrder.description.invoiceNumber')}
                  </p>
                  <span className="text-neutral900 text-mMedium font-medium">
                    {formatNumberWithLeadingZeros(
                      productDetailData?.display_id
                    )}
                  </span>
                </div>
              </div>
              <div className="bg-neutral0 border-[1px] border-solid border-neutral200 rounded-[8px] shadow-popupsShadow">
                <div className="flex flex-col p-[16px]">
                  <p className="text-neutral600 text-mRegular font-regular">
                    {ManageLocales('app.yourOrder.description.invoiceNumber')}
                  </p>
                  <span className="text-neutral900 text-mMedium font-medium">
                    {formatNumberWithLeadingZeros(
                      productDetailData?.display_id
                    )}
                  </span>
                </div>
              </div>
              <div className="bg-neutral0 border-[1px] border-solid border-neutral200 rounded-[8px] shadow-popupsShadow">
                <div className="flex flex-col p-[16px]">
                  <p className="text-neutral600 text-mRegular font-regular">
                    {ManageLocales('app.yourOrder.description.invoiceNumber')}
                  </p>
                  <span className="text-neutral900 text-mMedium font-medium">
                    {formatNumberWithLeadingZeros(
                      productDetailData?.display_id
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Table
            rows={rows}
            columns={memoizedColumns}
            setRowSelection={setRowSelection}
            rowSelection={rowSelection}
          />
        </div>
      )}
    </div>
  );
};

export default OrderDetail;

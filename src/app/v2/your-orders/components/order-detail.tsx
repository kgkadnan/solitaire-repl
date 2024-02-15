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
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import Image from 'next/image';
import {
  INVOICE_HISTORY_BREADCRUMB_LABEL,
  PENING_INVOICE_BREADCRUMB_LABEL
} from '@/constants/business-logic';
import Link from 'next/link';
import ActionButton from '@/components/v2/common/action-button';

interface IOrderDetail {
  productDetailData: any;
  goBackToListView: () => void;
  breadCrumLabel: string;
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
  productDetailData,
  breadCrumLabel
}) => {
  const [triggerColumn] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();

  const [rowSelection, setRowSelection] = useState({});
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

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
        <div>
          <div className="bg-neutral0  border-b-[1px] border-solid border-neutral200">
            <div className="flex items-center p-[16px]">
              <Image
                src={backWardArrow}
                alt="backWardArrow"
                onClick={() => {
                  goBackToListView();
                }}
                className="cursor-pointer"
              />
              <div className="flex gap-[8px] items-center">
                <button
                  className="text-neutral600 text-sMedium font-regular cursor-pointer"
                  onClick={() => {
                    goBackToListView();
                  }}
                >
                  {breadCrumLabel}
                </button>
                <span className="text-neutral600">/</span>
                <p className="text-neutral700 p-[8px] bg-neutral100 rounded-[4px] text-sMedium font-medium">
                  {breadCrumLabel === PENING_INVOICE_BREADCRUMB_LABEL
                    ? formatNumberWithLeadingZeros(
                        productDetailData?.display_id
                      )
                    : productDetailData?.invoice_id}
                </p>
              </div>
            </div>
          </div>
          <div className="flex p-[16px] pr-[35px] gap-[35px]">
            <div className="">
              <div className="pl-[16px] flex justify-between">
                <div className="flex gap-[10px] ">
                  {' '}
                  <p className="text-neutral600 text-mMedium font-regular">
                    {ManageLocales('app.yourOrder.description.dataAndTime')}:{' '}
                  </p>
                  <span className="text-neutral900 text-mRegular font-medium">
                    {' '}
                    {formatCreatedAt(productDetailData?.created_at)}
                  </span>
                </div>
                {breadCrumLabel !== PENING_INVOICE_BREADCRUMB_LABEL && (
                  <div>
                    {' '}
                    <Link
                      href={productDetailData?.delivery?.link}
                      target="_blank"
                      className="text-infoMain cursor-pointer"
                    >
                      Track order
                    </Link>
                  </div>
                )}
              </div>
              <div className="bg-neutral25 flex gap-[8px] py-[8px]">
                <div className="bg-neutral0 border-[1px] border-solid border-neutral200 rounded-[8px] shadow-popupsShadow">
                  <div className="flex flex-col p-[16px]">
                    <p className="text-neutral600 text-mRegular font-regular">
                      {ManageLocales('app.yourOrder.description.invoiceNumber')}
                    </p>
                    <span className="text-neutral900 text-mMedium font-medium">
                      {breadCrumLabel === PENING_INVOICE_BREADCRUMB_LABEL
                        ? formatNumberWithLeadingZeros(
                            productDetailData?.display_id
                          )
                        : productDetailData?.invoice_id}
                    </span>
                  </div>
                </div>
                <div className="bg-neutral0 border-[1px] border-solid border-neutral200 rounded-[8px] shadow-popupsShadow">
                  <div className="flex flex-col p-[16px]">
                    <p className="text-neutral600 text-mRegular font-regular">
                      {ManageLocales('app.yourOrder.description.noOfStones')}
                    </p>
                    <span className="text-neutral900 text-mMedium font-medium">
                      {productDetailData?.items?.length}
                    </span>
                  </div>
                </div>
                <div className="bg-neutral0 border-[1px] border-solid border-neutral200 rounded-[8px] shadow-popupsShadow">
                  <div className="flex flex-col p-[16px]">
                    <p className="text-neutral600 text-mRegular font-regular">
                      {breadCrumLabel === INVOICE_HISTORY_BREADCRUMB_LABEL
                        ? ManageLocales('app.yourOrder.description.paidAmount')
                        : ManageLocales(
                            'app.yourOrder.description.payableAmount'
                          )}
                    </p>
                    <span className="text-neutral900 text-mMedium font-medium">
                      {`${productDetailData?.total} $`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {breadCrumLabel === PENING_INVOICE_BREADCRUMB_LABEL && (
              <div className="flex flex-col ">
                <p className="text-neutral600 text-mRegular font-regular">
                  {ManageLocales('app.yourOrder.description.comments')}
                </p>
                <span className="text-neutral900 text-mRegular font-medium pt-[13px]">
                  {productDetailData?.comments?.length
                    ? productDetailData?.comments
                    : '-'}
                </span>
              </div>
            )}
          </div>
          <Table
            rows={rows}
            columns={memoizedColumns}
            setRowSelection={setRowSelection}
            rowSelection={rowSelection}
          />
          <div className="p-[16px]">
            <ActionButton
              actionButtonData={
                breadCrumLabel === PENING_INVOICE_BREADCRUMB_LABEL
                  ? [
                      {
                        variant: 'secondary',
                        label: ManageLocales(
                          'app.yourOrder.description.donwloadExcel'
                        ),
                        handler: () => {}
                      }
                    ]
                  : [
                      {
                        variant: 'secondary',
                        label: ManageLocales(
                          'app.yourOrder.description.donwloadExcel'
                        ),
                        handler: () => {}
                      },

                      {
                        variant: 'primary',
                        label: ManageLocales(
                          'app.yourOrder.description.downloadInvoice'
                        ),
                        handler: () => {}
                      }
                    ]
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;

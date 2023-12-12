import { ManageLocales } from '@/utils/translate';
import React from 'react';
import {
  MyDiamondsSheetContentProps,
  PageTitles
} from '../../interface/my-diamonds-interface';
import { formatNumberWithLeadingZeros } from '@/utils/format-number-withLeadingZeros';

import { formatCreatedAt } from '@/utils/format-date';
import CustomDataTable from '@/components/common/data-table';
import { NoDataFound } from '@/components/common/no-data-found';
import styles from './my-diamonds.module.scss';
import { CustomFooter } from '@/components/common/footer';
import Link from 'next/link';

export const MyDiamondsSheetContent: React.FC<MyDiamondsSheetContentProps> = ({
  check,
  productPageDetail,
  rows,
  tableColumns,
  checkboxData,
  errorSetState,
  isError,
  errorText,
  downloadExcelFunction
}) => {
  // Data for footer buttons
  const myDiamondsFooter = [
    {
      id: 1,
      displayButtonLabel: 'Download Excel',
      style: styles.transparent,
      fn: downloadExcelFunction
    },
    { id: 2, displayButtonLabel: 'Download Invoice', style: styles.filled }
  ];

  // Function to render footer buttons
  const renderFooterButtons = () => (
    <CustomFooter
      footerButtonData={
        check === 'recent-confirmation'
          ? [myDiamondsFooter[0]]
          : myDiamondsFooter
      }
      noBorderTop={styles.paginationContainerStyle}
    />
  );

  // Page titles Data
  const pageTitles: PageTitles = {
    'recent-confirmation':
      'app.myDiamonds.RecentConfirmations.recentConfirmationDetail',
    'my-invoices': 'app.myDiamonds.myInvoice.myInvoiceDetail',
    'previous-confirmations':
      'app.myDiamonds.PreviousConfirmations.PreviousConfirmationDetails'
  };

  // Function to render page title
  const renderPageTitle = (currentPage: string | undefined) => {
    const pageTitle = currentPage ? pageTitles[currentPage] : null;
    return pageTitle ? <p>{ManageLocales(pageTitle)}</p> : null;
  };
  return (
    <>
      <div className="border-b border-solitaireSenary h-[80px] flex items-center mb-5">
        {renderPageTitle(check)}
      </div>

      <div className="flex border-b border-solitaireSenary h-[180px] mb-3">
        <div className="w-[50%]">
          <div className="flex mb-1">
            <p className="w-[25%]">
              {check === 'recent-confirmation'
                ? 'Order ID : '
                : 'Invoice Number : '}
            </p>
            <span className="text-solitaireTertiary">
              {check === 'recent-confirmation'
                ? formatNumberWithLeadingZeros(productPageDetail?.display_id)
                : productPageDetail?.invoice_id}
            </span>
          </div>

          <div className="flex mb-1">
            <p className="w-[25%]">No. of Stones :</p>
            <span className="text-solitaireTertiary">
              {productPageDetail?.items?.length}
            </span>
          </div>
          {productPageDetail?.total && (
            <div className="flex mb-1">
              <p className="w-[25%]">
                {check === 'previous-confirmations'
                  ? 'Paid Amount :'
                  : 'Payable Amount :'}
              </p>
              <span className="text-solitaireTertiary">
                {`${productPageDetail?.total} $`}
              </span>
            </div>
          )}
          {productPageDetail?.trackingId && (
            <div className="flex mb-1">
              <p className="w-[25%]">Tracking ID :</p>
              <span className="text-solitaireTertiary">
                {productPageDetail?.trackingId}
              </span>
            </div>
          )}
          {productPageDetail?.delivery && (
            <div className="flex mb-1">
              <p className="w-[25%]">Track Order :</p>
              <span className="text-solitaireTertiary border-b  border-solitaireQuaternary">
                <Link href={productPageDetail?.delivery?.link} target="_blank">
                  Track your order here
                </Link>
              </span>
            </div>
          )}
          {productPageDetail?.created_at && (
            <div className="flex mb-1">
              <p className="w-[25%]">Date & Time :</p>
              <span className="text-solitaireTertiary">
                {formatCreatedAt(productPageDetail?.created_at)}
              </span>
            </div>
          )}
          <div className="flex mb-1">
            <p className="w-[25%]">Payment Terms :</p>
            <span className="text-solitaireTertiary">
              {productPageDetail?.payment_term}
            </span>
          </div>
        </div>
        <div className="flex w-[50%]">
          <p className="pr-10">Comments:</p>
          <span className="text-solitaireTertiary">
            {productPageDetail?.comments?.length
              ? productPageDetail?.comments
              : '-'}
          </span>
        </div>
      </div>
      {rows?.length > 0 ? (
        <CustomDataTable
          tableRows={rows}
          tableColumns={tableColumns}
          checkboxData={checkboxData}
          mainTableStyle={styles.tableWrapper}
          errorSetState={errorSetState}
        />
      ) : (
        <NoDataFound />
      )}

      <div className="sticky bottom-0 bg-solitairePrimary mt-10 flex border-t-2 border-solitaireSenary items-center justify-between">
        {isError && (
          <div className="w-[50%]">
            <p className="text-red-700 text-base ">{errorText}</p>
          </div>
        )}
        {renderFooterButtons()}
      </div>
    </>
  );
};

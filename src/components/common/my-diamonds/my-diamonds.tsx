'use client';

import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { CustomSlider } from '../slider';
import { ManageLocales } from '@/utils/translate';
import ChevronImage from '@public/assets/icons/chevron-forward-outline.svg';
import Image from 'next/image';
import styles from './my-diamonds.module.scss';
import { CustomFooter } from '../footer';
import { formatCreatedAt } from '@/utils/format-date';
import { formatDate } from '@/utils/format-date-only';
import CustomDataTable from '../data-table';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { ManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import { NoDataFound } from '../no-data-found';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { CustomDialog } from '../dialog';
import { MyDiamondsProps, PageTitles } from './my-diamonds-interface';
import { formatNumberWithLeadingZeros } from '@/utils/formatNumberWithLeadingZeros';
import { performDownloadExcel } from '@/utils/performDownloadExcel';
import { useDataTableStateManagement } from '../data-table/hooks/data-table-state-management';
import { useCheckboxStateManagement } from '../checkbox/hooks/checkbox-state-management';
import { useErrorStateManagement } from '@/hooks/error-state-management';
import CustomPagination from '../pagination';
import Link from 'next/link';

export const MyDiamonds: React.FC<MyDiamondsProps> = ({
  data,
  handleCardClick,
  productPageDetail,
  check,
  setOffset,
  setLimit,
  limit
}) => {
  // Define the main MyDiamonds component
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { isCheck } = checkboxState;
  const { setIsCheck, setIsCheckAll } = checkboxSetState;

  const { errorState, errorSetState } = useErrorStateManagement();
  const { isError, errorText } = errorState;
  const { setIsError, setErrorText } = errorSetState;

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<ReactNode>('');

  const { dataTableState, dataTableSetState } = useDataTableStateManagement();
  const { rows, tableColumns } = dataTableState;
  const { setRows, setTableColumns } = dataTableSetState;

  //pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  let optionLimits = [
    { id: 1, value: '50' },
    { id: 2, value: '100' }
  ];

  // Fetch product page table columns
  const { data: productTableColumns } =
    useGetManageListingSequenceQuery<ManageListingSequenceResponse>({});

  // Download Excel API
  let [downloadExcel] = useDownloadExcelMutation();

  // useEffect to update data when productPageDetail changes
  useEffect(() => {
    setRows(productPageDetail?.items?.map((items: any) => items.product) || []);
  }, [productPageDetail, setRows]);

  // useEffect to update tableColumns when productTableColumns changes
  useEffect(() => {
    setTableColumns(productTableColumns);
  }, [productTableColumns, setTableColumns]);

  // Object containing checkbox data for Custom Data Table
  let checkboxData = {
    checkboxState,
    checkboxSetState
  };

  // Function to handle downloading Excel
  const downloadExcelFunction = () => {
    if (isCheck.length === 0) {
      setIsError(true);
      setErrorText('Please select a stone to perform action.');
    } else if (isCheck.length) {
      performDownloadExcel({
        productIds: isCheck,
        downloadExcelApi: downloadExcel,
        setDialogContent,
        setIsDialogOpen,
        setIsCheck,
        setIsCheckAll,
        setIsError
      });
    }
  };

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

  // Function to render individual Card
  const renderMyDiamondCard = (items: any) => {
    const rowKey = items.display_id ? items.display_id : items.invoice_id;
    return (
      <div
        key={rowKey}
        className="bg-solitaireSecondary w-full h-[80px] flex items-center px-5 rounded-xl cursor-pointer mt-3"
        onClick={() => handleCardClick(items?.id)}
      >
        {/* Add the content inside the card */}
        <div className="flex justify-between w-full">
          <div className="flex gap-[20px]">
            <p>
              {check === 'recent-confirmation' ? 'Order ID: ' : 'Invoice No: '}
              <span className="text-solitaireTertiary">
                {items.invoice_id
                  ? items.invoice_id
                  : formatNumberWithLeadingZeros(items.display_id)}
              </span>
            </p>
            {items?.delivery?.tracking_id && (
              <p onClick={e => e.stopPropagation()}>
                Track Order:{' '}
                <span className="text-solitaireTertiary border-b  border-solitaireQuaternary">
                  <Link href={items?.delivery?.link} target="_blank">
                    Track your order here
                  </Link>
                </span>
              </p>
            )}
            <p>
              Date:{' '}
              <span className="text-solitaireTertiary">
                {formatDate(items.created_at)}
              </span>
            </p>
          </div>
          <div>
            <Image src={ChevronImage} alt="chevron image" />
          </div>
        </div>
      </div>
    );
  };

  const handlePageClick = (page: number) => {
    if (page >= 0 && page <= numberOfPages) {
      const offset = page * limit!;
      setIsCheck([]);
      setIsCheckAll(false);
      setOffset!(offset);
      setCurrentPage(page);
    }
  };

  const handleResultsPerPageChange = useCallback(
    (event: string) => {
      const newResultsPerPage: number = parseInt(event, 10);
      setLimit!(newResultsPerPage);
      setOffset!(0);
      // Reset current page when changing results per page
      setNumberOfPages(Math.ceil(data?.count / newResultsPerPage));
    },
    [data?.count]
  );

  useEffect(() => {
    if (isDialogOpen) {
      // Set a timeout to close the dialog box after a delay (e.g., 5000 milliseconds)
      const timeoutId = setTimeout(() => {
        setIsDialogOpen(false);
      }, 5000);

      // Cleanup the timeout when the component unmounts or when isDialogOpen changes
      return () => clearTimeout(timeoutId);
    }
  }, [isDialogOpen, setIsDialogOpen]);

  return (
    <>
      <CustomDialog
        setIsOpen={setIsDialogOpen}
        isOpens={isDialogOpen}
        dialogContent={dialogContent}
      />
      <div className="mb-[50px] h-[70vh] overflow-auto">
        <div>
          {!data?.length && <NoDataFound />}
          <CustomSlider
            sheetTriggerStyle="w-full"
            sheetTriggenContent={
              data?.length &&
              data?.map((items: any) => {
                return renderMyDiamondCard(items);
              })
            }
            sheetContentStyle={styles.sheetContentStyle}
            sheetContent={
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
                          ? formatNumberWithLeadingZeros(
                              productPageDetail?.display_id
                            )
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
                          <Link
                            href={productPageDetail?.delivery?.link}
                            target="_blank"
                          >
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
            }
          />
        </div>
      </div>
      {check === 'previous-confirmations' && (
        <div className="sticky bottom-6 bg-solitairePrimary mt-3">
          {/* {data?.count > 0 && ( */}
          <CustomPagination
            currentPage={currentPage}
            totalPages={numberOfPages}
            resultsPerPage={limit!}
            optionLimits={optionLimits}
            handlePageClick={handlePageClick}
            handleResultsPerPageChange={handleResultsPerPageChange}
          />
          {/* )} */}
        </div>
      )}
    </>
  );
};

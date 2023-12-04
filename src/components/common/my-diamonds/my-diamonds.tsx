'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { CustomSlider } from '../slider';
import { ManageLocales } from '@/utils/translate';
import ChevronImage from '@public/assets/icons/chevron-forward-outline.svg';
import Image from 'next/image';
import styles from './my-diamonds.module.scss';
import { CustomFooter } from '../footer';
import { formatCreatedAt } from '@/utils/format-date';
import { formatDate } from '@/utils/format-date-only';
import CustomDataTable from '../data-table';
import { Product, TableColumn } from '@/app/search/result/result-interface';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { ManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import { NoDataFound } from '../no-data-found';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { CustomDialog } from '../dialog';
import { MyDiamondsProps, PageTitles } from './my-diamonds-interface';
import { formatNumberWithLeadingZeros } from '@/utils/formatNumberWithLeadingZeros';
import { performDownloadExcel } from '@/utils/performDownloadExcel';

export const MyDiamonds: React.FC<MyDiamondsProps> = ({
  data,
  handleCardClick,
  productPageDetail,
  check,
}) => {
  // Define the main MyDiamonds component
  const [rows, setRows] = useState<Product[]>([]);
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<ReactNode>('');

  // Fetch product page table columns
  const { data: productTableColumns } =
    useGetManageListingSequenceQuery<ManageListingSequenceResponse>({});

  // Download Excel API
  let [downloadExcel] = useDownloadExcelMutation();

  // useEffect to update data when productPageDetail changes
  useEffect(() => {
    setRows(productPageDetail?.items?.map((items: any) => items.product) || []);
  }, [productPageDetail]);

  // useEffect to update tableColumns when productTableColumns changes
  useEffect(() => {
    setTableColumns(productTableColumns);
  }, [productTableColumns]);

  //Selecting All Checkbox Function
  const handleSelectAllCheckbox = () => {
    setIsCheckAll(!isCheckAll);

    setIsCheck(rows?.map((item: Product) => item.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  // Function to handle clicking on a specific checkbox
  const handleClick = (id: string) => {
    let updatedIsCheck = [...isCheck];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter((item) => item !== id);
    } else {
      updatedIsCheck.push(id);
    }

    setIsCheck(updatedIsCheck);

    if (updatedIsCheck.length === rows?.length) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
    if (isCheckAll) {
      setIsCheckAll(false);
    }
    setIsError(false);
  };

  // Object containing checkbox data for Custom Data Table
  let checkboxData = {
    handleSelectAllCheckbox: handleSelectAllCheckbox,
    handleClick: handleClick,
    isCheck: isCheck,
    isCheckAll: isCheckAll,
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
        setIsError,
      });
    }
  };

  // Data for footer buttons
  const myDiamondsFooter = [
    {
      id: 1,
      displayButtonLabel: 'Download Excel',
      style: styles.transparent,
      fn: downloadExcelFunction,
    },
    { id: 2, displayButtonLabel: 'Download Invoice', style: styles.filled },
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
      'app.myDiamonds.PreviousConfirmations.PreviousConfirmationDetails',
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
            {items.trackOrder && (
              <p>
                Track Order:{' '}
                <span className="text-solitaireTertiary">
                  {items.trackOrder}
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

  return (
    <>
      <CustomDialog
        setIsOpen={setIsDialogOpen}
        isOpens={isDialogOpen}
        dialogContent={dialogContent}
      />
      <div className="mb-[50px] h-[70vh] overflow-auto">
        <div>
          <CustomSlider
            sheetTriggerStyle="w-full"
            sheetTriggenContent={
              data?.length ? (
                data?.map((items: any) => {
                  return renderMyDiamondCard(items);
                })
              ) : (
                <NoDataFound />
              )
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
                    {productPageDetail?.trackOrder && (
                      <div className="flex mb-1">
                        <p className="w-[25%]">Track Order :</p>
                        <span className="text-solitaireTertiary">
                          {productPageDetail?.trackOrder}
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
    </>
  );
};

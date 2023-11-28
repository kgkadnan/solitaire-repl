'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { CustomSlider } from '../slider';
import { ManageLocales } from '@/utils/translate';
import ChevronImage from '@public/assets/icons/chevron-forward-outline.svg';
import Image from 'next/image';
import styles from './my-diamonds.module.scss';
import { CustomFooter } from '../footer';
import { usePathname } from 'next/navigation';
import { formatCreatedAt } from '@/utils/format-date';
import { formatDate } from '@/utils/format-date-only';
import CustomDataTable from '../data-table';
import { Product, TableColumn } from '@/app/search/result-interface';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { ManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import { NoDataFound } from '../no-data-found';
import { CustomDisplayButton } from '../buttons/display-button';
import { downloadExcelFromBase64 } from '@/utils/download-excel-from-base64';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { CustomDialog } from '../dialog';

interface PageTitles {
  [key: string]: string;
}

interface MyDiamondsProps {
  data: any;
  handleCardClick: (id: string) => void;
  productPageDetail: any;
}

export const MyDiamonds: React.FC<MyDiamondsProps> = ({
  data,
  handleCardClick,
  productPageDetail,
}) => {
  console.log();

  const router = usePathname();
  const [rows, setRows] = useState<Product[]>([]);
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogContent, setDialogContent] = useState<ReactNode>('');

  const { data: productTableColumns } =
    useGetManageListingSequenceQuery<ManageListingSequenceResponse>({});

  let [downloadExcel] = useDownloadExcelMutation();

  useEffect(() => {
    setRows(productPageDetail?.items?.map((items: any) => items.product) || []);
  }, [productPageDetail]);

  useEffect(() => {
    setTableColumns(productTableColumns);
  }, [productTableColumns]);

  //Selecting All Checkbox Function
  const handleSelectAllCheckbox = () => {
    setIsCheckAll(!isCheckAll);

    setIsCheck(rows?.map((li: Product) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  //specific checkbox
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

  //Checkbox Data for Custom Data Table
  let checkboxData = {
    handleSelectAllCheckbox: handleSelectAllCheckbox,
    handleClick: handleClick,
    isCheck: isCheck,
    isCheckAll: isCheckAll,
  };

  const performDownloadExcel = (
    productIds: any[],
    isEntireSearch?: boolean
  ) => {
    if (isEntireSearch) {
      console.log('isEntireSearch', isEntireSearch);
    } else {
      downloadExcel({ productIds })
        .unwrap()
        .then((res) => {
          let { data, fileName } = res;
          if (data) {
            downloadExcelFromBase64(data, fileName);
            setIsDialogOpen(true);
            setDialogContent(
              <>
                <div className="max-w-[380px] flex justify-center align-middle">
                  <Image src={confirmImage} alt="vector image" />
                </div>
                <div className="max-w-[380px] flex justify-center align-middle text-solitaireTertiary">
                  Download Excel Successfully
                </div>
              </>
            );
          }
        })
        .catch((e) => {
          console.log('error', e);
        });
    }
    setIsCheck([]);
    setIsCheckAll(false);
    setIsError(false);
  };

  //download Excel
  const downloadExcelFunction = () => {
    if (isCheckAll) {
      setIsDialogOpen(true);
      setDialogContent(
        <>
          <div className="max-w-[330px] flex justify-center text-center align-middle text-solitaireTertiary">
            Do you want to all the stones available in search or just selected
            stones!
          </div>
          <div className="max-w-[400px] flex justify-around align-middle text-solitaireTertiary">
            <CustomDisplayButton
              displayButtonLabel="Selected"
              handleClick={() => {
                setIsDialogOpen(false);
                performDownloadExcel(isCheck);
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonTransparent,
              }}
            />
            <CustomDisplayButton
              displayButtonLabel="All"
              handleClick={() => {
                setIsDialogOpen(false);
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonFilled,
              }}
            />
          </div>
        </>
      );
    } else if (isCheck.length === 0) {
      setIsError(true);
      setErrorText('Please select a stone to perform action.');
    } else if (isCheck.length) {
      performDownloadExcel(isCheck);
    }
  };

  const myDiamondsFooter = [
    {
      id: 1,
      displayButtonLabel: 'Download Excel',
      style: styles.transparent,
      fn: downloadExcelFunction,
    },
    { id: 2, displayButtonLabel: 'Download Invoice', style: styles.filled },
  ];

  const renderFooterButtons = () => (
    <CustomFooter
      footerButtonData={
        router === '/my-diamonds/recent-confirmation'
          ? [myDiamondsFooter[0]]
          : myDiamondsFooter
      }
      noBorderTop={styles.paginationContainerStyle}
    />
  );

  const pageTitles: PageTitles = {
    '/my-diamonds/recent-confirmation':
      'app.myDiamonds.RecentConfirmations.recentConfirmationDetail',
    '/my-diamonds/my-invoices': 'app.myDiamonds.myInvoice.myInvoiceDetail',
    '/my-diamonds/previous-confirmation':
      'app.myDiamonds.previousConfirmation.previousConfirmationDetail',
  };

  const renderPageTitle = (router: string) => {
    const pageTitle = pageTitles[router];
    return pageTitle ? <p>{ManageLocales(pageTitle)}</p> : null;
  };

  const renderTableRow = (items: any) => {
    // Determine the key for each row based on 'id' or 'invoiceNo'
    const rowKey = items.id ? items.id : items.invoiceNo;

    return (
      <div
        key={rowKey}
        className="bg-solitaireSecondary w-full h-[80px] flex items-center px-5 rounded-xl cursor-pointer mt-3"
        onClick={() => handleCardClick(items.id)}
      >
        {/* Add the content inside the row */}
        <div className="flex justify-between w-full">
          <div className="flex gap-[20px]">
            <p>
              {items.id ? 'Order ID: ' : 'Invoice No: '}
              <span className="text-solitaireTertiary">
                {items.id ? items.id.toUpperCase() : items.invoiceNo}
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
            sheetTriggenContent={data?.map((items: any) => {
              return renderTableRow(items);
            })}
            sheetContentStyle={styles.sheetContentStyle}
            sheetContent={
              <>
                <div className="border-b border-solitaireSenary h-[80px] flex items-center mb-5">
                  {renderPageTitle(router)}
                </div>

                <div className="flex border-b border-solitaireSenary h-[180px]">
                  <div className="w-[50%]">
                    <div className="flex mb-1">
                      <p className="w-[30%]">
                        {router === '/my-diamonds/recent-confirmation'
                          ? 'Order ID : '
                          : 'Invoice Number : '}
                      </p>
                      <span className="text-solitaireTertiary">
                        {router === '/my-diamonds/recent-confirmation'
                          ? productPageDetail?.id?.toUpperCase()
                          : 'items?.invoiceNo'}
                      </span>
                    </div>
                    <div className="flex mb-1">
                      <p className="w-[30%]">No. of Stones :</p>
                      <span className="text-solitaireTertiary">
                        {productPageDetail?.items?.length}
                      </span>
                    </div>
                    {productPageDetail?.total && (
                      <div className="flex mb-1">
                        <p className="w-[30%]">Payable Amount :</p>
                        <span className="text-solitaireTertiary">
                          {`${productPageDetail?.total} $`}
                        </span>
                      </div>
                    )}
                    {productPageDetail?.paidAmount && (
                      <div className="flex mb-1">
                        <p className="w-[30%]">Paid Amount :</p>
                        <span className="text-solitaireTertiary">
                          {productPageDetail?.paidAmount}
                        </span>
                      </div>
                    )}
                    {productPageDetail?.trackingId && (
                      <div className="flex mb-1">
                        <p className="w-[30%]">Tracking ID :</p>
                        <span className="text-solitaireTertiary">
                          {productPageDetail?.trackingId}
                        </span>
                      </div>
                    )}
                    {productPageDetail?.trackOrder && (
                      <div className="flex mb-1">
                        <p className="w-[30%]">Track Order :</p>
                        <span className="text-solitaireTertiary">
                          {productPageDetail?.trackOrder}
                        </span>
                      </div>
                    )}
                    {productPageDetail?.created_at && (
                      <div className="flex mb-1">
                        <p className="w-[30%]">Date & Time :</p>
                        <span className="text-solitaireTertiary">
                          {formatCreatedAt(productPageDetail?.created_at)}
                        </span>
                      </div>
                    )}
                    {/* <div className="flex mb-1">
                            <p className="w-[30%]">Payment Terms :</p>
                            <span className="text-solitaireTertiary">
                              {items.paymentTerm}
                            </span>
                          </div> */}
                  </div>
                  {/* <div className="flex w-[50%]">
                          <p className="pr-10">Comments:</p>
                          <span className="text-solitaireTertiary">
                            {items.comment.length ? items.comment : '-'}
                          </span>
                        </div> */}
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

'use client';

import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { CustomSlider } from '../../../../components/common/slider';
import ChevronImage from '@public/assets/icons/chevron-forward-outline.svg';
import Image from 'next/image';
import styles from './my-diamonds.module.scss';
import { formatDate } from '@/utils/format-date-only';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { ManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import { NoDataFound } from '../../../../components/common/no-data-found';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { CustomDialog } from '../../../../components/common/dialog';
import { formatNumberWithLeadingZeros } from '@/utils/format-number-withLeadingZeros';
import { performDownloadExcel } from '@/utils/perform-download-excel';
import { useDataTableStateManagement } from '../../../../components/common/data-table/hooks/data-table-state-management';
import { useCheckboxStateManagement } from '../../../../components/common/checkbox/hooks/checkbox-state-management';
import { useErrorStateManagement } from '@/hooks/error-state-management';
import CustomPagination from '../../../../components/common/pagination';
import Link from 'next/link';
import { MyDiamondsProps } from '../../interface/my-diamonds-interface';
import { MyDiamondsSheetContent } from './sheet-content';

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
        products: isCheck,
        downloadExcelApi: downloadExcel,
        setDialogContent,
        setIsDialogOpen,
        setIsCheck,
        setIsCheckAll,
        setIsError
      });
    }
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
      }, 3500);

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
      <div className=" h-[70vh] overflow-auto">
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
              <MyDiamondsSheetContent
                check={check}
                productPageDetail={productPageDetail}
                rows={rows}
                tableColumns={tableColumns}
                checkboxData={checkboxData}
                errorSetState={errorSetState}
                isError={isError}
                errorText={errorText}
                downloadExcelFunction={downloadExcelFunction}
              />
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

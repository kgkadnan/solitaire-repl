'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { CustomSlider } from '../../../../components/common/slider';
import ChevronImage from '@public/assets/icons/chevron-forward-outline.svg';
import Image from 'next/image';
import styles from './my-diamonds.module.scss';
import { formatDate } from '@/utils/format-date-only';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { IManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import { NoDataFound } from '../../../../components/common/no-data-found';
import { useDownloadExcelMutation } from '@/features/api/download-excel';

import { formatNumberWithLeadingZeros } from '@/utils/format-number-withLeadingZeros';
import { performDownloadExcel } from '@/utils/perform-download-excel';
import { useDataTableStateManagement } from '../../../../components/common/data-table/hooks/data-table-state-management';
import { useCheckboxStateManagement } from '../../../../components/common/checkbox/hooks/checkbox-state-management';
import { useErrorStateManagement } from '@/hooks/error-state-management';
import CustomPagination from '../../../../components/common/pagination';
import Link from 'next/link';
import { IMyDiamondsProps } from '../../interface/my-diamonds-interface';
import { MyDiamondsSheetContent } from './sheet-content';
import { SELECT_STONE_TO_PERFORM_ACTION } from '@/constants/error-messages/my-diamond';

export const MyDiamonds: React.FC<IMyDiamondsProps> = ({
  data,
  handleCardClick,
  productPageDetail,
  check,
  setOffset,
  setLimit,
  limit,
  modalSetState
}) => {
  // Define the main MyDiamonds component
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { isCheck } = checkboxState;
  const { setIsCheck, setIsCheckAll } = checkboxSetState;

  const { errorState, errorSetState } = useErrorStateManagement();
  const { isError, errorText } = errorState;
  const { setIsError, setErrorText } = errorSetState;

  const { setIsDialogOpen, setDialogContent } = modalSetState;

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
    useGetManageListingSequenceQuery<IManageListingSequenceResponse>({});

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

  useEffect(() => {
    if (check === 'previous-confirmations') {
      limit && setNumberOfPages(Math.ceil(data?.length / limit));
    }
  }, [data, limit]);

  // Object containing checkbox data for Custom Data Table
  let checkboxData = {
    checkboxState,
    checkboxSetState
  };

  // Function to handle downloading Excel
  const downloadExcelFunction = () => {
    if (isCheck.length === 0) {
      setIsError(true);
      setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
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

  return (
    <>
      <div className={`h-[70vh] overflow-auto  mb-[30px] ${styles.scrollBar}`}>
        <div>
          {!data?.length && <NoDataFound />}
          <CustomSlider
            sheetTriggerStyle="w-full"
            sheetTriggenContent={
              data?.length > 0 &&
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
                modalSetState={modalSetState}
              />
            }
          />
        </div>
      </div>
      {check === 'previous-confirmations' && (
        <div className="sticky bottom-6 bg-solitairePrimary mt-3">
          <CustomPagination
            currentPage={currentPage}
            totalPages={numberOfPages}
            resultsPerPage={limit!}
            optionLimits={optionLimits}
            handlePageClick={handlePageClick}
            handleResultsPerPageChange={handleResultsPerPageChange}
          />
        </div>
      )}
    </>
  );
};

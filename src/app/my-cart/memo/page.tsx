'use client';

import { ManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import CustomDataTable from '@/components/common/data-table';
import { useGetCartQuery } from '@/features/api/cart';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './memo.module.scss';
import { CustomFooter } from '@/components/common/footer';
import { NoDataFound } from '@/components/common/no-data-found';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { CustomDialog } from '@/components/common/dialog';
import { performDownloadExcel } from '@/utils/perform-download-excel';
import { useDataTableStateManagement } from '@/components/common/data-table/hooks/data-table-state-management';
import { useCheckboxStateManagement } from '@/components/common/checkbox/hooks/checkbox-state-management';
import { useErrorStateManagement } from '@/hooks/error-state-management';
import { Product } from '@/app/search/result/result-interface';

const MemoOut = () => {
  // State variables

  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { isCheck } = checkboxState;
  const { setIsCheck, setIsCheckAll } = checkboxSetState;

  const { errorState, errorSetState } = useErrorStateManagement();
  const { isError, errorText } = errorState;
  const { setIsError, setErrorText } = errorSetState;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode>('');

  const { dataTableState, dataTableSetState } = useDataTableStateManagement();

  const { rows, tableColumns } = dataTableState;
  const { setRows, setTableColumns } = dataTableSetState;

  // Fetching table columns for managing listing sequence
  const { data: listingColumns } =
    useGetManageListingSequenceQuery<ManageListingSequenceResponse>({});

  // Fetching cart data
  const { data } = useGetCartQuery({});

  // Mutation for downloading Excel data
  let [downloadExcel] = useDownloadExcelMutation();

  //Checkbox Data for Custom Data Table
  let checkboxData = {
    checkboxState,
    checkboxSetState
  };

  // Compare Stone handler
  const handleCompareStone = () => {
    const maxStones = 10;
    const minStones = 2;

    if (isCheck.length > maxStones) {
      setIsError(true);
      setErrorText(`You can compare a maximum of ${maxStones} stones`);
    } else if (isCheck.length < minStones) {
      setIsError(true);
      setErrorText(`Minimum ${minStones} stones are required to compare`);
    } else {
      const compareStones = isCheck
        .map(id =>
          data.items.find((row: { product: Product }) => row.product.id === id)
        )
        .map(stone => stone.product);

      localStorage.setItem('compareStone', JSON.stringify(compareStones));
      window.open('/compare-stone', '_blank');
    }
  };

  // Share handler
  const handleShare = () => {
    setIsError(true);
    setErrorText(`You haven't picked any stones.`);
  };

  // Handle download of Excel based on user selection (All or Selected)
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

  // View Similar Stone handler
  const handleViewSimilarStone = () => {
    alert('You have click the View Similar Stone');
  };

  //Footer Button Data
  const footerButtonData = [
    {
      id: 2,
      displayButtonLabel: 'Download Excel',
      style: styles.transparent,
      fn: downloadExcelFunction
    },
    {
      id: 3,
      displayButtonLabel: 'Share',
      style: styles.transparent,
      fn: handleShare
    },
    {
      id: 4,
      displayButtonLabel: 'Compare Stone',
      style: styles.transparent,
      fn: handleCompareStone
    },

    {
      id: 4,
      displayButtonLabel: 'View Similar Stone',
      style: styles.filled,
      fn: handleViewSimilarStone
    }
  ];

  // Effect hook to update table columns when listingColumns change
  useEffect(() => {
    setTableColumns(listingColumns);
  }, [listingColumns, setTableColumns]);

  // Effect hook to update rows when cart data changes
  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const activeDiamondItems = data.items
          .filter(
            (item: { product: Product }) =>
              item?.product?.diamond_status === 'MemoOut'
          )
          .map((row: { product: Product }) => row.product);

        setRows(activeDiamondItems);
      }
    };

    updateRows();
  }, [data, setRows]);

  useEffect(() => {
    if (isDialogOpen) {
      // Set a timeout to close the dialog box after a delay (e.g., 3000 milliseconds)
      const timeoutId = setTimeout(() => {
        setIsDialogOpen(false);
      }, 3000);

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
      {rows.length > 0 ? (
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

      {/* Custom Footer */}
      {footerButtonData?.length && (
        <div className="sticky bottom-0 bg-solitairePrimary mt-10 flex border-t-2 border-solitaireSenary items-center justify-between">
          {isError && (
            <div className="w-[30%]">
              <p className="text-red-700 text-base ">{errorText}</p>
            </div>
          )}
          <CustomFooter
            footerButtonData={footerButtonData}
            noBorderTop={styles.paginationContainerStyle}
          />
        </div>
      )}
    </>
  );
};

export default MemoOut;

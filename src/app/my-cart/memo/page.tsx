'use client';

import CustomDataTable from '@/components/common/data-table';

import React from 'react';
import styles from './memo.module.scss';
import { CustomFooter } from '@/components/common/footer';
import { NoDataFound } from '@/components/common/no-data-found';

import {
  MAX_COMPARE_STONE,
  MIN_COMPARE_STONE
} from '@/constants/business-logic';
import { Product } from '@/app/search/result/result-interface';

const MemoOut = ({
  tableColumns,
  memoRows,
  downloadExcelFunction,
  errorSetState,
  errorState,
  checkboxState,
  checkboxSetState,
  modalSetState
}: any) => {
  // State variables

  const { isCheck } = checkboxState;
  const { isError, errorText } = errorState;
  const { setIsError, setErrorText } = errorSetState;

  //Checkbox Data for Custom Data Table
  let checkboxData = {
    checkboxState,
    checkboxSetState
  };

  // Share handler
  const handleShare = () => {
    setIsError(true);
    setErrorText(`You haven't picked any stones.`);
  };

  // View Similar Stone handler
  const handleViewSimilarStone = () => {
    alert('You have click the View Similar Stone');
  };

  // Compare Stone handler
  const handleCompareStone = () => {
    const maxStones = MAX_COMPARE_STONE;
    const minStones = MIN_COMPARE_STONE;

    if (isCheck.length > maxStones) {
      setIsError(true);
      setErrorText(`You can compare a maximum of ${maxStones} stones`);
    } else if (isCheck.length < minStones) {
      setIsError(true);
      setErrorText(`Minimum ${minStones} stones are required to compare`);
    } else {
      const comapreStones = isCheck.map((id: string) => {
        return memoRows.find((row: Product) => row.id === id);
      });

      localStorage.setItem('compareStone', JSON.stringify(comapreStones));
      window.open('/compare-stone', '_blank');
    }
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

  return (
    <div className="mt-[21px]">
      {memoRows.length > 0 ? (
        <CustomDataTable
          tableRows={memoRows}
          tableColumns={tableColumns}
          checkboxData={checkboxData}
          mainTableStyle={styles.tableWrapper}
          errorSetState={errorSetState}
          modalSetState={modalSetState}
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
    </div>
  );
};

export default MemoOut;

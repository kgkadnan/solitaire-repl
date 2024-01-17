'use client';

import CustomDataTable from '@/components/common/data-table';

import React from 'react';
import styles from './memo.module.scss';
import { CustomFooter } from '@/components/common/footer';
import { NoDataFound } from '@/components/common/no-data-found';

import { handleCompareStone } from '@/utils/compare-stone';
import { NO_STONES_SELECTED } from '@/constants/error-messages/cart';
import {
  IErrorSetState,
  IErrorState,
  IModalSetState,
  ITableColumn
} from '@/app/search/result/result-interface';
import {
  ICheckboxSetState,
  ICheckboxState
} from '@/components/common/checkbox/interface';

interface IMemoOut {
  tableColumns: ITableColumn[];
  memoRows: any;
  downloadExcelFunction: () => void;
  errorSetState: IErrorSetState;
  errorState: IErrorState;
  checkboxState: ICheckboxState;
  checkboxSetState: ICheckboxSetState;
  modalSetState: IModalSetState;
}
const MemoOut: React.FC<IMemoOut> = ({
  tableColumns,
  memoRows,
  downloadExcelFunction,
  errorSetState,
  errorState,
  checkboxState,
  checkboxSetState,
  modalSetState
}) => {
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
    setErrorText(NO_STONES_SELECTED);
  };

  // View Similar Stone handler
  const handleViewSimilarStone = () => {
    alert('You have click the View Similar Stone');
  };

  //Footer Button Data
  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: 'Download Excel',
      style: styles.transparent,
      fn: downloadExcelFunction
    },
    {
      id: 2,
      displayButtonLabel: 'Share',
      style: styles.transparent,
      fn: handleShare
    },
    {
      id: 3,
      displayButtonLabel: 'Compare Stone',
      style: styles.transparent,
      fn: () =>
        handleCompareStone({
          isCheck,
          setIsError,
          setErrorText,
          activeCartRows: memoRows
        })
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
      {memoRows?.length > 0 ? (
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
              <p className="text-solitaireError text-base ">{errorText}</p>
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

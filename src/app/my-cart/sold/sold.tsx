'use client';

import CustomDataTable from '@/components/common/data-table';
import React from 'react';
import styles from './sold.module.scss';
import { CustomFooter } from '@/components/common/footer';
import { NoDataFound } from '@/components/common/no-data-found';
import {
  IErrorSetState,
  IModalSetState,
  ITableColumn
} from '@/app/search/result/result-interface';
import {
  ICheckboxSetState,
  ICheckboxState
} from '@/components/common/checkbox/interface';

interface IOutOfStock {
  tableColumns: ITableColumn[];
  soldOutRows: any;
  checkboxState: ICheckboxState;
  checkboxSetState: ICheckboxSetState;
  errorSetState: IErrorSetState;
  modalSetState: IModalSetState;
}
const OutOfStock: React.FC<IOutOfStock> = ({
  tableColumns,
  soldOutRows,
  checkboxState,
  checkboxSetState,
  errorSetState,
  modalSetState
}) => {
  //Checkbox Data for Custom Data Table
  const checkboxData = {
    checkboxState,
    checkboxSetState
  };

  // View Similar Stone handler
  const handleViewSimilarStone = () => {};

  //Footer Button Data
  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: 'View Similar Stone',
      style: styles.filled,
      fn: handleViewSimilarStone
    }
  ];

  return (
    <div className="mt-[21px]">
      {soldOutRows?.length > 0 ? (
        <CustomDataTable
          tableRows={soldOutRows}
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
          <CustomFooter
            footerButtonData={footerButtonData}
            noBorderTop={styles.paginationContainerStyle}
          />
        </div>
      )}
    </div>
  );
};

export default OutOfStock;

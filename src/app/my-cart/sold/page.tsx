'use client';

import { ManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import CustomDataTable from '@/components/common/data-table';
import { useGetCartQuery } from '@/features/api/cart';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import React, { useEffect } from 'react';
import styles from './sold.module.scss';
import { CustomFooter } from '@/components/common/footer';
import { NoDataFound } from '@/components/common/no-data-found';
import { SOLD_OUT_STATUS } from '@/constants/business-logic';
import { useDataTableStateManagement } from '@/components/common/data-table/hooks/data-table-state-management';
import { useCheckboxStateManagement } from '@/components/common/checkbox/hooks/checkbox-state-management';
import { useErrorStateManagement } from '@/hooks/error-state-management';
import { Product } from '@/app/search/result/result-interface';

const OutOfStock = () => {
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();

  const { rows, tableColumns } = dataTableState;
  const { setRows, setTableColumns } = dataTableSetState;

  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { errorSetState } = useErrorStateManagement();

  // Fetching table columns for managing listing sequence
  const { data: listingColumns } =
    useGetManageListingSequenceQuery<ManageListingSequenceResponse>({});

  // Fetching cart data
  const { data } = useGetCartQuery({});

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

  // Effect hook to update table columns when listingColumns change
  useEffect(() => {
    setTableColumns(listingColumns);
  }, [listingColumns, setTableColumns]);

  // Effect hook to update rows when cart data changes
  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const soldOutItems = data.items
          .filter(
            (item: { product: Product }) =>
              item?.product?.diamond_status === SOLD_OUT_STATUS
          )
          .map((row: { product: Product }) => row.product);

        setRows(soldOutItems);
      }
    };

    updateRows();
  }, [data, setRows]);

  return (
    <>
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
          <CustomFooter
            footerButtonData={footerButtonData}
            noBorderTop={styles.paginationContainerStyle}
          />
        </div>
      )}
    </>
  );
};

export default OutOfStock;

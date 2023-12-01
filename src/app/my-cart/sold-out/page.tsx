'use client';

import { ManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import { Product, TableColumn } from '@/app/search/result/result-interface';
import CustomDataTable from '@/components/common/data-table';
import { useGetCartQuery } from '@/features/api/cart';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import React, { useEffect, useState } from 'react';
import styles from './sold-out.module.scss';
import { CustomFooter } from '@/components/common/footer';
import { NoDataFound } from '@/components/common/no-data-found';
import { SOLD_OUT_STATUS } from '@/constants/business-logic';

const OutOfStock = () => {
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);
  const [rows, setRows] = useState([]);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  // Fetching table columns for managing listing sequence
  const { data: listingColumns } =
    useGetManageListingSequenceQuery<ManageListingSequenceResponse>({});

  // Fetching cart data
  const { data } = useGetCartQuery({});

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
  };

  //Selecting All Checkbox Function
  const handleSelectAllCheckbox = () => {
    setIsCheckAll(!isCheckAll);

    setIsCheck(rows?.map((li: Product) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  //Checkbox Data for Custom Data Table
  let checkboxData = {
    handleSelectAllCheckbox: handleSelectAllCheckbox,
    handleClick: handleClick,
    isCheck: isCheck,
    isCheckAll: isCheckAll,
  };

  // View Similar Stone handler
  const handleViewSimilarStone = () => {};

  //Footer Button Data
  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: 'View Similar Stone',
      style: styles.filled,
      fn: handleViewSimilarStone,
    },
  ];

  // Effect hook to update table columns when listingColumns change
  useEffect(() => {
    setTableColumns(listingColumns);
  }, [listingColumns]);

  // Effect hook to update rows when cart data changes
  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const soldOutItems = data.items
          .filter(
            (item: any) => item?.product?.diamond_status === SOLD_OUT_STATUS
          )
          .map((row: any) => row.product);

        setRows(soldOutItems);
      }
    };

    updateRows();
  }, [data]);

  return (
    <>
      {rows.length > 0 ? (
        <CustomDataTable
          tableRows={rows}
          tableColumns={tableColumns}
          checkboxData={checkboxData}
          mainTableStyle={styles.tableWrapper}
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

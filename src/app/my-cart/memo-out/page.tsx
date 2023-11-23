'use client';

import { ManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import { Product, TableColumn } from '@/app/search/result-interface';
import CustomDataTable from '@/components/common/data-table';
import { useGetCartQuery } from '@/features/api/cart';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import React, { useEffect, useState } from 'react';
import styles from './memo-out.module.scss';
import { CustomFooter } from '@/components/common/footer';
import { useRouter } from 'next/navigation';
import { NoDataFound } from '@/components/common/no-data-found';

const MemoOut = () => {
  const router = useRouter();
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);
  const [rows, setRows] = useState([]);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const { data: listingColumns } =
    useGetManageListingSequenceQuery<ManageListingSequenceResponse>({});

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
    setIsError(false);
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

  useEffect(() => {
    setTableColumns(listingColumns);
  }, [listingColumns]);

  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const activeDiamondItems = data.items
          .filter((item: any) => item?.product?.diamond_status === 'MemoOut')
          .map((row: any) => row.product);

        setRows(activeDiamondItems);
      }
    };

    updateRows();
  }, [data]);

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
        .map((id) => data.items.find((row: any) => row.product.id === id))
        .map((stone) => stone.product);

      localStorage.setItem('compareStone', JSON.stringify(compareStones));
      window.open('/compare-stone', '_blank');
    }
  };

  const handleShare = () => {
    setIsError(true);
    setErrorText(`You haven't picked any stones.`);
  };

  const handleDownloadExcel = () => {
    alert('You have click the download excel button');
  };

  const handleViewSimilarStone = () => {
    alert('You have click the View Similar Stone');
  };

  //Footer Button Data
  const footerButtonData = [
    {
      id: 2,
      displayButtonLabel: 'Download Excel',
      style: styles.transparent,
      fn: handleDownloadExcel,
    },
    {
      id: 3,
      displayButtonLabel: 'Share',
      style: styles.transparent,
      fn: handleShare,
    },
    {
      id: 4,
      displayButtonLabel: 'Compare Stone',
      style: styles.transparent,
      fn: handleCompareStone,
    },

    {
      id: 4,
      displayButtonLabel: 'View Similar Stone',
      style: styles.filled,
      fn: handleViewSimilarStone,
    },
  ];

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

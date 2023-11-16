'use client';

import { ManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import { Product, TableColumn } from '@/app/search/result-interface';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import CustomDataTable from '@/components/common/data-table';
import { CustomDropdown } from '@/components/common/dropdown';
import { useDeleteCartMutation, useGetCartQuery } from '@/features/api/cart';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { ManageLocales } from '@/utils/translate';
import React, { useEffect, useState } from 'react';
import styles from './active-cart.module.scss';
import { CustomFooter } from '@/components/common/footer';

import { CustomDialog } from '@/components/common/dialog';
import { useRouter } from 'next/navigation';
import { NoDataFound } from '@/components/common/no-data-found';

const ActiveMyCart = () => {
  const router = useRouter();
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);
  const [rows, setRows] = useState([]);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: listingColumns } =
    useGetManageListingSequenceQuery<ManageListingSequenceResponse>({});

  const { data } = useGetCartQuery({});

  const [deleteCart, { isLoading: updateIsLoading, isError: updateIsError }] =
    useDeleteCartMutation();

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

  useEffect(() => {
    setTableColumns(listingColumns);
  }, [listingColumns]);

  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const activeDiamondItems = data.items
          .filter((item: any) => item?.product?.diamond_status === 'Active')
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
      router.push('/compare-stone');
    }
  };

  const handleDelete = () => {
    if (isCheck.length) {
      setIsError(false);
      setIsDialogOpen(true);
    } else {
      setIsError(true);
      setErrorText(`You haven't picked any stones.`);
    }
  };

  const deleteStoneHandler = () => {
    let itemsId = isCheck.map((id) => {
      const selectedRow = data.items.find((row: any) => row.product.id === id);
      return selectedRow?.id;
    });

    deleteCart({
      items: itemsId,
    })
      .unwrap()
      .then(() => {
        setIsCheck([]);
        setIsCheckAll(false);
      })
      .catch((error) => {
        console.log('error', error);
      });
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    setIsError(true);
    setErrorText(`You haven't picked any stones.`);
  };

  const handleAppointment = () => {
    setIsError(true);
    setErrorText(`You haven't picked any stones.`);
  };

  //Footer Button Data
  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: (
        <CustomDropdown
          dropdownTrigger={
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.searchResult.footer.more')}
            />
          }
          dropdownMenu={[
            {
              label: 'Share',
              fn: '',
            },
            {
              label: 'Download Excel',
              fn: '',
            },
            {
              label: 'Find Matching Pair',
              fn: '',
            },
            {
              label: 'Compare Stone',
              fn: handleCompareStone,
            },
          ]}
        />
      ),
    },
    {
      id: 2,
      displayButtonLabel: 'Book Appointment',
      style: styles.transparent,
      fn: handleAppointment,
    },
    {
      id: 2,
      displayButtonLabel: 'Delete',
      style: styles.transparent,
      fn: handleDelete,
    },
    {
      id: 3,
      displayButtonLabel: 'Confirm Stone',
      style: styles.filled,
      fn: handleConfirm,
    },
  ];

  return (
    <>
      <CustomDialog
        setIsOpen={setIsDialogOpen}
        isOpens={isDialogOpen}
        dialogContent={
          <>
            <p className="mt-3 px-[50px] text-center">
              Do you want to Delete the selected Stones?
            </p>
            <div className="flex justify-center">
              <CustomDisplayButton
                displayButtonLabel="NO"
                displayButtonAllStyle={{
                  displayButtonStyle: `mr-[25px] ${styles.transparent}`,
                }}
                handleClick={() => setIsDialogOpen(false)}
              />
              <CustomDisplayButton
                displayButtonLabel="Yes"
                displayButtonAllStyle={{
                  displayButtonStyle: styles.filled,
                }}
                handleClick={deleteStoneHandler}
              />
            </div>
          </>
        }
      />
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

export default ActiveMyCart;

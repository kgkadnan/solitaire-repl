'use client';

import { ManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import CustomDataTable from '@/components/common/data-table';
import { CustomDropdown } from '@/components/common/dropdown';
import { useDeleteCartMutation, useGetCartQuery } from '@/features/api/cart';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { ManageLocales } from '@/utils/translate';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './active-cart.module.scss';
import { CustomFooter } from '@/components/common/footer';
import { CustomDialog } from '@/components/common/dialog';
import { NoDataFound } from '@/components/common/no-data-found';
import { CustomSlider } from '@/components/common/slider';
import ConfirmStone from '@/components/common/confirm-stone';
import {
  ACTIVE_STATUS,
  MAX_COMPARE_STONE,
  MIN_COMPARE_STONE
} from '@/constants/business-logic';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import Image from 'next/image';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { performDownloadExcel } from '@/utils/performDownloadExcel';

import { useErrorStateManagement } from '@/hooks/error-state-management';
import { useConfirmStoneStateManagement } from '@/components/common/confirm-stone/hooks/confirm-state-management';
import { handleConfirmStone } from '@/components/common/confirm-stone/helper/handle-confirm';
import { useDataTableStateManagement } from '@/components/common/data-table/hooks/data-table-state-management';
import { useCheckboxStateManagement } from '@/components/common/checkbox/hooks/checkbox-state-management';
import { Product } from '@/app/search/result/result-interface';

const ActiveMyCart = () => {
  // State variables for managing component state
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { isCheck } = checkboxState;
  const { setIsCheck, setIsCheckAll } = checkboxSetState;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode>('');

  const { confirmStoneState, confirmStoneSetState } =
    useConfirmStoneStateManagement();
  const { errorState, errorSetState } = useErrorStateManagement();

  const { isError, errorText } = errorState;
  const { setErrorText, setIsSliderError, setIsError } = errorSetState;

  const { setConfirmStoneData } = confirmStoneSetState;
  const [isSliderOpen, setIsSliderOpen] = useState(Boolean);
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();

  const { rows, tableColumns } = dataTableState;
  const { setRows, setTableColumns } = dataTableSetState;

  // Fetching table columns for managing listing sequence
  const { data: cartTableColumns } =
    useGetManageListingSequenceQuery<ManageListingSequenceResponse>({});

  // Fetching cart data
  const { data } = useGetCartQuery({});

  // Mutation for deleting items from the cart
  const [deleteCart] = useDeleteCartMutation();

  // Mutation for downloading Excel data
  const [downloadExcel] = useDownloadExcelMutation();

  // Data for Custom Data Table checkboxes
  const checkboxData = {
    checkboxState,
    checkboxSetState
  };

  // Handle the comparison of selected stones
  const handleCompareStone = () => {
    // Check the number of selected stones
    if (isCheck.length > MAX_COMPARE_STONE) {
      setIsError(true);
      setErrorText(`You can compare a maximum of ${MAX_COMPARE_STONE} stones`);
    } else if (isCheck.length < MIN_COMPARE_STONE) {
      setIsError(true);
      setErrorText(
        `Minimum ${MIN_COMPARE_STONE} stones are required to compare`
      );
    } else {
      // Get the data of selected stones and open a new window for comparison
      const compareStones = isCheck
        .map(id =>
          data.items.find((row: { product: Product }) => row.product.id === id)
        )
        .map(stone => stone.product);

      localStorage.setItem('compareStone', JSON.stringify(compareStones));

      window.open('/compare-stone', '_blank');
    }
  };

  // Handle the deletion of selected stones
  const handleDelete = () => {
    if (isCheck.length) {
      setIsError(false);
      setIsDialogOpen(true);
      setDialogContent(
        <>
          <p className="mt-3 px-[50px] text-center">
            Do you want to Delete the selected Stones?
          </p>
          <div className="flex justify-center">
            <CustomDisplayButton
              displayButtonLabel="NO"
              displayButtonAllStyle={{
                displayButtonStyle: `mr-[25px] ${styles.transparent}`
              }}
              handleClick={() => setIsDialogOpen(false)}
            />
            <CustomDisplayButton
              displayButtonLabel="Yes"
              displayButtonAllStyle={{
                displayButtonStyle: styles.filled
              }}
              handleClick={deleteStoneHandler}
            />
          </div>
        </>
      );
    } else {
      setIsError(true);
      setErrorText(`You haven't picked any stones.`);
    }
  };

  // Handle the actual deletion of stones
  const deleteStoneHandler = () => {
    const itemsId = isCheck.map(id => {
      const selectedRow = data.items.find(
        (row: { product: Product }) => row.product.id === id
      );
      return selectedRow?.id;
    });

    deleteCart({
      items: itemsId
    })
      .unwrap()
      .then(() => {
        setIsCheck([]);
        setIsCheckAll(false);
        setDialogContent(
          <>
            <div className="max-w-[380px] flex justify-center align-middle">
              <Image src={confirmImage} alt="vector image" />
            </div>
            <div className="max-w-[380px] flex justify-center align-middle text-solitaireTertiary">
              Item successfully deleted from “My Cart”
            </div>
          </>
        );
        setIsDialogOpen(true);
      })
      .catch(error => {
        console.log('error', error);
      });
    setIsDialogOpen(false);
  };

  const handleAppointment = () => {
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
  // Configuration for footer buttons
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
              fn: ''
            },
            {
              label: 'Download Excel',
              fn: downloadExcelFunction
            },
            {
              label: 'Find Matching Pair',
              fn: ''
            },
            {
              label: 'Compare Stone',
              fn: handleCompareStone
            }
          ]}
        />
      )
    },
    {
      id: 2,
      displayButtonLabel: 'Book Appointment',
      style: styles.transparent,
      fn: handleAppointment
    },
    {
      id: 2,
      displayButtonLabel: 'Delete',
      style: styles.transparent,
      fn: handleDelete
    },
    {
      id: 3,
      displayButtonLabel: 'Confirm Stone',
      style: styles.filled,
      fn: () =>
        handleConfirmStone(
          isCheck,
          rows,
          setErrorText,
          setIsError,
          setIsSliderOpen,
          setConfirmStoneData
        )
    }
  ];

  // Handle change in the slider's open state
  const onOpenChange = (open: boolean) => {
    setIsSliderError(false);
    setIsSliderOpen(open);
  };

  // Effect hook to update table columns when they change
  useEffect(() => {
    setTableColumns(cartTableColumns);
  }, [cartTableColumns, setTableColumns]);

  // Effect hook to update rows when cart data changes
  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const activeDiamondItems = data.items
          .filter(
            (item: { product: Product }) =>
              item?.product?.diamond_status === ACTIVE_STATUS
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
      <CustomSlider
        sheetContent={
          <ConfirmStone
            errorState={errorState}
            errorSetState={errorSetState}
            onOpenChange={onOpenChange}
            confirmStoneState={confirmStoneState}
            confirmStoneSetState={confirmStoneSetState}
            listingColumns={cartTableColumns}
            setIsDialogOpen={setIsDialogOpen}
            setDialogContent={setDialogContent}
          />
        }
        sheetContentStyle={styles.diamondDetailSheet}
        isSliderOpen={isSliderOpen}
        onOpenChange={onOpenChange}
      />
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

export default ActiveMyCart;

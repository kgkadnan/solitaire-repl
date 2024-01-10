'use client';

import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import CustomDataTable from '@/components/common/data-table';
import { CustomDropdown } from '@/components/common/dropdown';
import { useDeleteCartMutation } from '@/features/api/cart';
import { ManageLocales } from '@/utils/translate';
import React, { useEffect, useState } from 'react';
import styles from './active-cart.module.scss';
import { CustomFooter } from '@/components/common/footer';
import { NoDataFound } from '@/components/common/no-data-found';
import { CustomSlider } from '@/components/common/slider';
import ConfirmStone from '@/components/common/confirm-stone';
import { ACTIVE_STATUS } from '@/constants/business-logic';
import Image from 'next/image';
import confirmImage from '@public/assets/icons/confirmation.svg';

import { useConfirmStoneStateManagement } from '@/components/common/confirm-stone/hooks/confirm-state-management';
import { handleConfirmStone } from '@/components/common/confirm-stone/helper/handle-confirm';

import { IProductItem } from '../interface';
import { handleCompareStone } from '@/utils/compare-stone';
import { NO_STONES_SELECTED } from '@/constants/error-messages/cart';
import logger from 'logging/log-util';
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

interface IActiveMyCart {
  tableColumns: ITableColumn[];
  refetch: any;
  checkboxState: ICheckboxState;
  checkboxSetState: ICheckboxSetState;
  downloadExcelFunction: () => void;
  errorSetState: IErrorSetState;
  errorState: IErrorState;
  modalSetState: IModalSetState;
  data: any;
  modalState: any;
}

const ActiveMyCart: React.FC<IActiveMyCart> = ({
  tableColumns,
  refetch,
  checkboxState,
  checkboxSetState,
  downloadExcelFunction,
  errorSetState,
  errorState,
  modalSetState,
  data,
  modalState
}) => {
  // State variables for managing component state

  const { isCheck } = checkboxState;
  const { setIsCheck, setIsCheckAll } = checkboxSetState;

  const { isSliderOpen } = modalState;

  const {
    setIsDialogOpen,
    setDialogContent,
    setPersistDialogContent,
    setIsPersistDialogOpen,
    setIsSliderOpen
  } = modalSetState;

  const { confirmStoneState, confirmStoneSetState } =
    useConfirmStoneStateManagement();

  const { isError, errorText } = errorState;
  const { setErrorText, setIsSliderError, setIsError } = errorSetState;

  const { setConfirmStoneData } = confirmStoneSetState;

  const [activeCartRows, setActiveCartRows] = useState([]);

  // Mutation for deleting items from the cart
  const [deleteCart] = useDeleteCartMutation();

  // Data for Custom Data Table checkboxes
  const checkboxData = {
    checkboxState,
    checkboxSetState
  };

  // useEffect to update active tab count when cart data changes
  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const activeDiamondItems = data?.cart?.items
          .filter(
            (item: IProductItem) =>
              item?.product?.diamond_status === ACTIVE_STATUS
          )
          .map((row: IProductItem) => row?.product);

        setActiveCartRows(activeDiamondItems);
      }
    };
    updateRows();
  }, [data]);

  // Handle the deletion of selected stones
  const handleDelete = () => {
    if (isCheck.length) {
      setIsError(false);
      setIsPersistDialogOpen(true);
      setPersistDialogContent(
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
              handleClick={() => setIsPersistDialogOpen(false)}
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
      setErrorText(NO_STONES_SELECTED);
    }
  };

  // Handle the actual deletion of stones
  const deleteStoneHandler = () => {
    setIsPersistDialogOpen(false);
    const activeDiamondItems = data?.cart?.items.filter(
      (item: IProductItem) => item?.product?.diamond_status === ACTIVE_STATUS
    );

    const itemsId = isCheck.map((id: any) => {
      const selectedRow = activeDiamondItems.find(
        (row: IProductItem) => row.product.id === id
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
        logger.error(error);
      });
    setIsDialogOpen(false);
  };

  const handleAppointment = () => {
    setIsError(true);
    setErrorText(NO_STONES_SELECTED);
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
              fn: () =>
                handleCompareStone({
                  isCheck,
                  setIsError,
                  setErrorText,
                  activeCartRows,
                  footerCheck: 'my-cart'
                })
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
          activeCartRows,
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
            listingColumns={tableColumns}
            modalSetState={modalSetState}
            refetch={refetch}
          />
        }
        sheetContentStyle={styles.diamondDetailSheet}
        isSliderOpen={isSliderOpen}
        onOpenChange={onOpenChange}
      />

      {activeCartRows.length > 0 ? (
        <CustomDataTable
          tableRows={activeCartRows}
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
    </>
  );
};

export default ActiveMyCart;

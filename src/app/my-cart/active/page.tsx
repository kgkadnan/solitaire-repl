'use client';

import { ManageListingSequenceResponse } from '@/app/my-account/manage-diamond-sequence/interface';
import { Product, TableColumn } from '@/app/search/result-interface';
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
import { useRouter } from 'next/navigation';
import { NoDataFound } from '@/components/common/no-data-found';
import { CustomSlider } from '@/components/common/slider';
import { CustomInputField } from '@/components/common/input-field';
import ConfirmStone from '@/components/common/confirm-stone';
import {
  CONFIRM_STONE_COMMENT_MAX_CHARACTERS,
  MAX_COMPARE_STONE,
  MAX_DAYS_TO_PAY,
  MIN_COMPARE_STONE,
} from '@/constants/business-logic';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { downloadExcelFromBase64 } from '@/utils/download-excel-from-base64';
import Image from 'next/image';
import confirmImage from '@public/assets/icons/confirmation.svg';

const ActiveMyCart = () => {
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);
  const [rows, setRows] = useState([]);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode>('');

  const [inputError, setInputError] = useState(false);
  const [inputErrorContent, setInputErrorContent] = useState('');
  const [selectedDaysInputValue, setSelectedDaysInputValue] = useState('');
  const [selectedRadioDaysValue, setSelectedRadioDaysValue] =
    useState<string>();
  const [isSliderOpen, setIsSliderOpen] = useState(Boolean);
  const [commentValue, setCommentValue] = useState('');
  const [confirmStoneData, setConfirmStoneData] = useState<Product[]>([]);

  const { data: listingColumns } =
    useGetManageListingSequenceQuery<ManageListingSequenceResponse>({});

  const { data } = useGetCartQuery({});
  const [deleteCart] = useDeleteCartMutation();

  let [downloadExcel] = useDownloadExcelMutation();

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
          .filter((item: any) => item?.product?.diamond_status === 'Active')
          .map((row: any) => row.product);

        setRows(activeDiamondItems);
      }
    };

    updateRows();
  }, [data]);

  const handleCompareStone = () => {
    if (isCheck.length > MAX_COMPARE_STONE) {
      setIsError(true);
      setErrorText(`You can compare a maximum of ${MAX_COMPARE_STONE} stones`);
    } else if (isCheck.length < MIN_COMPARE_STONE) {
      setIsError(true);
      setErrorText(
        `Minimum ${MIN_COMPARE_STONE} stones are required to compare`
      );
    } else {
      const compareStones = isCheck
        .map((id) => data.items.find((row: any) => row.product.id === id))
        .map((stone) => stone.product);

      localStorage.setItem('compareStone', JSON.stringify(compareStones));

      window.open('/compare-stone', '_blank');
    }
  };

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
      );
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
      .catch((error) => {
        console.log('error', error);
      });
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    if (isCheck.length) {
      setIsError(false);
      setErrorText('Please select a stone to perform action.');
      setIsSliderOpen(true);
      const confirmStone = data.items
        .filter((row: any) => isCheck.includes(row.product.id))
        .map((row: any) => row.product);

      setConfirmStoneData(confirmStone);
    } else {
      setIsError(true);
      setErrorText('Please select a stone to perform action.');
    }
  };

  const handleAppointment = () => {
    setIsError(true);
    setErrorText(`You haven't picked any stones.`);
  };
  const handleConfirmStoneRadioChange = (value: string) => {
    setInputError(false);
    setInputErrorContent('');
    setSelectedDaysInputValue('');
    setSelectedRadioDaysValue(value);
  };

  const handleRadioDayValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(event.target.value);

    if (inputValue > MAX_DAYS_TO_PAY) {
      setInputError(true);
      setInputErrorContent('Invalid input.');
      const formattedValue = event.target.value;
      setSelectedDaysInputValue(formattedValue);
    } else if (inputValue) {
      setInputError(false);
      setInputErrorContent('');
      const formattedValue = event.target.value;
      setSelectedDaysInputValue(formattedValue);
    } else if (event.target.value === '') {
      setInputError(false);
      setInputErrorContent('');
      // If the input is empty, clear the state
      setSelectedDaysInputValue('');
    }
  };

  const onFocus = () => {
    handleConfirmStoneRadioChange('other');
  };

  const confirmRadioButtons = [
    {
      name: 'days',
      onChange: handleConfirmStoneRadioChange,
      id: '0',
      value: '7',
      label: '7 Days',
      checked: selectedRadioDaysValue === '7',
    },
    {
      name: 'days',
      onChange: handleConfirmStoneRadioChange,
      id: '1',
      value: '30',
      label: '30 Days',
      checked: selectedRadioDaysValue === '30',
    },
    {
      name: 'days',
      onChange: handleConfirmStoneRadioChange,
      id: '2',
      value: '60',
      label: '60 Days',
      checked: selectedRadioDaysValue === '60',
    },
    {
      name: 'days',
      onChange: handleConfirmStoneRadioChange,
      id: '3',
      value: 'other',
      label: (
        <>
          <div className="flex gap-2">
            <CustomInputField
              name="daysField"
              type="number"
              // disable={selectedRadioDaysValue !== 'other'}
              onChange={handleRadioDayValue}
              value={selectedDaysInputValue}
              placeholder="Max 120 Days"
              style={{ input: 'w-[80px]' }}
              onFocus={onFocus}
            />
            <div>Days</div>
          </div>
          {inputError ? <div>{inputErrorContent}</div> : ''}
        </>
      ),
      checked: selectedRadioDaysValue === 'other',
    },
  ];

  const handleComment = (event: any) => {
    let inputValue = event.target.value;
    if (inputValue.length <= CONFIRM_STONE_COMMENT_MAX_CHARACTERS) {
      setCommentValue(inputValue);
    }
  };

  const performDownloadExcel = (
    productIds: any[],
    isEntireSearch?: boolean
  ) => {
    if (isEntireSearch) {
      console.log('isEntireSearch', isEntireSearch);
    } else {
      downloadExcel({ productIds })
        .unwrap()
        .then((res) => {
          let { data, fileName } = res;
          if (data) {
            downloadExcelFromBase64(data, fileName);
            setDialogContent(
              <>
                <div className="max-w-[380px] flex justify-center align-middle">
                  <Image src={confirmImage} alt="vector image" />
                </div>
                <div className="max-w-[380px] flex justify-center align-middle text-solitaireTertiary">
                  Download Excel Successfully
                </div>
              </>
            );
            setIsDialogOpen(true);
          }
        })
        .catch((e) => {
          console.log('error', e);
        });
    }
    setIsCheck([]);
    setIsCheckAll(false);
    setIsError(false);
  };

  //download Excel
  const downloadExcelFunction = () => {
    if (isCheckAll) {
      setIsDialogOpen(true);
      setDialogContent(
        <>
          <div className="max-w-[330px] flex justify-center text-center align-middle text-solitaireTertiary">
            Do you want to all the stones available in search or just selected
            stones!
          </div>
          <div className="max-w-[400px] flex justify-around align-middle text-solitaireTertiary">
            <CustomDisplayButton
              displayButtonLabel="Selected"
              handleClick={() => {
                setIsDialogOpen(false);
                performDownloadExcel(isCheck);
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonTransparent,
              }}
            />
            <CustomDisplayButton
              displayButtonLabel="All"
              handleClick={() => {
                setIsDialogOpen(false);
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonFilled,
              }}
            />
          </div>
        </>
      );
    } else if (isCheck.length === 0) {
      setIsError(true);
      setErrorText('Please select a stone to perform action.');
    } else if (isCheck.length) {
      performDownloadExcel(isCheck);
    }
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
              fn: downloadExcelFunction,
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

  const onOpenChange = (open: boolean) => {
    setIsSliderOpen(open);
  };

  return (
    <>
      <CustomSlider
        sheetContent={
          <ConfirmStone
            confirmStoneData={confirmStoneData}
            listingColumns={listingColumns}
            confirmRadioButtons={confirmRadioButtons}
            commentValue={commentValue}
            handleComment={handleComment}
            setInputError={setInputError}
            setInputErrorContent={setInputErrorContent}
            setSelectedDaysInputValue={setSelectedDaysInputValue}
            onOpenChange={onOpenChange}
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

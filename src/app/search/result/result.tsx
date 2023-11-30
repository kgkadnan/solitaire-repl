/* The above code is a TypeScript React component called "SearchResults". It is responsible for
rendering and managing the search results page. */
'use client';
import styles from './search-results.module.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { CustomSlider } from '@/components/common/slider';
import CustomDataTable from '@/components/common/data-table';
import { CustomDialog } from '@/components/common/dialog';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { Product, TableColumn } from './result-interface';
import { useAddSavedSearchMutation } from '@/features/api/saved-searches';
import { CustomInputDialog } from '@/components/common/input-dialog';
import CustomLoader from '@/components/common/loader';
import { CustomInputField } from '@/components/common/input-field';
import ConfirmStone from '@/components/common/confirm-stone';
import { CONFIRM_STONE_COMMENT_MAX_CHARACTERS } from '@/constants/business-logic';
import { UseSortByStateManagement } from './hooks/sort-by-state-management';
import { UseErrorStateManagement } from './hooks/error-state-management';
import { UseConfirmStoneStateManagement } from './hooks/confirm-stone-state-management';
import { UseCheckboxStateManagement } from './hooks/checkbox-state-management';
import { UseModalStateManagement } from './hooks/modal-state-management';
import { UseCommonDtateManagement } from './hooks/common-state-management';
import { ResultHeader } from './components/Result-header';
import { ResultFooter } from './components/result-footer';
// Define a type for the radio state

const SearchResults = ({ data, activeTab, refetch: refetchRow }: any) => {
  const { sortByState } = UseSortByStateManagement();

  const { refetchDataToDefault } = sortByState;

  const { errorState, errorSetState } = UseErrorStateManagement();
  const { inputError, inputErrorContent } = errorState;
  const { setIsError, setErrorText, setInputError, setInputErrorContent } =
    errorSetState;

  const { confirmStoneState, confirmStoneSetState } =
    UseConfirmStoneStateManagement();
  const {
    confirmStoneData,
    commentValue,
    selectedDaysInputValue,
    selectedRadioDaysValue,
  } = confirmStoneState;
  const {
    setConfirmStoneData,
    setCommentValue,
    setSelectedDaysInputValue,
    setSelectedRadioDaysValue,
  } = confirmStoneSetState;

  const { checkboxState, checkboxSetState } = UseCheckboxStateManagement();
  const { isCheck, isCheckAll } = checkboxState;
  const { setIsCheck, setIsCheckAll } = checkboxSetState;

  const { modalState, modalSetState } = UseModalStateManagement();
  const { dialogContent, isDialogOpen, isInputDialogOpen, isSliderOpen } =
    modalState;
  const { setIsDialogOpen, setIsInputDialogOpen, setIsSliderOpen } =
    modalSetState;

  const { commonSetState } = UseCommonDtateManagement();
  const { setYourSelectionData, setTotalAmount, setAverageDiscount } =
    commonSetState;

  const [rows, setRows] = useState<Product[]>([]);
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);
  const [saveSearchName, setSaveSearchName] = useState<string>('');

  let [addSavedSearch] = useAddSavedSearchMutation();
  const { data: listingColumns } = useGetManageListingSequenceQuery({});

  /**
   * The handleClick function updates the isCheck state based on the clicked id and also updates the
   * isCheckAll state if all rows are selected.
   * @param {string} id - The `id` parameter is a string that represents the identifier of an item.
   */
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

  /**
   * The function `handleSelectAllCheckbox` toggles the `isCheckAll` state and updates the `isCheck`
   * state based on the `rows` array.
   */
  const handleSelectAllCheckbox = () => {
    setIsCheckAll(!isCheckAll);

    setIsCheck(rows?.map((li: Product) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  /* The above code is defining an object called `checkboxData` with four properties:
`handleSelectAllCheckbox`, `handleClick`, `isCheck`, and `isCheckAll`. These properties are likely
used in a React component to handle checkbox functionality. */
  let checkboxData = {
    handleSelectAllCheckbox: handleSelectAllCheckbox,
    handleClick: handleClick,
    isCheck: isCheck,
    isCheckAll: isCheckAll,
  };

  /* The above code is using the `useEffect` hook in a React component. It is setting the state variable
`tableColumns` to the value of `listingColumns` when `listingColumns` changes. */
  useEffect(() => {
    setTableColumns(listingColumns);
  }, [listingColumns]);
  /* useEffect hook in a TypeScript React component. It is used to
handle the logic for closing a dialog box after a certain delay. */
  useEffect(() => {
    if (isDialogOpen) {
      // Set a timeout to close the dialog box after a delay (e.g., 3000 milliseconds)
      const timeoutId = setTimeout(() => {
        setIsDialogOpen(false);
      }, 3000);

      // Cleanup the timeout when the component unmounts or when isDialogOpen changes
      return () => clearTimeout(timeoutId);
    }
  }, [isDialogOpen]);

  /**
   * The function `handleConfirm` checks if any selected stones have a status of "MemoOut" and displays
   * an error message if so, otherwise it opens a slider and sets the selected stones data.
   * @param {string[]} [isCheck] - An optional array of strings representing the IDs of the stones that
   * are being checked.
   */
  const handleConfirm = (isCheck?: string[]) => {
    let hasMemoOut = isCheck?.some((id) => {
      return rows.some(
        (row) => row.id == id && row.diamond_status === 'MemoOut'
      );
    });

    if (hasMemoOut) {
      setErrorText(
        'Some stones in your selection are not available, Please modify your selection.'
      );
      setIsError(true);
    } else if (isCheck?.length) {
      setIsError(false);
      setErrorText('Please select a stone to perform action.');
      setIsSliderOpen(true);
      const confirmStone = rows.filter((item) => isCheck?.includes(item.id));
      setConfirmStoneData(confirmStone);
    } else {
      setIsError(true);
      setErrorText('Please select a stone to perform action.');
    }
  };

  /**
   * The function `handleComment` updates the comment value based on the input value, but only if the
   * input value is within a certain character limit.
   * @param event - The event parameter is of type React.ChangeEvent<HTMLInputElement>. It represents the
   * event that occurred, such as a change in the input value of an HTML input element.
   */
  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    if (inputValue.length <= CONFIRM_STONE_COMMENT_MAX_CHARACTERS) {
      setCommentValue(inputValue);
    }
  };

  /* The above code is defining a function called `calculateTotalAmount` using the `useCallback` hook in
React. This function calculates the total amount based on the selected rows and their corresponding
variants' prices. */
  const calculateTotalAmount = useCallback(() => {
    let total = 0;

    isCheck.forEach((id) => {
      const selectedRow = rows.find((row) => row.id === id);
      if (selectedRow) {
        const variant = selectedRow.variants.find(
          (variant) => variant.prices.length > 0
        );
        if (variant) {
          total += variant.prices[0].amount;
        }
      }
    });

    return total;
  }, [isCheck, rows]);

  /* The above code is a TypeScript React function called `calculateAverageDiscount`. It calculates the
average discount of selected rows based on the `isCheck` array and `rows` array. */
  const calculateAverageDiscount = useCallback(() => {
    let totalDiscount = 0;
    isCheck.forEach((id) => {
      const selectedRow = rows.find((row) => row.id === id);
      if (selectedRow) {
        totalDiscount += selectedRow?.discount;
      }
    });
    // Calculate average discount
    const avgDiscount = isCheck.length > 0 ? totalDiscount / isCheck.length : 0;
    return avgDiscount;
  }, [isCheck, rows]);

  /* The above code is using the useEffect hook in a React component. It is setting up a side effect that
will be triggered whenever the value of the "isCheck" variable changes. */
  useEffect(() => {
    // Update total amount and average discount whenever isCheck changes
    setTotalAmount(calculateTotalAmount());
    setAverageDiscount(calculateAverageDiscount());
  }, [calculateTotalAmount, calculateAverageDiscount]);

  /* The above code is using the useEffect hook in a React component. It is triggered whenever the `data`
variable changes. */
  useEffect(() => {
    let selection = localStorage.getItem('Search');
    if (selection) {
      let yourSelection = JSON.parse(selection);
      setYourSelectionData(yourSelection);
      if (data?.products?.length) {
        setIsCheck([]);
        setIsCheckAll(false);
        setRows(data?.products);
      }
    }
  }, [data, refetchDataToDefault]);

  /**
   * The function `handleConfirmStoneRadioChange` updates various state values based on the selected
   * radio button value.
   * @param {string} value - The value parameter is a string that represents the selected value from a
   * radio button.
   */
  const handleConfirmStoneRadioChange = (value: string) => {
    setInputError(false);
    setInputErrorContent('');
    setSelectedDaysInputValue('');
    setSelectedRadioDaysValue(value);
  };

  /**
   * The function handles the change event of a radio input and updates the state based on the input
   * value.
   * @param event - The event parameter is of type React.ChangeEvent<HTMLInputElement>. It represents the
   * event that occurred when the radio button value is changed.
   */
  const handleRadioDayValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(event.target.value);
    if (inputValue >= 121) {
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

  /**
   * The onFocus function calls the handleConfirmStoneRadioChange function with the argument 'other'.
   */
  const onFocus = () => {
    handleConfirmStoneRadioChange('other');
  };

  /* The above code is defining an array of radio button objects for a form in a TypeScript React
 component. Each radio button object has properties such as name, onChange event handler, id, value,
 label, and checked. The radio buttons are used to select a duration (7 days, 30 days, 60 days, or a
 custom value) and update the selected value in the component's state. The last radio button has a
 custom label that includes an input field for entering a custom number of days. */
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
          {inputError ? (
            <div className="h-[10px] text-[#983131]">{inputErrorContent}</div>
          ) : (
            <div className="h-[10px]" />
          )}
        </>
      ),
      checked: selectedRadioDaysValue === 'other',
    },
  ];

  /**
   * The function `handleSaveSearch` saves search data to localStorage and updates the state with the
   * saved search information.
   */
  const handleSaveSearch = async () => {
    // Retrieve the array from localStorage
    const searchData = localStorage.getItem('Search');

    if (searchData !== null) {
      const parseData = JSON.parse(searchData) || [];

      await addSavedSearch({
        name: saveSearchName,
        diamond_count: parseInt(data?.count),
        meta_data: parseData[activeTab].queryParams,
        is_deleted: false,
      })
        .unwrap()
        .then((res: any) => {
          parseData[activeTab] = {
            id: res?.id,
            saveSearchName,
            isSavedSearch: true,
            queryParams: parseData[activeTab].queryParams,
          };
          localStorage.setItem('Search', JSON.stringify(parseData));
          setYourSelectionData(parseData);
          setIsInputDialogOpen(false);
          setSaveSearchName('');
        })

        .catch((error: any) => {
          console.log('error', error);
          setInputError(true);
          setInputErrorContent(
            'Title already exists. Choose another title to save your search'
          );
        });
    }
  };

  const customInputDialogData = {
    isOpens: isInputDialogOpen,
    setIsOpen: setIsInputDialogOpen,
    setInputvalue: setSaveSearchName,
    inputValue: saveSearchName,
    displayButtonFunction: handleSaveSearch,
    label: 'Save And Search',
    name: 'save',
    displayButtonLabel2: 'Save',
  };

  /**
   * The function handleCloseInputDialog is used to close an input dialog and reset related state
   * variables.
   */
  const handleCloseInputDialog = () => {
    setIsInputDialogOpen(false);
    setInputError(false);
    setInputErrorContent('');
    setSaveSearchName('');
  };

  /**
   * The function `onOpenChange` updates the state variables `isSliderOpen` and `selectedRadioDaysValue`
   * based on the value of the `open` parameter.
   * @param {boolean} open - The open parameter is a boolean value that indicates whether the slider is
   * open or closed.
   */
  const onOpenChange = (open: boolean) => {
    setIsSliderOpen(open);
    setSelectedRadioDaysValue('');
  };

  return (
    <>
      <CustomSlider
        sheetContent={
          <ConfirmStone
            inputError={inputError}
            onOpenChange={onOpenChange}
            commentValue={commentValue}
            handleComment={handleComment}
            setInputError={setInputError}
            listingColumns={listingColumns}
            confirmStoneData={confirmStoneData}
            confirmRadioButtons={confirmRadioButtons}
            setInputErrorContent={setInputErrorContent}
            selectedRadioDaysValue={selectedRadioDaysValue}
            selectedDaysInputValue={selectedDaysInputValue}
            setSelectedDaysInputValue={setSelectedDaysInputValue}
          />
        }
        isSliderOpen={isSliderOpen}
        onOpenChange={onOpenChange}
        sheetContentStyle={styles.diamondDetailSheet}
      />
      <CustomInputDialog
        isError={inputError}
        setIsError={setInputError}
        errorContent={inputErrorContent}
        handleClose={handleCloseInputDialog}
        setErrorContent={setInputErrorContent}
        customInputDialogData={customInputDialogData}
      />
      <CustomDialog
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        dialogContent={dialogContent}
      />

      <ResultHeader
        activeTab={activeTab}
        data={data}
        rows={rows}
        tableColumns={tableColumns}
        setRows={setRows}
      />

      {rows?.length && tableColumns?.length ? (
        <CustomDataTable
          tableRows={rows}
          tableColumns={tableColumns}
          checkboxData={checkboxData}
          mainTableStyle={styles.tableWrapper}
          handleConfirm={handleConfirm}
        />
      ) : (
        <CustomLoader />
      )}

      <ResultFooter rows={rows} refetchRow={refetchRow} />
    </>
  );
};

export default SearchResults;

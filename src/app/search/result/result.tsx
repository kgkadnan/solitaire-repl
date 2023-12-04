/* The above code is a TypeScript React component called "SearchResults". It is responsible for
rendering and managing the search results page. */
'use client';
import styles from './search-results.module.scss';
import React, { useCallback, useEffect } from 'react';
import { CustomSlider } from '@/components/common/slider';
import CustomDataTable from '@/components/common/data-table';
import { CustomDialog } from '@/components/common/dialog';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { useAddSavedSearchMutation } from '@/features/api/saved-searches';
import { CustomInputDialog } from '@/components/common/input-dialog';
import CustomLoader from '@/components/common/loader';
import ConfirmStone from '@/components/common/confirm-stone';
import { ResultFooter } from './components/result-footer';
import { ResultHeader } from './components/result-header';
import { useSortByStateManagement } from './hooks/sort-by-state-management';
import { useErrorStateManagement } from './hooks/error-state-management';
import { useModalStateManagement } from './hooks/modal-state-management';
import { useCommonDtateManagement } from './hooks/common-state-management';
import { useConfirmStoneStateManagement } from '@/components/common/confirm-stone/hooks/confirm-state-management';
import { useDataTableStateManagement } from '@/components/common/data-table/hooks/data-table-state-management';
import { useCheckboxStateManagement } from '@/components/common/checkbox/hooks/checkbox-state-management';
// Define a type for the radio state

const SearchResults = ({ data, activeTab, refetch: refetchRow }: any) => {
  const { sortByState, sortBySetState } = useSortByStateManagement();
  const { errorState, errorSetState } = useErrorStateManagement();
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { confirmStoneState, confirmStoneSetState } =
    useConfirmStoneStateManagement();
  const { modalState, modalSetState } = useModalStateManagement();
  const { commonSetState, commonState } = useCommonDtateManagement();
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();

  const { rows, tableColumns } = dataTableState;
  const { setRows, setTableColumns } = dataTableSetState;

  const { refetchDataToDefault } = sortByState;
  const { inputError, inputErrorContent } = errorState;
  const { setIsError, setErrorText, setInputError, setInputErrorContent } =
    errorSetState;

  const { setConfirmStoneData, setSelectedRadioDaysValue } =
    confirmStoneSetState;
  const { isCheck } = checkboxState;
  const { setIsCheck, setIsCheckAll } = checkboxSetState;
  const { dialogContent, isDialogOpen, isInputDialogOpen, isSliderOpen } =
    modalState;
  const {
    setIsDialogOpen,
    setIsInputDialogOpen,
    setIsSliderOpen,
    setDialogContent,
  } = modalSetState;
  const {
    setYourSelectionData,
    setTotalAmount,
    setAverageDiscount,
    setSaveSearchName,
  } = commonSetState;

  const { saveSearchName } = commonState;

  let [addSavedSearch] = useAddSavedSearchMutation();
  const { data: listingColumns } = useGetManageListingSequenceQuery({});

  /* The above code is defining an object called `checkboxData` with four properties:
`handleSelectAllCheckbox`, `handleClick`, `isCheck`, and `isCheckAll`. These properties are likely
used in a React component to handle checkbox functionality. */
  // Data for Custom Data Table checkboxes
  let checkboxData = {
    checkboxState,
    checkboxSetState,
    setIsError,
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
  const handleConfirm = (isCheck: string[]) => {
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
    setIsError(false);
    setIsSliderOpen(open);
    setSelectedRadioDaysValue('');
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
            listingColumns={listingColumns}
            setIsDialogOpen={setIsDialogOpen}
            setDialogContent={setDialogContent}
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
        checkboxState={checkboxState}
        modalSetState={modalSetState}
        commonSetState={commonSetState}
        commonState={commonState}
        sortBySetState={sortBySetState}
        sortByState={sortByState}
        dataTableState={dataTableState}
        dataTableSetState={dataTableSetState}
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

      <ResultFooter
        rows={rows}
        refetchRow={refetchRow}
        modalSetState={modalSetState}
        checkboxState={checkboxState}
        checkboxSetState={checkboxSetState}
        errorSetState={errorSetState}
        errorState={errorState}
        confirmStoneSetState={confirmStoneSetState}
      />
    </>
  );
};

export default SearchResults;

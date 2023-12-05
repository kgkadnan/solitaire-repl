/* The above code is a TypeScript React component called "SearchResults". It is responsible for
rendering and managing the search results page. */
'use client';
import styles from './search-results.module.scss';
import React, { useEffect } from 'react';
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
import { useErrorStateManagement } from '../../../hooks/error-state-management';
import { useModalStateManagement } from '../../../hooks/modal-state-management';
import { useCommonDtateManagement } from './hooks/common-state-management';
import { useConfirmStoneStateManagement } from '@/components/common/confirm-stone/hooks/confirm-state-management';
import { useDataTableStateManagement } from '@/components/common/data-table/hooks/data-table-state-management';
import { useCheckboxStateManagement } from '@/components/common/checkbox/hooks/checkbox-state-management';
import { handleSaveSearch } from './helpers/handle-save-search';
import { calculateTotalAmount } from './helpers/calculate-total-amount';
import { calculateAverageDiscount } from './helpers/calculate-average-discount';
import { ISearchResultsProps } from './result-interface';
// Define a type for the radio state

const SearchResults = ({
  data,
  activeTab,
  refetch: refetchRow,
}: ISearchResultsProps) => {
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
  const { setInputError, setInputErrorContent, setIsSliderError } =
    errorSetState;

  const { setSelectedRadioDaysValue } = confirmStoneSetState;
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

  let checkboxData = {
    checkboxState,
    checkboxSetState,
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

  useEffect(() => {
    // Update total amount and average discount whenever isCheck changes
    setTotalAmount(calculateTotalAmount({ isCheck, rows }));
    setAverageDiscount(calculateAverageDiscount({ isCheck, rows }));
  }, [isCheck]);

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

  const customInputDialogData = {
    isOpens: isInputDialogOpen,
    setIsOpen: setIsInputDialogOpen,
    setInputvalue: setSaveSearchName,
    inputValue: saveSearchName,
    displayButtonFunction: () => {
      handleSaveSearch({
        addSavedSearch,
        saveSearchName,
        activeTab,
        data,
        setYourSelectionData,
        setIsInputDialogOpen,
        setSaveSearchName,
        setInputError,
        setInputErrorContent,
      });
    },
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
    setIsSliderError(false);
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
          errorSetState={errorSetState}
          confirmStoneSetState={confirmStoneSetState}
          modalSetState={modalSetState}
          modalState={modalState}
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

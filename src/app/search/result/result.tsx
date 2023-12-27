/* The above code is a TypeScript React component called 'SearchResults'. It is responsible for
rendering and managing the search results page. */
'use client';
import styles from './search-results.module.scss';
import React, { useEffect } from 'react';
import { CustomSlider } from '@/components/common/slider';
import CustomDataTable from '@/components/common/data-table';
import { CustomDialog } from '@/components/common/dialog';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { useAddSavedSearchMutation } from '@/features/api/saved-searches';
import CustomLoader from '@/components/common/loader';
import ConfirmStone from '@/components/common/confirm-stone';
import { ResultFooter } from './components/result-footer';
import { ResultHeader } from './components/result-header';
import { useSortByStateManagement } from './hooks/sort-by-state-management';
import { useErrorStateManagement } from '../../../hooks/error-state-management';
import { useModalStateManagement } from '../../../hooks/modal-state-management';
import { useCommonStateManagement } from './hooks/common-state-management';
import { useConfirmStoneStateManagement } from '@/components/common/confirm-stone/hooks/confirm-state-management';
import { useDataTableStateManagement } from '@/components/common/data-table/hooks/data-table-state-management';
import { useCheckboxStateManagement } from '@/components/common/checkbox/hooks/checkbox-state-management';
import { handleSaveSearch } from './helpers/handle-save-search';
import { calculateTotal } from './helpers/product-total-calculations';
import { calculateAverage } from './helpers/average-calculations';
import { ISearchResultsProps } from './result-interface';
import { CustomModal } from '@/components/common/modal';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { ManageLocales } from '@/utils/translate';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { CustomInputDialog } from '@/components/common/input-dialogNew';
// Define a type for the radio state

const SearchResults = ({
  searchUrl,
  data,
  activeTab,
  refetch: refetchRow
}: ISearchResultsProps) => {
  const { sortByState, sortBySetState } = useSortByStateManagement();
  const { errorState, errorSetState } = useErrorStateManagement();
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { confirmStoneState, confirmStoneSetState } =
    useConfirmStoneStateManagement();
  const { modalState, modalSetState } = useModalStateManagement();
  const { commonSetState, commonState } = useCommonStateManagement();
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
  const {
    dialogContent,
    isDialogOpen,
    isInputDialogOpen,
    isSliderOpen,
    isModalOpen,
    modalContent,
    persistDialogContent,
    isPersistDialogOpen
  } = modalState;
  const {
    setIsDialogOpen,
    setIsInputDialogOpen,
    setIsSliderOpen,
    setDialogContent,
    setIsModalOpen,
    setIsPersistDialogOpen
  } = modalSetState;
  const {
    setYourSelectionData,
    setTotalAmount,
    setAverageDiscount,
    setSaveSearchName,
    setProductTotalCarats,
    setAveragePricePerCarat
  } = commonSetState;

  const { saveSearchName } = commonState;

  const [addSavedSearch] = useAddSavedSearchMutation();
  const { data: listingColumns } = useGetManageListingSequenceQuery({});

  const checkboxData = {
    checkboxState,
    checkboxSetState
  };

  /* The above code is using the `useEffect` hook in a React component. It is setting the state variable
`tableColumns` to the value of `listingColumns` when `listingColumns` changes. */
  useEffect(() => {
    setTableColumns(listingColumns);
  }, [listingColumns, setTableColumns]);
  /* useEffect hook in a TypeScript React component. It is used to
handle the logic for closing a dialog box after a certain delay. */
  // useEffect(() => {
  //   if (isDialogOpen) {
  //     // Set a timeout to close the dialog box after a delay (e.g., 5000 milliseconds)
  //     const timeoutId = setTimeout(() => {
  //       setIsDialogOpen(false);
  //     }, 3500);

  //     // Cleanup the timeout when the component unmounts or when isDialogOpen changes
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [isDialogOpen, setIsDialogOpen]);

  useEffect(() => {
    // Update total amount and average discount whenever isCheck changes
    setTotalAmount(calculateTotal({ isCheck, rows, type: 'amount' }));
    setAveragePricePerCarat(
      calculateAverage({ isCheck, rows, property: 'price_per_carat' })
    );
    setAverageDiscount(
      calculateAverage({ isCheck, rows, property: 'discount' })
    );
    setProductTotalCarats(calculateTotal({ isCheck, rows, type: 'carat' }));
  }, [
    isCheck,
    rows,
    calculateTotal,
    calculateAverage,
    setAverageDiscount,
    setTotalAmount
  ]);

  /* The above code is using the useEffect hook in a React component. It is triggered whenever the `data`
variable changes. */
  useEffect(() => {
    const selection = localStorage.getItem('Search');
    if (selection) {
      const yourSelection = JSON.parse(selection);
      setYourSelectionData(yourSelection);
      if (data?.products?.length) {
        setIsCheck([]);
        setIsCheckAll(false);
        setRows(data?.products);
      }
    }
  }, [
    data,
    refetchDataToDefault,
    setIsCheck,
    setIsCheckAll,
    setRows,
    setYourSelectionData
  ]);

  const handleInputChange = (e: any) => {
    setInputErrorContent('');
    setSaveSearchName(e.target.value);
  };

  const renderContentWithInput = () => {
    return (
      <div className="w-full flex flex-col gap-6">
        <div className=" flex justify-center align-middle items-center">
          <p>Save Search</p>
        </div>
        <div className="flex text-center gap-6 w-[350px]">
          <FloatingLabelInput
            label={'Enter name'}
            onChange={handleInputChange}
            type="text"
            name="save"
            value={saveSearchName}
            errorText={inputErrorContent}
          />
        </div>

        <div className="flex  gap-2">
          {/* Button to trigger the register action */}

          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.advanceSearch.cancel')}
            displayButtonAllStyle={{
              displayButtonStyle:
                ' bg-transparent   border-[1px] border-solitaireQuaternary  w-[80%] h-[40px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[16px] font-medium'
            }}
            handleClick={() => {
              setSaveSearchName('');
              setInputErrorContent('');
              setIsInputDialogOpen(false);
            }}
          />
          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.advanceSearch.save')}
            displayButtonAllStyle={{
              displayButtonStyle: 'bg-solitaireQuaternary w-[80%] h-[40px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[16px] font-medium'
            }}
            handleClick={() => {
              if (!saveSearchName.length) {
                setInputErrorContent('Please enter name');
              } else {
                handleSaveSearch({
                  addSavedSearch,
                  saveSearchName,
                  activeTab,
                  data,
                  setYourSelectionData,
                  setIsInputDialogOpen,
                  setSaveSearchName,
                  setInputError,
                  setInputErrorContent
                });
              }
            }}
          />
        </div>
      </div>
    );
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
            modalSetState={modalSetState}
          />
        }
        isSliderOpen={isSliderOpen}
        onOpenChange={onOpenChange}
        sheetContentStyle={styles.diamondDetailSheet}
      />
      <CustomInputDialog
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
      />
      <CustomDialog
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        dialogContent={dialogContent}
      />
      <CustomDialog
        isOpens={isPersistDialogOpen}
        setIsOpen={setIsPersistDialogOpen}
        dialogContent={persistDialogContent}
      />
      <CustomModal
        isOpens={isModalOpen}
        setIsOpen={setIsModalOpen}
        dialogContent={modalContent}
        modalStyle={styles.modalStyle}
      />

      {searchUrl && rows?.length && tableColumns?.length ? (
        <>
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
          <CustomDataTable
            tableRows={rows}
            tableColumns={tableColumns}
            checkboxData={checkboxData}
            mainTableStyle={styles.tableWrapper}
            errorSetState={errorSetState}
            confirmStoneSetState={confirmStoneSetState}
            modalSetState={modalSetState}
          />
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
      ) : (
        <CustomLoader />
      )}
    </>
  );
};

export default SearchResults;

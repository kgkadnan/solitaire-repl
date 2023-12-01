import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import React from 'react';
import SortBy from './sort-by';
import { ManageLocales } from '@/utils/translate';
import { useUpdateSavedSearchMutation } from '@/features/api/saved-searches';
import { IResultHeaderProps } from '../result-interface';

export const ResultHeader: React.FC<IResultHeaderProps> = ({
  activeTab,
  data,
  checkboxState,
  modalSetState,
  commonSetState,
  commonState,
  sortBySetState,
  sortByState,
}) => {
  const [updateSavedSearch] = useUpdateSavedSearchMutation();

  const { isCheck } = checkboxState;

  const { setIsInputDialogOpen } = modalSetState;

  const {
    yourSelectionData,
    totalAmount,
    averageDiscount,
    rows,
    tableColumns,
  } = commonState;
  const { setYourSelectionData, setRows } = commonSetState;

  /**
   * The function `handleUpdateSaveSearch` updates the save search data in local storage and calls the
   * `updateSavedSearch` function.
   */
  const handleUpdateSaveSearch = () => {
    let yourSelection = JSON.parse(localStorage.getItem('Search')!);

    let updateSaveSearchData = {
      id: yourSelection[activeTab]?.id,
      name: yourSelection[activeTab]?.saveSearchName,
      meta_data: yourSelection[activeTab]?.queryParams,
      diamond_count: parseInt(data?.count),
    };

    yourSelection[activeTab] = {
      id: yourSelection[activeTab]?.id,
      saveSearchName: yourSelection[activeTab]?.saveSearchName,
      isSavedSearch: true,
      queryParams: yourSelection[activeTab].queryParams,
    };
    localStorage.setItem('Search', JSON.stringify(yourSelection));
    setYourSelectionData(yourSelection);
    updateSavedSearch(updateSaveSearchData);
  };

  return (
    <div className="mb-2 mt-[-40px]">
      {/* Count Bar  */}
      <div className="flex justify-between items-center h-7">
        <div className="flex gap-3">
          <p>
            {ManageLocales('app.searchResult.countBar.pieces')}:
            <span className="text-solitaireTertiary ml-[5px]">
              {`${isCheck.length}/${
                rows?.length && tableColumns?.length && data?.count
                  ? data?.count
                  : 0
              }`}
            </span>
          </p>
          <p>
            {ManageLocales('app.searchResult.countBar.totalAvgDis')}:
            <span className="text-solitaireTertiary ml-[5px]">
              {averageDiscount.toFixed(2)}
            </span>
          </p>
          <p>
            {ManageLocales('app.searchResult.countBar.totalAmount')}:
            <span className="text-solitaireTertiary ml-[5px]">
              ${totalAmount.toFixed(2)}
            </span>
          </p>
        </div>
        <div className="flex gap-6">
          {yourSelectionData && !yourSelectionData[activeTab]?.isSavedSearch ? (
            <CustomDisplayButton
              displayButtonLabel={'Save this search'}
              handleClick={() =>
                yourSelectionData[activeTab].saveSearchName.length
                  ? handleUpdateSaveSearch()
                  : setIsInputDialogOpen(true)
              }
              displayButtonAllStyle={{
                displayLabelStyle: `text-solitaireTertiary cursor-pointer`,
              }}
            />
          ) : (
            ''
          )}

          <SortBy
            rows={rows}
            setRows={setRows}
            sortBySetState={sortBySetState}
            sortByState={sortByState}
          />
        </div>
      </div>
    </div>
  );
};

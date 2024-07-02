import { Dispatch, SetStateAction } from 'react';

/**
 * The function `handleSaveSearch` saves search data to localStorage and updates the state with the
 * saved search information.
 */

export interface IHandleSaveSearch {
  addSavedSearch: any;
  saveSearchName: string;
  activeTab: number;
  data: any;
  setStoredSelection: Dispatch<SetStateAction<any>>;
  setIsInputDialogOpen: Dispatch<SetStateAction<boolean>>;
  setSaveSearchName: Dispatch<SetStateAction<string>>;
  setInputError: Dispatch<SetStateAction<string>>;
  isMatchingPair?: boolean;
}

export const handleSaveSearch = async ({
  addSavedSearch,
  saveSearchName,
  activeTab,
  data,
  setIsInputDialogOpen,
  setSaveSearchName,
  setInputError,
  setStoredSelection,
  isMatchingPair
}: IHandleSaveSearch) => {
  // Retrieve the array from localStorage
  const searchData = isMatchingPair
    ? localStorage.getItem('MatchingPair')
    : localStorage.getItem('Search');

  if (searchData !== null) {
    const parseData = JSON.parse(searchData) || [];

    await addSavedSearch({
      name: saveSearchName,
      diamond_count: parseInt(data?.count),
      meta_data: parseData[activeTab - 1].queryParams,
      is_deleted: false
    })
      .unwrap()
      .then((res: any) => {
        parseData[activeTab - 1] = {
          id: res?.id,
          saveSearchName,
          isSavedSearch: true,
          searchId: data?.search_id,
          queryParams: parseData[activeTab - 1].queryParams
        };
        localStorage.setItem('Search', JSON.stringify(parseData));
        setStoredSelection(parseData);
        setIsInputDialogOpen(false);
        setSaveSearchName('');
      })

      .catch((error: any) => {
        setInputError(error.data.message);
      });
  }
};

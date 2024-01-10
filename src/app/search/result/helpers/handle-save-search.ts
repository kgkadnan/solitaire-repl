import { TITLE_ALREADY_EXISTS } from '@/constants/error-messages/search';
import { IHandleSaveSearch } from '../result-interface';

/**
 * The function `handleSaveSearch` saves search data to localStorage and updates the state with the
 * saved search information.
 */
export const handleSaveSearch = async ({
  addSavedSearch,
  saveSearchName,
  activeTab,
  data,
  setYourSelectionData,
  setIsInputDialogOpen,
  setSaveSearchName,
  setInputError,
  setInputErrorContent
}: IHandleSaveSearch) => {
  // Retrieve the array from localStorage
  const searchData = localStorage.getItem('Search');

  if (searchData !== null) {
    const parseData = JSON.parse(searchData) || [];

    await addSavedSearch({
      name: saveSearchName,
      diamond_count: parseInt(data?.count),
      meta_data: parseData[activeTab].queryParams,
      is_deleted: false
    })
      .unwrap()
      .then((res: any) => {
        parseData[activeTab] = {
          id: res?.id,
          saveSearchName,
          isSavedSearch: true,
          searchId: data?.search_id,
          queryParams: parseData[activeTab].queryParams
        };
        localStorage.setItem('Search', JSON.stringify(parseData));
        setYourSelectionData(parseData);
        setIsInputDialogOpen(false);
        setSaveSearchName('');
      })

      .catch(() => {
        setInputError(true);
        setInputErrorContent(TITLE_ALREADY_EXISTS);
      });
  }
};

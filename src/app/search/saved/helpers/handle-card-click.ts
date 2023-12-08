import { constructUrlParams } from '@/utils/construct-url-param';
import { ISavedSearchData } from '../saved-interface';
import {
  MAX_SAVED_SEARCH_COUNT,
  MAX_SEARCH_TAB_LIMIT
} from '@/constants/business-logic';
import { SEARCH_RESULT } from '@/constants/application-constants/search-page';

export const handleCardClick = (
  id: string,
  savedSearchData: ISavedSearchData[],
  setSearchUrl: React.Dispatch<React.SetStateAction<string>>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorText: React.Dispatch<React.SetStateAction<string>>,
  productDataCount: number,
  router: any
) => {
  const cardClickData: any = savedSearchData.filter(
    (items: ISavedSearchData) => {
      return items.id === id;
    }
  );

  const url = constructUrlParams(cardClickData[0].meta_data);
  setSearchUrl(url);

  if (productDataCount > MAX_SAVED_SEARCH_COUNT) {
    setIsError(true);
    setErrorText('Please modify your search, the stones exceeds the limit.');
  } else {
    const data: any = JSON.parse(localStorage.getItem('Search')!);

    if (data?.length) {
      if (data?.length >= MAX_SEARCH_TAB_LIMIT) {
        setIsError(true);
        setErrorText(
          'Max search limit reached. Please remove existing searches'
        );
      } else {
        const localStorageData = [
          ...data,
          {
            saveSearchName: cardClickData[0].name,
            isSavedSearch: true,
            queryParams: cardClickData[0].meta_data,
            id: cardClickData[0].id
          }
        ];

        localStorage.setItem('Search', JSON.stringify(localStorageData));
        router.push(`/search?active-tab=${SEARCH_RESULT}-${data.length + 1}`);
      }
    } else {
      let localStorageData = [
        {
          saveSearchName: cardClickData[0].name,
          isSavedSearch: true,
          queryParams: cardClickData[0].meta_data,
          id: cardClickData[0].id
        }
      ];

      localStorage.setItem('Search', JSON.stringify(localStorageData));
      router.push(`/search?active-tab=${SEARCH_RESULT}-${1}`);
    }
  }
};

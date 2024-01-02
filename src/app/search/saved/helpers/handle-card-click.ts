import React from 'react';

import { constructUrlParams } from '@/utils/construct-url-param';
import { ISavedSearchData } from '../saved-interface';
import {
  MAX_SAVED_SEARCH_COUNT,
  MAX_SEARCH_TAB_LIMIT
} from '@/constants/business-logic';
import {
  MAX_SEARCH_LIMIT_EXCEED,
  MODIFY_SEARCH_STONES_EXCEEDS_LIMIT
} from '@/constants/error-messages/saved';
import { ManageLocales } from '@/utils/translate';

//Handles the click event on a saved search card.
export const handleCardClick = (
  id: string,
  savedSearchData: ISavedSearchData[],
  setSearchUrl: React.Dispatch<React.SetStateAction<string>>,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorText: React.Dispatch<React.SetStateAction<string>>,
  productDataCount: number,
  router: any
) => {
  // Filter the saved search data to get the clicked card's data
  const cardClickData: any = savedSearchData.filter(
    (items: ISavedSearchData) => {
      return items.id === id;
    }
  );

  // Construct the search URL from the card's metadata
  const url = constructUrlParams(cardClickData[0].meta_data);
  setSearchUrl(url);

  // Check if the product data count exceeds the maximum limit
  if (productDataCount > MAX_SAVED_SEARCH_COUNT) {
    setIsError(true);
    setErrorText(MODIFY_SEARCH_STONES_EXCEEDS_LIMIT);
  } else {
    const data: any = JSON.parse(localStorage.getItem('Search')!);

    if (data?.length) {
      // Check if the maximum search tab limit is reached
      if (data?.length >= MAX_SEARCH_TAB_LIMIT) {
        setIsError(true);
        setErrorText(MAX_SEARCH_LIMIT_EXCEED);
      } else {
        // Add the clicked search to local storage and navigate to the search result page
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
        router.push(
          `/search?active-tab=${ManageLocales('app.search.resultRoute')}-${
            data.length + 1
          }`
        );
      }
    } else {
      // If no data in local storage, create a new entry and navigate to the search result page
      let localStorageData = [
        {
          saveSearchName: cardClickData[0].name,
          isSavedSearch: true,
          queryParams: cardClickData[0].meta_data,
          id: cardClickData[0].id
        }
      ];

      localStorage.setItem('Search', JSON.stringify(localStorageData));
      router.push(
        `/search?active-tab=${ManageLocales('app.search.resultRoute')}-${1}`
      );
    }
  }
};

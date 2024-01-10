import React from 'react';

import { constructUrlParams } from '@/utils/construct-url-param';
import { ISavedSearchData } from '../saved-interface';

//Handles the click event on a saved search card.
export const handleCardClick = (
  id: string,
  setCardId: React.Dispatch<React.SetStateAction<string>>,
  savedSearchData: ISavedSearchData[],
  setSearchUrl: React.Dispatch<React.SetStateAction<string>>
) => {
  // Filter the saved search data to get the clicked card's data
  setCardId(id);
  const cardClickData: any = savedSearchData.filter(
    (items: ISavedSearchData) => {
      return items.id === id;
    }
  );

  // Construct the search URL from the card's metadata
  const url = constructUrlParams(cardClickData[0].meta_data);
  setSearchUrl(url);
};

import { useState } from 'react';

export const useSavedSearchStateManagement = () => {
  const [savedSearchData, setSavedSearchData] = useState([]);

  return {
    savedSearchState: {
      savedSearchData
    },
    savedSearchSetState: {
      setSavedSearchData
    }
  };
};

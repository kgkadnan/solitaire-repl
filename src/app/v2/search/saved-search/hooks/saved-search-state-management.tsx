import { useState } from 'react';

export const useSavedSearchStateManagement = () => {
  const [savedSearchData, setSavedSearchData] = useState([]);

  //Search Bar States
  const [search, setSearch] = useState<string>('');
  const [searchByName, setSearchByName] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  return {
    savedSearchState: {
      savedSearchData,
      search,
      searchByName,
      suggestions
    },
    savedSearchSetState: {
      setSavedSearchData,
      setSearch,
      setSearchByName,
      setSuggestions
    }
  };
};

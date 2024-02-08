import { useState } from 'react';

export const useSavedSearchStateManagement = () => {
  const [savedSearchData, setSavedSearchData] = useState([]);

  //Search Bar States
  const [search, setSearch] = useState<string>('');
  const [searchByName, setSearchByName] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [searchUrl, setSearchUrl] = useState('');

  return {
    savedSearchState: {
      savedSearchData,
      search,
      searchByName,
      suggestions,
      setSearchUrl
    },
    savedSearchSetState: {
      setSavedSearchData,
      setSearch,
      setSearchByName,
      setSuggestions,
      searchUrl
    }
  };
};

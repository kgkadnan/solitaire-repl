import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { ISavedSearchData } from '../saved-interface';
import { useCheckboxStateManagement } from '@/components/common/checkbox/hooks/checkbox-state-management';
import { PAGINATION_INTITAL_LIMIT } from '@/constants/business-logic';

export const useCommonStateManagement = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(PAGINATION_INTITAL_LIMIT);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [offset, setOffset] = useState(0);

  const [date, setDate] = useState<DateRange | undefined>();
  const [dateSearchUrl, setDateSearchUrl] = useState('');
  const [searchUrl, setSearchUrl] = useState('');

  //Data
  const [savedSearchData, setSavedSearchData] = useState<ISavedSearchData[]>(
    []
  );
  const [cardData, setCardData] = useState<any>([]);

  //checkbox states
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { isCheck, isCheckAll } = checkboxState;
  const { setIsCheck, setIsCheckAll } = checkboxSetState;

  //Search Bar States
  const [search, setSearch] = useState<string>('');
  const [searchByName, setSearchByName] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  return {
    commonState: {
      currentPage,
      limit,
      numberOfPages,
      offset,
      date,
      dateSearchUrl,
      searchUrl,
      savedSearchData,
      cardData,
      checkboxState,
      isCheck,
      setIsCheck,
      search,
      searchByName,
      suggestions,
      isError,
      errorText
    },
    commonSetState: {
      setCurrentPage,
      setLimit,
      setNumberOfPages,
      setOffset,
      setDate,
      setDateSearchUrl,
      setSearchUrl,
      setSavedSearchData,
      setCardData,
      checkboxSetState,
      isCheckAll,
      setIsCheckAll,
      setSearch,
      setSearchByName,
      setSuggestions,
      setIsError,
      setErrorText
    }
  };
};

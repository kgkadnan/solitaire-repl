import React from 'react';
const debounce = <T extends any[]>(fn: (...args: T) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

interface IHandleSearchProps {
  e: React.ChangeEvent<HTMLInputElement>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  debouncedSave: any;
  setSearchByName: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCheckboxes: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleSearch = ({
  e,
  setSearch,
  debouncedSave,
  setSearchByName,
  setSelectedCheckboxes,
  setSelectAllChecked,
  setShowSuggestions
}: IHandleSearchProps) => {
  const inputValue = e.target.value;
  setSearch(inputValue);

  // Use the debounce function to wrap the debouncedSave function
  const delayedSave = debounce(inputValue => debouncedSave(inputValue), 1000);
  delayedSave(inputValue);
  setShowSuggestions(true);

  if (inputValue.length < 1) {
    setSearchByName('');
    setSelectedCheckboxes([]);
    setSelectAllChecked(false);
  }
};

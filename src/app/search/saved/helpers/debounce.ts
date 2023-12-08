const debounce = <T extends any[]>(fn: (...args: T) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

interface HandleSearchProps {
  e: React.ChangeEvent<HTMLInputElement>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  debouncedSave: any;
  setSearchByName: React.Dispatch<React.SetStateAction<string>>;
  setIsCheck: React.Dispatch<React.SetStateAction<string[]>>;
  setIsCheckAll: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleSearch = ({
  e,
  setSearch,
  debouncedSave,
  setSearchByName,
  setIsCheck,
  setIsCheckAll
}: HandleSearchProps) => {
  const inputValue = e.target.value;
  setSearch(inputValue);

  // Use the debounce function to wrap the debouncedSave function
  const delayedSave = debounce(inputValue => debouncedSave(inputValue), 1000);
  delayedSave(inputValue);

  if (inputValue.length < 1) {
    setSearchByName('');
    setIsCheck([]);
    setIsCheckAll(false);
  }
};

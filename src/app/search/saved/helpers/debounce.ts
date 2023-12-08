const debounce = <T extends any[]>(fn: (...args: T) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

interface HandleSearchProps {
  e: React.ChangeEvent<HTMLInputElement>; // Adjust the type accordingly
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  debouncedSave: any; // Adjust the type accordingly
  setSearchByName: React.Dispatch<React.SetStateAction<string>>;
}

export const handleSearch = ({
  e,
  setSearch,
  debouncedSave,
  setSearchByName
}: HandleSearchProps) => {
  const inputValue = e.target.value;
  setSearch(inputValue);

  // Use the debounce function to wrap the debouncedSave function
  const delayedSave = debounce(inputValue => debouncedSave(inputValue), 1000);
  delayedSave(inputValue);

  if (inputValue.length < 1) {
    setSearchByName('');
  }
};

import { Dispatch, SetStateAction } from 'react';

export const handleFilterChange = (
  filterData: string,
  selectedFilters: string[],
  setSelectedFilters: Dispatch<SetStateAction<string[]>>
) => {
  if (selectedFilters.includes(filterData)) {
    setSelectedFilters((prevSelectedColors: string[]) =>
      prevSelectedColors.filter(selected => selected !== filterData)
    );
  } else {
    setSelectedFilters((prevSelectedColors: string[]) => [
      ...prevSelectedColors,
      filterData
    ]);
  }
};

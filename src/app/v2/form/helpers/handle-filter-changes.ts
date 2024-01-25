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

export const handleSelection = ({
  data,
  selectedTile,
  setSelectedTile
}: {
  data: string;
  selectedTile: string[];
  setSelectedTile: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  handleFilterChange(data, selectedTile, setSelectedTile);
};

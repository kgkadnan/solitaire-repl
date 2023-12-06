export const handleFilterChange = (
  filterData: string,
  selectedFilters: string[] | string,
  setSelectedFilters: any
) => {
  if (selectedFilters.includes(filterData)) {
    setSelectedFilters((prevSelectedColors: any[]) =>
      prevSelectedColors.filter(selected => selected !== filterData)
    );
  } else {
    setSelectedFilters((prevSelectedColors: any) => [
      ...prevSelectedColors,
      filterData
    ]);
  }
};

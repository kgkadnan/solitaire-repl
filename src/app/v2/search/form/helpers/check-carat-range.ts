import { caratRanges, preDefineCarats } from '@/constants/v2/form';
import { filterOutSpecificValues } from './filter-values';
import { Dispatch, SetStateAction } from 'react';

export const checkCaratRange = (
  caratValue: string,
  setCaratRangeSelectionTemp: Dispatch<SetStateAction<string[]>>,
  setCaratRangeSelection: Dispatch<SetStateAction<string[]>>,
  setSelectedCaratRange: Dispatch<SetStateAction<string[]>>
) => {
  if (caratRanges.includes(caratValue)) {
    const preDefineIndex = preDefineCarats.findIndex(item =>
      item.data.includes(caratValue)
    );

    if (preDefineIndex !== -1) {
      const parentCategory = preDefineCarats[preDefineIndex].data[0];
      const subCategories = preDefineCarats[preDefineIndex].data.slice(1);

      setCaratRangeSelectionTemp((prevState: any) => {
        let updatedTiles = [...prevState, caratValue];

        if (
          !updatedTiles.includes(parentCategory) &&
          subCategories.every(subCat => updatedTiles.includes(subCat))
        ) {
          updatedTiles.push(parentCategory);
        } else if (
          updatedTiles.includes(parentCategory) &&
          !subCategories.every(subCat => updatedTiles.includes(subCat))
        ) {
          updatedTiles.splice(updatedTiles.indexOf(parentCategory), 1);
        }

        const filteredTiles = filterOutSpecificValues(updatedTiles);
        setCaratRangeSelection(filteredTiles);

        return updatedTiles;
      });
    }
  } else {
    setSelectedCaratRange((prevState: any) => [...prevState, caratValue]);
  }
};

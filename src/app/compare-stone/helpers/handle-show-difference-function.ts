import { IProduct } from '@/app/search/result/result-interface';
import { IDifferValue, IShowDifferencesChangeProps } from '../interface';

export const handleShowDifferencesChange = ({
  compareStoneData,
  showDifferences,
  keyLabelMapping,
  setCompareValues,
  setShowDifferences
}: IShowDifferencesChangeProps) => {
  // Check if 'Select All Checkbox' is checked and there are differences
  if (!showDifferences) {
    const propertiesToKeep: string[] = Object.keys(keyLabelMapping);
    // Create a new array with filtered data
    const filteredData = compareStoneData.map((item: IProduct) => {
      const filteredItem: IProduct | any = {} as IProduct;
      propertiesToKeep.forEach(prop => {
        filteredItem[prop] = item[prop as keyof IProduct];
      });
      return filteredItem;
    });

    // Create a result object to store differing values
    const differingValues: IDifferValue = {};

    // Iterate over the properties in the first object
    for (const key in filteredData[0]) {
      if (key in filteredData[0]) {
        // Compare values for the current key in all objects
        const values = filteredData.map((item: any) => item[key]);

        // Check if there are differing values
        if ([...new Set(values)].length > 1) {
          differingValues[key] = values;
        }
      }
    }

    setCompareValues(differingValues);
  }
  setShowDifferences(!showDifferences);
};

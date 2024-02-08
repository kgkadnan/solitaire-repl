import { Dispatch, SetStateAction } from 'react';

interface IHandleSelectAll {
  setSelectedCheckboxes: Dispatch<SetStateAction<string[]>>;
  selectAllChecked: boolean;
  setSelectAllChecked: Dispatch<SetStateAction<boolean>>;
  data: {
    id: string;
  }[];
}

// Function to handle "Select All" checkbox
export const handleSelectAll = ({
  selectAllChecked,
  setSelectedCheckboxes,
  setSelectAllChecked,
  data
}: IHandleSelectAll) => {
  if (selectAllChecked) {
    // Deselect all checkboxes
    setSelectedCheckboxes([]);
    setSelectAllChecked(false);
  } else {
    // Select all checkboxes
    const allIds = data.map(({ id }: { id: string }) => id);
    setSelectedCheckboxes(allIds);
    setSelectAllChecked(true);
  }
};

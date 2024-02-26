// Function to toggle checkbox selection

import { Dispatch, SetStateAction } from 'react';

interface IHandleCheckbox {
  id: string;
  selectedCheckboxes: string[];
  setSelectedCheckboxes: Dispatch<SetStateAction<string[]>>;
  setSelectAllChecked: Dispatch<SetStateAction<boolean>>;
  data: {
    id: string;
  }[];
  selectAllChecked: boolean;
}
export const handleCheckbox = ({
  id,
  selectedCheckboxes,
  setSelectedCheckboxes,
  setSelectAllChecked,
  data,
  selectAllChecked
}: IHandleCheckbox) => {
  let updatedIsCheck = [...(selectedCheckboxes ?? [])];

  if (updatedIsCheck.includes(id)) {
    updatedIsCheck = updatedIsCheck.filter(item => item !== id);
  } else {
    updatedIsCheck.push(id);
  }

  setSelectedCheckboxes?.(updatedIsCheck);

  // Update the 'Select All' checkbox status
  if (setSelectAllChecked) {
    if (updatedIsCheck.length === data?.length) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  }

  if (selectAllChecked && setSelectAllChecked) {
    setSelectAllChecked(false);
  }
};

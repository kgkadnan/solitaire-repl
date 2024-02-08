import { useState } from 'react';

export const useCheckboxStateManagement = () => {
  // State variables to track selected checkboxes and "Select All" checkbox state
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);

  return {
    checkboxState: {
      selectedCheckboxes,
      selectAllChecked
    },
    checkboxSetState: {
      setSelectedCheckboxes,
      setSelectAllChecked
    }
  };
};

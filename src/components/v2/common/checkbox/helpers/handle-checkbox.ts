// Function to toggle checkbox selection

import { Dispatch, SetStateAction } from 'react';

interface IHandleCheckbox {
  id: string;
  selectedCheckboxes: string[];
  setSelectedCheckboxes: Dispatch<SetStateAction<string[]>>;
}
export const handleCheckbox = ({
  id,
  selectedCheckboxes,
  setSelectedCheckboxes
}: IHandleCheckbox) => {
  const isChecked = selectedCheckboxes.includes(id);
  if (isChecked) {
    setSelectedCheckboxes(
      selectedCheckboxes.filter((checkboxId: string) => checkboxId !== id)
    );
  } else {
    setSelectedCheckboxes([...selectedCheckboxes, id]);
  }
};

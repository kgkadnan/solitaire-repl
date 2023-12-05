import { Product } from '@/app/search/result/result-interface';
import { Dispatch, SetStateAction } from 'react';

/**
 * Handles the confirmation of selected stones.
 * @param {string[]} isCheck - An array of IDs representing the selected stones.
 * @param {Product[]} rows - An array of Product objects representing all available stones.
 * @param {Dispatch<SetStateAction<string>>} setErrorText - A state setter function for the error text.
 * @param {Dispatch<SetStateAction<boolean>>} setIsError - A state setter function for the error flag.
 * @param {Dispatch<SetStateAction<boolean>>} setIsSliderOpen - A state setter function for the slider flag.
 * @param {Dispatch<SetStateAction<Product[]>>} setConfirmStoneData - A state setter function for the confirmed stones data.
 * @returns None
 */
export const handleConfirmStone = (
  isCheck: string[],
  rows: Product[],
  setErrorText: Dispatch<SetStateAction<string>>,
  setIsError: Dispatch<SetStateAction<boolean>>,
  setIsSliderOpen: Dispatch<SetStateAction<boolean>>,
  setConfirmStoneData: Dispatch<SetStateAction<Product[]>>
) => {
  let hasMemoOut = isCheck?.some(id => {
    return rows.some(row => row.id == id && row.diamond_status === 'MemoOut');
  });

  if (hasMemoOut) {
    setErrorText(
      'Some stones in your selection are not available, Please modify your selection.'
    );
    setIsError(true);
  } else if (isCheck?.length) {
    setIsError(false);
    setErrorText('Please select a stone to perform action.');
    setIsSliderOpen(true);
    const confirmStone = rows.filter(item => isCheck?.includes(item.id));
    setConfirmStoneData(confirmStone);
  } else {
    setIsError(true);
    setErrorText('Please select a stone to perform action.');
  }
};

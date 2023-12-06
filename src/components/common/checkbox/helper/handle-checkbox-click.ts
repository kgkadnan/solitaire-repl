import { Dispatch, SetStateAction } from 'react';

// Handle individual checkbox click

interface IHandleCheckBoxClick {
  id: string;
  isCheck?: string[];
  setIsCheck?: Dispatch<SetStateAction<string[]>>;
  setIsCheckAll?: Dispatch<SetStateAction<boolean>>;
  isCheckAll?: boolean;
  data: any;
  setIsError: Dispatch<SetStateAction<boolean>>;
}

export const handleCheckboxClick = ({
  id,
  isCheck,
  setIsCheck,
  setIsCheckAll,
  isCheckAll,
  data,
  setIsError
}: IHandleCheckBoxClick) => {
  let updatedIsCheck = [...isCheck!];

  if (updatedIsCheck.includes(id)) {
    updatedIsCheck = updatedIsCheck.filter(item => item !== id);
  } else {
    updatedIsCheck.push(id);
  }

  setIsCheck?.(updatedIsCheck);

  // Update the 'Select All' checkbox status
  if (setIsCheckAll) {
    if (updatedIsCheck.length === data?.length) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
  }

  if (isCheckAll && setIsCheckAll) {
    setIsCheckAll(false);
  }
  setIsError(false);
};

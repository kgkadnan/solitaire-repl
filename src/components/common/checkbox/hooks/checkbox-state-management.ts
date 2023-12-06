import { useState } from 'react';

export const useCheckboxStateManagement = () => {
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);

  return {
    checkboxState: {
      isCheck,
      isCheckAll
    },
    checkboxSetState: {
      setIsCheck,
      setIsCheckAll
    }
  };
};

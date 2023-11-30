import React, { useState } from 'react';

export const UseCheckboxStateManagement = () => {
  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  return {
    checkboxState: {
      isCheck,
      isCheckAll,
    },
    checkboxSetState: {
      setIsCheck,
      setIsCheckAll,
    },
  };
};

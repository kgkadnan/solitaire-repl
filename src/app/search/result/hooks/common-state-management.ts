import React, { useState } from 'react';
import { IYourSelection } from '../result-interface';

export const UseCommonDtateManagement = () => {
  const [yourSelectionData, setYourSelectionData] = useState<IYourSelection[]>(
    []
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const [averageDiscount, setAverageDiscount] = useState(0);
  return {
    commonState: {
      yourSelectionData,
      totalAmount,
      averageDiscount,
    },
    commonSetState: {
      setYourSelectionData,
      setTotalAmount,
      setAverageDiscount,
    },
  };
};

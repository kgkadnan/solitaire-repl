import { useState } from 'react';
import { IYourSelection } from '../result-interface';

export const useCommonDtateManagement = () => {
  const [yourSelectionData, setYourSelectionData] = useState<IYourSelection[]>(
    []
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const [averageDiscount, setAverageDiscount] = useState(0);
  const [averagePricePerCarat, setAveragePricePerCarat] = useState(0);
  const [productTotalCarats, setProductTotalCarats] = useState(0);
  const [saveSearchName, setSaveSearchName] = useState<string>('');
  return {
    commonState: {
      yourSelectionData,
      totalAmount,
      productTotalCarats,
      averageDiscount,
      averagePricePerCarat,
      saveSearchName
    },
    commonSetState: {
      setYourSelectionData,
      setTotalAmount,
      setAverageDiscount,
      setProductTotalCarats,
      setSaveSearchName,
      setAveragePricePerCarat
    }
  };
};

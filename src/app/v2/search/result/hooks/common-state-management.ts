import { IYourSelection } from '@/app/search/result/result-interface';
import { useState } from 'react';
export const useCommonStateManagement = () => {
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

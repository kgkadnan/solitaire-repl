import { Product } from '@/app/search/result/result-interface';
import { useState } from 'react';

export const useConfirmStoneStateManagement = () => {
  const [confirmStoneData, setConfirmStoneData] = useState<Product[]>([]);
  const [commentValue, setCommentValue] = useState('');
  const [selectedDaysInputValue, setSelectedDaysInputValue] = useState('');
  const [selectedRadioDaysValue, setSelectedRadioDaysValue] =
    useState<string>('');
  return {
    confirmStoneState: {
      confirmStoneData,
      commentValue,
      selectedDaysInputValue,
      selectedRadioDaysValue
    },

    confirmStoneSetState: {
      setConfirmStoneData,
      setCommentValue,
      setSelectedDaysInputValue,
      setSelectedRadioDaysValue
    }
  };
};

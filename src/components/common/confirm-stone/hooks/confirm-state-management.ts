import { IProduct } from '@/app/search/result/result-interface';
import { useState } from 'react';

export const useConfirmStoneStateManagement = () => {
  const [confirmStoneData, setConfirmStoneData] = useState<IProduct[]>([]);
  const [commentValue, setCommentValue] = useState('');
  const [selectedDaysInputValue, setSelectedDaysInputValue] = useState('');
  const [selectedRadioDaysValue, setSelectedRadioDaysValue] =
    useState<string>('');
  const [isComeFromConfirmStone, setIsComeFromConfirmStone] = useState(false);
  return {
    confirmStoneState: {
      confirmStoneData,
      commentValue,
      selectedDaysInputValue,
      selectedRadioDaysValue,
      isComeFromConfirmStone
    },

    confirmStoneSetState: {
      setConfirmStoneData,
      setCommentValue,
      setSelectedDaysInputValue,
      setSelectedRadioDaysValue,
      setIsComeFromConfirmStone
    }
  };
};

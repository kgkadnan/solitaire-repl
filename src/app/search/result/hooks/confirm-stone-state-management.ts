import React, { useState } from 'react';
import { Product } from '../result-interface';

export const UseConfirmStoneStateManagement = () => {
  const [confirmStoneData, setConfirmStoneData] = useState<Product[]>([]);
  const [commentValue, setCommentValue] = useState('');
  const [selectedDaysInputValue, setSelectedDaysInputValue] = useState('');
  const [selectedRadioDaysValue, setSelectedRadioDaysValue] =
    useState<string>();
  return {
    confirmStoneState: {
      confirmStoneData,
      commentValue,
      selectedDaysInputValue,
      selectedRadioDaysValue,
    },

    confirmStoneSetState: {
      setConfirmStoneData,
      setCommentValue,
      setSelectedDaysInputValue,
      setSelectedRadioDaysValue,
    },
  };
};

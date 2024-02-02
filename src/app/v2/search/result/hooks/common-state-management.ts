import { IYourSelection } from '@/app/search/result/result-interface';
import { useState } from 'react';
export const useCommonStateManagement = () => {
  const [yourSelectionData, setYourSelectionData] = useState<IYourSelection[]>(
    []
  );
  const [saveSearchName, setSaveSearchName] = useState<string>('');
  return {
    commonState: {
      yourSelectionData,
      saveSearchName
    },
    commonSetState: {
      setYourSelectionData,
      setSaveSearchName
    }
  };
};

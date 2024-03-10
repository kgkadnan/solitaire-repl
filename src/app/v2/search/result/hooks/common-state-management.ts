import { useState } from 'react';
import { IYourSelection } from '../../interface';
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

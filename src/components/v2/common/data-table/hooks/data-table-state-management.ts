import { IProduct } from '@/app/v2/search/interface';
import { useState } from 'react';

export const useDataTableStateManagement = () => {
  const [rows, setRows] = useState<IProduct[]>([]);
  const [columns, setColumns] = useState<any>([]);

  const [sliderData, setSliderData] = useState<IProduct[]>([]);

  const [activeTab, setActiveTab] = useState('');

  const [storedSelection, setStoredSelection] = useState([]);

  const [diamondDetailImageUrl, setDiamondDetailImageUrl] = useState('');
  const [diamondDetailIframeUrl, setDiamondDetailIframeUrl] = useState('');
  return {
    dataTableState: {
      rows,
      columns,
      sliderData,
      activeTab,
      diamondDetailImageUrl,
      diamondDetailIframeUrl,
      storedSelection
    },
    dataTableSetState: {
      setRows,
      setColumns,
      setSliderData,
      setActiveTab,
      setDiamondDetailImageUrl,
      setDiamondDetailIframeUrl,
      setStoredSelection
    }
  };
};

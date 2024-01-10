import { IProduct, ITableColumn } from '@/app/search/result/result-interface';
import { useState } from 'react';

export const useDataTableStateManagement = () => {
  const [rows, setRows] = useState<IProduct[]>([]);
  const [tableColumns, setTableColumns] = useState<ITableColumn[]>([]);

  const [sliderData, setSliderData] = useState<IProduct[]>([]);

  const [activeTab, setActiveTab] = useState('');

  const [diamondDetailImageUrl, setDiamondDetailImageUrl] = useState('');
  const [diamondDetailIframeUrl, setDiamondDetailIframeUrl] = useState('');
  return {
    dataTableState: {
      rows,
      tableColumns,
      sliderData,
      activeTab,
      diamondDetailImageUrl,
      diamondDetailIframeUrl
    },
    dataTableSetState: {
      setRows,
      setTableColumns,
      setSliderData,
      setActiveTab,
      setDiamondDetailImageUrl,
      setDiamondDetailIframeUrl
    }
  };
};

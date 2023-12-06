import { Product, TableColumn } from '@/app/search/result/result-interface';
import { useState } from 'react';

export const useDataTableStateManagement = () => {
  const [rows, setRows] = useState<Product[]>([]);
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);

  const [sliderData, setSliderData] = useState<Product[]>([]);

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

import { Product } from '@/app/search/result/result-interface';
import { useState } from 'react';

export const useDataTableBodyStateManagement = () => {
  const [sliderData, setSliderData] = useState<Product[]>([]);

  const [activeTab, setActiveTab] = useState('');

  const [diamondDetailImageUrl, setDiamondDetailImageUrl] = useState('');
  const [diamondDetailIframeUrl, setDiamondDetailIframeUrl] = useState('');
  return {
    dataTableBodyState: {
      sliderData,
      activeTab,
      diamondDetailImageUrl,
      diamondDetailIframeUrl
    },
    dataTableBodySetState: {
      setSliderData,
      setActiveTab,
      setDiamondDetailImageUrl,
      setDiamondDetailIframeUrl
    }
  };
};

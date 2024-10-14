import React, { useEffect } from 'react';
import ImageSvg from '@public/v2/assets/icons/detail-page/image.svg?url';
import VideoSvg from '@public/v2/assets/icons/detail-page/video.svg?url';
import PdfSvg from '@public/v2/assets/icons/detail-page/pdf.svg?url';
// import { IImagesType } from '../interface';

interface IDetailPageTabs {
  activePreviewTab: string;
  setActivePreviewTab: React.Dispatch<React.SetStateAction<string>>;
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
  validImages: any;
  isMatchingPair?: boolean;
  setIsLoading?: any;
  isLoading?: boolean;
  setIsImageLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsImageLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
  setImageLoadingStatus?: any;
  originalDataFromMatchPair?: any;
}

const DetailPageTabs = ({
  activePreviewTab,
  setActivePreviewTab,
  validImages,
  setImageIndex,
  isMatchingPair,
  setIsLoading,
  isLoading,
  setIsImageLoaded,
  setIsImageLoading,
  setImageLoadingStatus,
  originalDataFromMatchPair
}: IDetailPageTabs) => {
  let TabsData = [
    {
      label: 'Image',
      svg: <ImageSvg />,
      isDisable: isMatchingPair
        ? !validImages.some(
            (innerArray: any) =>
              Array.isArray(innerArray) &&
              innerArray.some((image: any) => image.category === 'Image')
          )
        : !validImages.some((image: any) => image.category === 'Image')
    },
    {
      label: 'Video',
      svg: <VideoSvg />,
      isDisable: isMatchingPair
        ? !validImages.some(
            (innerArray: any) =>
              Array.isArray(innerArray) &&
              innerArray.some(
                (image: any) =>
                  image.category === 'Video' && image.url_check === true
              )
          )
        : !validImages.some((image: any) => image.category === 'Video')
    },
    {
      label: 'Sparkle',
      svg: <VideoSvg />,
      isDisable: isMatchingPair
        ? !validImages.some(
            (innerArray: any) =>
              Array.isArray(innerArray) &&
              innerArray.some(
                (image: any) =>
                  image.category === 'Sparkle' && image.url_check === true
              )
          )
        : !validImages.some((image: any) => image.category === 'Sparkle')
    },
    {
      label: 'Certificate',
      svg: <PdfSvg />,
      isDisable: isMatchingPair
        ? !validImages.some(
            (innerArray: any) =>
              Array.isArray(innerArray) &&
              innerArray.some(
                (image: any) =>
                  image.category === 'Certificate' && image.url_check === true
              )
          )
        : !validImages.some((image: any) => image.category === 'Certificate')
    }
  ];
  useEffect(() => {
    setIsLoading &&
      isLoading &&
      setTimeout(() => {
        setIsLoading(false); // Hide the toast notification after some time
      }, 1000);
  }, [isLoading]);

  const handleTabs = (label: string) => {
    if (label !== activePreviewTab) {
      setActivePreviewTab(label);
      setIsImageLoading && setIsImageLoading(true);
      setImageLoadingStatus &&
        setImageLoadingStatus(
          new Array(originalDataFromMatchPair.length).fill(true)
        );
      setIsImageLoaded && setIsImageLoaded(false);
      setImageIndex(0);
      setIsLoading && setIsLoading(true);
    }
  };

  // Find the next enabled tab
  const getNextEnabledTab = () => {
    const currentIndex = TabsData.findIndex(
      tab => tab.label === activePreviewTab
    );

    for (let i = currentIndex + 1; i < TabsData.length; i++) {
      if (!TabsData[i].isDisable) {
        return TabsData[i].label;
      }
    }
    for (let i = 0; i < currentIndex; i++) {
      if (!TabsData[i].isDisable) {
        return TabsData[i].label;
      }
    }
    return activePreviewTab; // No enabled tab found, keep the current tab
  };

  useEffect(() => {
    const currentTab = TabsData.find(tab => tab.label === activePreviewTab);

    if (currentTab?.isDisable) {
      const nextTab = getNextEnabledTab();
      setActivePreviewTab(nextTab);
    }
  }, [activePreviewTab, TabsData]);

  return (
    <div className="flex items-center ">
      {TabsData.map((tab, index) => {
        return (
          <button
            className={`flex border-[1px] border-solid border-neutral200  items-center justify-center py-[8px] px-[16px] gap-1 font-medium  ${
              index === 0
                ? 'rounded-l-[8px]'
                : TabsData.length - 1 === index
                ? 'rounded-r-[8px]'
                : ''
            } ${
              tab.isDisable
                ? 'bg-neutral100 cursor-not-allowed text-neutral400 stroke-neutral400'
                : activePreviewTab === tab.label
                ? 'bg-primaryMain text-neutral0 stroke-neutral0'
                : 'bg-neutral0 text-neutral900 stroke-neutral900'
            } `}
            disabled={tab.isDisable}
            key={tab.label}
            onClick={() => {
              handleTabs(tab.label);
            }}
          >
            <div>{tab.svg}</div>
            <div>{tab.label}</div>
          </button>
        );
      })}
    </div>
  );
};

export default DetailPageTabs;

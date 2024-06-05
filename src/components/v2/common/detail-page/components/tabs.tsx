import React from 'react';
import ImageSvg from '@public/v2/assets/icons/detail-page/image.svg?url';
import VideoSvg from '@public/v2/assets/icons/detail-page/video.svg?url';
import PdfSvg from '@public/v2/assets/icons/detail-page/pdf.svg?url';
import { IImagesType } from '../interface';

interface IDetailPageTabs {
  activePreviewTab: string;
  setActivePreviewTab: React.Dispatch<React.SetStateAction<string>>;
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
  validImages: IImagesType[];
}

const DetailPageTabs = ({
  activePreviewTab,
  setActivePreviewTab,
  validImages,
  setImageIndex
}: IDetailPageTabs) => {
  let TabsData = [
    {
      label: 'Image',
      svg: <ImageSvg />,
      isDisable: !validImages.some(image => image.category === 'Image')
    },
    {
      label: 'Video',
      svg: <VideoSvg />,
      isDisable: !validImages.some(image => image.category === 'Video')
    },
    {
      label: 'B2B Sparkle',
      svg: <VideoSvg />,
      isDisable: !validImages.some(image => image.category === 'B2B Sparkle')
    },
    {
      label: 'Certificate',
      svg: <PdfSvg />,
      isDisable: !validImages.some(image => image.category === 'Certificate')
    }
  ];

  const handleTabs = (label: string) => {
    setActivePreviewTab(label);
    setImageIndex(0);
  };

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
              activePreviewTab === tab.label
                ? 'bg-primaryMain text-neutral0 stroke-neutral0'
                : tab.isDisable
                ? 'bg-neutral100 text-neutral400 stroke-neutral400'
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

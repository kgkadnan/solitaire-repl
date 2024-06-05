'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import noImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import { IImagesType } from '../interface';
import Tooltip from '../../tooltip';
import { handleDownloadImage } from '@/utils/v2/detail-page';
import downloadImg from '@public/v2/assets/icons/detail-page/download.svg';
import expandImg from '@public/v2/assets/icons/detail-page/expand.svg';
import ImageModal from './image-modal';
import { Skeleton } from '@mui/material';
import forwardArrow from '@public/v2/assets/icons/arrow-forward.svg';
import backwardArrow from '@public/v2/assets/icons/arrow-backword.svg';
import backWardArrowDisable from '@public/v2/assets/icons/detail-page/back-ward-arrow-disable.svg';
import forWardAarrowDisable from '@public/v2/assets/icons/detail-page/forward-arrow-disable.svg';

interface IImagePreviewProps {
  images: IImagesType[];
  setImageIndex: React.Dispatch<React.SetStateAction<number>>;
  imageIndex: number;
  setIsLoading: any;
  activePreviewTab: string;
}

const ImagePreview: React.FC<IImagePreviewProps> = ({
  images,
  setIsLoading,
  activePreviewTab,
  imageIndex,
  setImageIndex
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const filteredImages = images.filter(image => {
    if (activePreviewTab === 'Video' && image.category === 'Video') return true;
    if (activePreviewTab === 'Certificate' && image.category === 'Certificate')
      return true;
    if (activePreviewTab === 'B2B Sparkle' && image.category === 'B2B Sparkle')
      return true;
    if (activePreviewTab === 'Image' && image.category === 'Image') return true;
    return false;
  });

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'ArrowLeft') {
        setImageIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
      } else if (event.key === 'ArrowRight') {
        setImageIndex(prevIndex =>
          prevIndex < filteredImages.length - 1 ? prevIndex + 1 : prevIndex
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredImages.length]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          {images.length > 0 ? (
            filteredImages.length > 0 ? (
              filteredImages[imageIndex].category === 'Video' ||
              filteredImages[imageIndex].category === 'Certificate' ||
              filteredImages[imageIndex].category === 'B2B Sparkle' ? (
                <iframe
                  src={filteredImages[0].url}
                  className="w-[370px] h-[370px]"
                />
              ) : (
                <Image
                  src={filteredImages[imageIndex]?.url}
                  alt={filteredImages[imageIndex]?.name}
                  width={650}
                  height={600}
                  className="w-[475px] h-[370px]"
                />
              )
            ) : (
              <Image
                src={noImageFound}
                alt="noImageFound"
                width={650}
                height={600}
                className="w-[475px] h-[370px]"
              />
            )
          ) : (
            <Skeleton
              width={475}
              variant="rectangular"
              height={370}
              animation="wave"
            />
          )}
        </div>

        <div className="flex justify-between items-center">
          {filteredImages.length > 0 ? (
            <div className="text-headingS font-medium text-neutral900">
              {filteredImages[imageIndex]?.name}
            </div>
          ) : (
            <Skeleton
              width={88}
              variant="rectangular"
              height={30}
              animation="wave"
            />
          )}
          <div className="flex gap-6">
            {filteredImages.length > 0 &&
              filteredImages[imageIndex].category === 'Image' && (
                <>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setImageIndex(imageIndex - 1);
                      }}
                      disabled={!(imageIndex > 0)}
                      className={` rounded-[4px]  hover:bg-neutral50 w-[38px] h-[38px] text-center px-2 border-[1px] border-solid border-neutral200 shadow-sm ${
                        imageIndex <= 0 ? '!bg-neutral200' : 'bg-neutral0'
                      }`}
                    >
                      <Image
                        src={
                          !(imageIndex > 0)
                            ? backWardArrowDisable
                            : backwardArrow
                        }
                        alt={
                          !(imageIndex > 0)
                            ? 'backWardArrowDisable'
                            : 'backwardArrow'
                        }
                      />
                    </button>
                    <button
                      onClick={() => {
                        setImageIndex(imageIndex + 1);
                      }}
                      disabled={!(imageIndex < filteredImages.length - 1)}
                      className={`rounded-[4px] hover:bg-neutral50 w-[38px] h-[38px] text-center px-2 border-[1px] border-solid border-neutral200 shadow-sm ${
                        imageIndex >= filteredImages.length - 1
                          ? '!bg-neutral200'
                          : 'bg-neutral0'
                      }`}
                    >
                      <Image
                        src={
                          !(imageIndex < filteredImages.length - 1)
                            ? forWardAarrowDisable
                            : forwardArrow
                        }
                        alt={
                          !(imageIndex < filteredImages.length - 1)
                            ? 'forWardAarrowDisable'
                            : 'forwardArrow'
                        }
                      />
                    </button>
                  </div>
                  <div className="border-r-[1px] h-[40px] border-neutral200"></div>
                </>
              )}
            <div className="flex gap-1">
              {!(
                activePreviewTab === 'Video' ||
                activePreviewTab === 'B2B Sparkle'
              ) && (
                <Tooltip
                  tooltipTrigger={
                    <Image
                      className="cursor-pointer"
                      src={downloadImg}
                      height={40}
                      width={40}
                      alt={'Download'}
                      onClick={() => {
                        handleDownloadImage(
                          filteredImages[imageIndex].url || '',
                          filteredImages[imageIndex].name,
                          setIsLoading
                        );
                      }}
                    />
                  }
                  tooltipContent={
                    activePreviewTab === 'Certificate'
                      ? 'Download Certificate'
                      : 'Download Image'
                  }
                  tooltipContentStyles={'z-[1000]'}
                />
              )}

              <Tooltip
                tooltipTrigger={
                  <Image
                    className="cursor-pointer"
                    src={expandImg}
                    height={40}
                    width={40}
                    alt={'expandImg'}
                    onClick={() => {
                      setIsModalOpen(!isModalOpen);
                    }}
                  />
                }
                tooltipContent={'Expand'}
                tooltipContentStyles={'z-[1000]'}
              />
            </div>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(!isModalOpen);
        }}
        selectedImageIndex={imageIndex}
        images={images}
        activeTab={activePreviewTab}
        setIsLoading={setIsLoading}
      />
    </>
  );
};

export default ImagePreview;

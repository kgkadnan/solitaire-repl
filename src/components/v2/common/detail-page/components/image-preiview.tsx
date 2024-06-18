'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import noImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import { IImagesType } from '../interface';
import Tooltip from '../../tooltip';
import { handleDownloadImage } from '@/utils/v2/detail-page';
import DownloadImg from '@public/v2/assets/icons/detail-page/download.svg?url';
import ExpandImg from '@public/v2/assets/icons/detail-page/expand.svg?url';
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
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

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
    if (!isModalOpen) {
      const handleKeyDown = (event: any) => {
        if (event.key === 'ArrowLeft') {
          setImageIndex(prevIndex =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
          );
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
    }
  }, [filteredImages.length, isModalOpen]);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (imageContainerRef.current) {
      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      setZoomPosition({ x, y });
      setZoomLevel(prevZoomLevel =>
        prevZoomLevel >= 2 ? 1 : prevZoomLevel + 0.5
      );
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div
          className="flex justify-center overflow-hidden w-[475px]"
          ref={imageContainerRef}
        >
          {images.length > 0 ? (
            filteredImages.length > 0 ? (
              filteredImages[imageIndex].category === 'Video' ||
              filteredImages[imageIndex].category === 'B2B Sparkle' ? (
                <iframe
                  src={filteredImages[0].url}
                  className="w-[370px] h-[370px]"
                />
              ) : (
                <div
                  className={`${
                    zoomLevel === 2 ? 'cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                >
                  <Image
                    src={filteredImages[imageIndex]?.url}
                    alt={filteredImages[imageIndex]?.name}
                    width={650}
                    height={600}
                    className="w-[475px] h-[370px]"
                    onClick={handleImageClick}
                    style={{
                      transform: `scale(${zoomLevel})`,
                      transformOrigin: `${zoomPosition.x * 100}% ${
                        zoomPosition.y * 100
                      }%`
                    }}
                  />
                </div>
              )
            ) : (
              <Image
                src={noImageFound}
                alt="noImageFound"
                width={650}
                height={600}
                className="w-[475px] h-[370px] bg-[#F2F4F7]"
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
          {images.length > 0 ? (
            filteredImages.length > 0 ? (
              <div className="text-headingS font-medium text-neutral900">
                {filteredImages[imageIndex]?.name}
              </div>
            ) : (
              ''
            )
          ) : (
            <Skeleton
              width={88}
              variant="rectangular"
              height={30}
              animation="wave"
            />
          )}
          {filteredImages.length > 0 ? (
            <div className="flex gap-6">
              {filteredImages.length > 0 &&
                filteredImages[imageIndex].category === 'Image' && (
                  <>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setZoomPosition({ x: 0, y: 0 });
                          setZoomLevel(1);
                          setImageIndex(imageIndex - 1);
                        }}
                        disabled={!(imageIndex > 0)}
                        className={` rounded-[4px]  hover:bg-neutral50 w-[37px] h-[37px] text-center px-2 border-[1px] border-solid border-neutral200 shadow-sm ${
                          imageIndex <= 0
                            ? '!bg-neutral100 cursor-not-allowed'
                            : 'bg-neutral0'
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
                          setZoomPosition({ x: 0, y: 0 });
                          setZoomLevel(1);
                          setImageIndex(imageIndex + 1);
                        }}
                        disabled={!(imageIndex < filteredImages.length - 1)}
                        className={`rounded-[4px] hover:bg-neutral50 w-[37px] h-[37px] text-center px-2 border-[1px] border-solid border-neutral200 shadow-sm ${
                          imageIndex >= filteredImages.length - 1
                            ? '!bg-neutral100 cursor-not-allowed'
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
              <div className="flex gap-2">
                {!(
                  activePreviewTab === 'Video' ||
                  activePreviewTab === 'B2B Sparkle'
                ) && (
                  <Tooltip
                    tooltipTrigger={
                      <button
                        onClick={() => {
                          handleDownloadImage(
                            filteredImages[imageIndex].downloadUrl || '',
                            filteredImages[imageIndex].name,
                            setIsLoading
                          );
                        }}
                        disabled={!(filteredImages.length > 0)}
                        className={`rounded-[4px] hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm ${
                          filteredImages.length > 0
                            ? 'bg-neutral0'
                            : '!bg-neutral100 cursor-not-allowed'
                        }`}
                      >
                        <DownloadImg
                          className={`stroke-[1.5] ${
                            filteredImages.length > 0
                              ? 'stroke-neutral900'
                              : 'stroke-neutral400'
                          }`}
                        />
                      </button>
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
                    <button
                      onClick={() => {
                        setIsModalOpen(!isModalOpen);
                      }}
                      disabled={!(filteredImages.length > 0)}
                      className={`rounded-[4px] hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm ${
                        filteredImages.length > 0
                          ? 'bg-neutral0'
                          : '!bg-neutral100 cursor-not-allowed'
                      }`}
                    >
                      <ExpandImg
                        className={`stroke-[1.5] ${
                          filteredImages.length > 0
                            ? 'stroke-neutral900'
                            : 'stroke-neutral400'
                        }`}
                      />
                    </button>
                  }
                  tooltipContent={'Expand'}
                  tooltipContentStyles={'z-[1000]'}
                />
              </div>
            </div>
          ) : (
            ''
          )}
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

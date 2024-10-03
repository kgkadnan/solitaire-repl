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
  setIsImageLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isImageLoading: boolean;
}

const ImagePreview: React.FC<IImagePreviewProps> = ({
  images,
  setIsLoading,
  activePreviewTab,
  imageIndex,
  setImageIndex,
  isImageLoading,
  setIsImageLoading
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const filteredImages = images.filter(image => {
    if (activePreviewTab === 'Video' && image.category === 'Video') return true;
    if (activePreviewTab === 'Certificate' && image.category === 'Certificate')
      return true;
    if (activePreviewTab === 'Sparkle' && image.category === 'Sparkle')
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
          className="relative flex justify-center overflow-hidden w-[475px]"
          ref={imageContainerRef}
        >
          {isImageLoading && images.length > 0 && (
            <div className="w-[475px] absolute z-10 h-[370px] bg-[#F2F4F7]  flex flex-col gap-[6px] items-center justify-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-neutral200 animate-spin fill-primaryMain"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              <div className="text-neutral900 font-medium text-sMedium">
                Loading{' '}
                {filteredImages[imageIndex]?.name === 'Video'
                  ? ''
                  : filteredImages[imageIndex]?.name}{' '}
                {filteredImages[imageIndex]?.category === 'Video' ||
                filteredImages[imageIndex]?.category === 'Sparkle'
                  ? 'Video...'
                  : 'Image...'}
              </div>
            </div>
          )}
          {images.length > 0 ? (
            filteredImages.length > 0 ? (
              filteredImages[imageIndex]?.category === 'Video' ||
              filteredImages[imageIndex]?.category === 'Sparkle' ? (
                <iframe
                  src={filteredImages[0].url}
                  className="w-[370px] h-[370px]"
                  onLoad={() => {
                    setIsImageLoading(false);
                  }}
                />
              ) : filteredImages[imageIndex].category === 'Certificate' ? (
                <div>
                  <Image
                    src={filteredImages[imageIndex]?.url}
                    alt={filteredImages[imageIndex]?.name}
                    width={650}
                    height={600}
                    onLoad={() => {
                      setIsImageLoading(false);
                    }}
                    className="w-[475px] h-[370px] object-contain"
                  />
                </div>
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
                    onLoad={() => {
                      setIsImageLoading(false);
                    }}
                    className="w-[475px] h-[370px] object-contain"
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
                onLoad={() => {
                  setIsImageLoading(false);
                }}
                className="w-[475px] h-[370px] bg-[#F2F4F7]"
              />
            )
          ) : (
            <Skeleton
              width={475}
              variant="rectangular"
              height={370}
              sx={{ bgcolor: 'var(--neutral-200)' }}
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
              sx={{ bgcolor: 'var(--neutral-200)' }}
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
                          setIsImageLoading(true);
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
                          setIsImageLoading(true);
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
                  activePreviewTab === 'Video' || activePreviewTab === 'Sparkle'
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
                        disabled={
                          !filteredImages[imageIndex].downloadUrl?.length
                        }
                        className={`rounded-[4px] bg-neutral0 disabled:!bg-neutral100 disabled:cursor-not-allowed hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm`}
                      >
                        <DownloadImg
                          className={`stroke-[1.5] ${
                            filteredImages[imageIndex].downloadUrl?.length
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

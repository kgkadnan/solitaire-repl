'use client';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import NoImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import { ImagesType } from '../interfrace';
import Tooltip from '../../tooltip';
import { handleDownloadImage } from '@/utils/v2/detail-page';
import downloadImg from '@public/v2/assets/icons/detail-page/download.svg';
import ImageModal from './image-modal';
import emptyImage from '@public/v2/assets/icons/detail-page/empty-image.svg';
import { Skeleton } from '@mui/material';

interface ImagePreviewProps {
  images: ImagesType[];
  selectedImageIndex: number;
  setIsLoading: any;
  setValidImages: React.Dispatch<React.SetStateAction<ImagesType[]>>;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  images,
  selectedImageIndex,
  setIsLoading,
  setValidImages
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openDialogImageIndex, setOpenDialogImageIndex] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      const selectedImageElement = containerRef.current.children[
        selectedImageIndex
      ] as HTMLImageElement;
      if (selectedImageElement) {
        const containerRect = containerRef.current.getBoundingClientRect();
        // const imageRect = selectedImageElement.getBoundingClientRect();
        const offsetTop = selectedImageElement.offsetTop - containerRect.top;
        containerRef.current.scrollTop = offsetTop;
      }
    }
  }, [selectedImageIndex]);

  const handleImageError = (event: any) => {
    event.target.src = NoImageFound.src; // Set the fallback image when the original image fails to load
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <>
      <div
        className="scroll-adjust-custom lg:overflow-y-scroll h-[100%]"
        ref={containerRef}
      >
        {images.length > 0
          ? images.map((image: any, index: number) => {
              // const image = images[validImageIndex];
              return (
                <>
                  <div key={index} className="relative  cursor-pointer pb-4">
                    {image.name === 'B2B' ||
                    image.name === 'B2B Sparkle' ||
                    image.name === 'GIA Certificate' ? (
                      <div
                        className="relative overflow-hidden"
                        onClick={() => {
                          setOpenDialogImageIndex(index);
                          setIsModalOpen(!isModalOpen);
                        }}
                      >
                        <div className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer"></div>

                        <iframe
                          key={index}
                          style={{ height: '380px', width: '485px' }}
                          frameBorder="0"
                          src={image.url}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      </div>
                    ) : (
                      <img
                        key={index}
                        src={image?.url}
                        style={{
                          height: '380px',
                          width: '485px',
                          background: '#F2F4F7'
                        }}
                        alt={`Image ${index + 1}`}
                        // className={`mb-4`}
                        onError={e => {
                          handleImageError(e);
                        }}
                        onClick={() => {
                          setOpenDialogImageIndex(index);
                          setIsModalOpen(!isModalOpen);
                        }}
                      />
                    )}

                    {image.name !== 'B2B' &&
                      image.name !== 'B2B Sparkle' &&
                      image.name !== 'No Data Found' &&
                      image.name !== '' && (
                        <Tooltip
                          tooltipTrigger={
                            <Image
                              className="absolute top-3 left-3 p-1"
                              src={downloadImg}
                              height={40}
                              width={40}
                              alt={'Download'}
                              onClick={() => {
                                handleDownloadImage(
                                  image?.url || '',
                                  image.name,
                                  setIsLoading
                                );
                              }}
                            />
                          }
                          tooltipContent={'Download'}
                          tooltipContentStyles={'z-[1000]'}
                        />
                      )}

                    <span className="lg:block sm:hidden text-center pt-[4px]">
                      {image?.name}
                    </span>
                  </div>
                </>
              );
            })
          : Array(6)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="relative  cursor-pointer pb-4">
                  <Skeleton
                    width={485}
                    variant="rectangular"
                    height={380}
                    animation="wave"
                  />
                </div>
              ))}
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(!isModalOpen);
        }}
        selectedImageIndex={openDialogImageIndex}
        images={images}
        setIsLoading={setIsLoading}
      />
    </>
  );
};

export default ImagePreview;

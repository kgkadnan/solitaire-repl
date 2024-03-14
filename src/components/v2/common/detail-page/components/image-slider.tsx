'use client';
import Image from 'next/image';

import { useEffect, useState } from 'react';

import NoImageFound from '../../../../public/fall-back-img.svg';
import Tooltip from '../../tooltip';
import ImageModal from './image-modal';
import { ImagesType } from '../interfrace';

interface ImageSliderProps {
  images: ImagesType[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>({});

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
    setImageUrl(images[index]);
  };

  useEffect(() => {
    setImageUrl(images[currentImageIndex]);
  }, []);

  return (
    <>
      <div className="relative w-full min-h-[328px]">
        <div className="absolute w-full flex justify-center inset-0 p-5">
          {imageUrl.name === 'B2B' || imageUrl.name === 'B2B Sparkle' ? (
            <div
              className="relative overflow-hidden w-full h-full"
              onClick={() => {
                setIsModalOpen(!isModalOpen);
              }}
            >
              <div className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer "></div>

              <iframe
                frameBorder="0"
                src={imageUrl.url}
                className="object-contain"
                style={{ height: '100%', width: '100%' }}
                onError={() => {
                  setImageUrl({ url: NoImageFound });
                  setShowDownloadButton(true);
                }}
              />
            </div>
          ) : (
            <Image
              src={imageUrl?.url}
              className="rounded-lg"
              width={'100'}
              height={'100'}
              style={{ height: 'auto', width: '300px', background: '#F2F4F7' }}
              alt="test"
              onError={() => {
                setImageUrl({ url: NoImageFound });
                setShowDownloadButton(true);
              }}
              onClick={() => {
                setIsModalOpen(!isModalOpen);
              }}
            />
          )}

          {!showDownloadButton && (
            <Tooltip
              tooltipTrigger={
                <Image
                  className="absolute top-3 left-3 p-1 cursor-pointer"
                  src="/Download.png"
                  height={40}
                  width={40}
                  alt={'Download'}
                  onClick={
                    () => {}
                    // handleDownloadImage(images[currentImageIndex]?.url || '')
                  }
                />
              }
              tooltipContent={'Download'}
              tooltipContentStyles={'z-[4]'}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center p-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`mr-2 h-2 rounded-full ${
              index === currentImageIndex
                ? 'bg-rgba-1D2939 w-4'
                : 'bg-rgba-E4E7EC w-2 cursor-pointer'
            }`}
            onClick={() => {
              handleDotClick(index);
              setShowDownloadButton(false);
            }}
          />
        ))}
      </div>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        selectedImageIndex={currentImageIndex}
        images={images}
      />
    </>
  );
};

export default ImageSlider;

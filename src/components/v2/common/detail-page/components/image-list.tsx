import React from 'react';
import NoImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';

import { Skeleton } from '@mui/material';

export interface ImagesType {
  name: string;
  url: string;
  showDivider?: boolean;
}

interface ImageListProps {
  images: ImagesType[];
  selectedImageIndex: number;
  onImageClick: (index: number) => void;
}

const ImageList: React.FC<ImageListProps> = ({
  images,
  selectedImageIndex,
  onImageClick
}) => {
  const handleClick = (index: number) => {
    onImageClick(index);
    const selectedImageElement = document.getElementById(`image-${index}`);
    if (selectedImageElement) {
      selectedImageElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const handleImageError = (event: any) => {
    event.target.src = NoImageFound.src; // Set the fallback image when the original image fails to load
  };

  return (
    <div className="flex flex-col">
      {images.length > 0
        ? images.map((image: any, index: number) => {
            return (
              <>
                {image.name === 'B2B' ||
                image.name === 'B2B Sparkle' ||
                image.name === 'GIA Certificate' ? (
                  <div
                    key={index}
                    className="relative overflow-hidden"
                    onClick={() => {
                      handleClick(index);
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer"></div>

                    <iframe
                      key={index}
                      frameBorder="0"
                      src={image.url}
                      height={74}
                      width={74}
                      style={{
                        border: '1px solid #F1F1F1',
                        overflow: 'hidden'
                      }}
                      className={`cursor-pointer md:w-[74px] md:h-[60px] sm:w-[35px] sm:h-[30px] ${
                        index !== 0 ? 'mt-3' : ''
                      } ${index === selectedImageIndex ? 'bg-gray-200' : ''}`}
                    />

                    {image.showDivider && (
                      <hr
                        className="1px solid var(--neutral-200) my-[4px] mt-[15px]"
                        style={{ borderColor: 'var(--neutral-200)' }}
                      />
                    )}
                  </div>
                ) : (
                  <>
                    <img
                      key={index}
                      src={image.url}
                      height={72}
                      width={74}
                      alt={`Image ${index + 1}`}
                      id={`image-${index}`}
                      style={{
                        border: '1px solid #F1F1F1',
                        background: '#F2F4F7'
                      }}
                      className={`cursor-pointer md:w-[74px] md:h-[60px] sm:w-[35px] sm:h-[30px] ${
                        index !== 0 ? 'mt-3' : ''
                      } 
            
            `}
                      onError={handleImageError}
                      onClick={() => handleClick(index)}
                    />
                    {image.showDivider && (
                      <hr
                        className="1px solid var(--neutral-200) my-[4px] mt-[15px]"
                        style={{ borderColor: 'var(--neutral-200)' }}
                      />
                    )}
                  </>
                )}
              </>
            );
          })
        : Array(6)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="flex mb-2  w-full gap-4">
                <Skeleton
                  width={74}
                  height={74}
                  variant="rectangular"
                  animation="wave"
                />
              </div>
            ))}
    </div>
  );
};

export default ImageList;

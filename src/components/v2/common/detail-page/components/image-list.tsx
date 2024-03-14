import Image from 'next/image';
import React from 'react';
import NoImageFound from '../../../../public/fall-back-img.svg';

export interface ImagesType {
  name: string;
  url: string;
  isSepratorNeeded?: boolean;
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
      {images.map((image, index) =>
        image.name === 'B2B' || image.name === 'B2B Sparkle' ? (
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
              style={{ border: '1px solid #F1F1F1', overflow: 'hidden' }}
              className={`cursor-pointer lg:w-[74px] lg:h-[60px] sm:w-[35px] sm:h-[30px] ${
                index !== 0 ? 'mt-3' : ''
              } ${index === selectedImageIndex ? 'bg-gray-200' : ''}`}
              onError={handleImageError}
              // className="mr-[37px]"
            />
            {image.isSepratorNeeded && (
              <hr className="1px solid #E4E7EC my-[4px] mt-[15px]" />
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
              style={{ border: '1px solid #F1F1F1', background: '#F2F4F7' }}
              className={`cursor-pointer ${index !== 0 ? 'mt-3' : ''} 
            
            `}
              onError={handleImageError}
              onClick={() => handleClick(index)}
            />
            {image.isSepratorNeeded && (
              <hr className="1px solid #E4E7EC my-[4px] mt-[15px]" />
            )}
          </>
        )
      )}
    </div>
  );
};

export default ImageList;

'use client';
import Image from 'next/image';

import { useEffect, useState } from 'react';

import NoImageFound from '../../../../public/fall-back-img.svg';
import Tooltip from '../../tooltip';
import ImageModal from './image-modal';
import { ImagesType } from '../interfrace';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css'; // Import your custom CSS file for React Slick
import Slider from 'react-slick';
import { handleDownloadImage } from '@/utils/v2/detail-page';

interface ImageSliderProps {
  images: ImagesType[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const settings = {
    dots: true, // Show dot indicators
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: false, // Enable autoplay
    afterChange: (current: number) => {
      setCurrentImageIndex(current);
    },
    appendDots: (dots: any) => (
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          width: '100%',

          textAlign: 'center'
        }}
      >
        <ul style={{ margin: '0', height: '60px' }}> {dots} </ul>
      </div>
    )
  };
  const handleImageError = (event: any) => {
    event.target.src = NoImageFound.src; // Set the fallback image when the original image fails to load
  };

  return (
    <>
      <Slider {...settings}>
        {images.map((img, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-[12px]"
            >
              <div className="relative w-full min-h-[328px]">
                <div className="absolute w-full flex justify-center inset-0 p-5">
                  {img.name === 'B2B' || img.name === 'B2B Sparkle' ? (
                    <div
                      className="relative overflow-hidden w-full h-full"
                      onClick={() => {
                        setIsModalOpen(!isModalOpen);
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer "></div>

                      <iframe
                        frameBorder="0"
                        src={img.url}
                        className="object-contain"
                        style={{ height: '100%', width: '100%' }}
                        onError={e => {
                          handleImageError(e);
                          setShowDownloadButton(true);
                        }}
                      />
                    </div>
                  ) : (
                    <img
                      src={img?.url}
                      className="rounded-lg"
                      width={'100'}
                      height={'100'}
                      style={{
                        height: 'auto',
                        width: '300px',
                        background: '#F2F4F7'
                      }}
                      alt="test"
                      onError={e => {
                        handleImageError(e);
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
                          onClick={() => {
                            handleDownloadImage(img.url || '');
                          }}
                        />
                      }
                      tooltipContent={'Download'}
                      tooltipContentStyles={'z-[4]'}
                    />
                  )}
                </div>
              </div>{' '}
              <p className="mt-2 text-center text-[16px] font-medium">
                {' '}
                {img.name}
              </p>
            </div>
          );
        })}
      </Slider>

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

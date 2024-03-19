'use client';
import Image from 'next/image';

import { useEffect, useState } from 'react';

import NoImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import Tooltip from '../../tooltip';
import ImageModal from './image-modal';
import { ImagesType } from '../interfrace';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css'; // Import your custom CSS file for React Slick
import Slider from 'react-slick';
import { handleDownloadImage } from '@/utils/v2/detail-page';
import downloadImg from '@public/v2/assets/icons/detail-page/download.svg';

interface ImageSliderProps {
  images: ImagesType[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [imageName, setImageName] = useState('');

  const settings = {
    dots: true, // Show dot indicators
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: false, // Enable autoplay
    afterChange: (current: number) => {
      setCurrentImageIndex(current);
      setImageName(images[current].name);
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
        <ul style={{ margin: '0' }}> {dots} </ul>
      </div>
    )
  };
  const handleImageError = (event: any) => {
    event.target.src = NoImageFound.src; // Set the fallback image when the original image fails to load
  };

  useEffect(() => {
    setImageName(images[0].name);
  }, []);

  return (
    <div className="details-slider">
      <Slider {...settings}>
        {images.map((img, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-[12px]"
            >
              <div className="relative w-full min-h-[328px]">
                <div className="absolute w-full flex justify-center inset-0 p-5">
                  {img.name === 'B2B' ||
                  img.name === 'B2B Sparkle' ||
                  img.name === 'GIA Certificate' ? (
                    <div
                      className="relative overflow-hidden w-full h-full"
                      onClick={() => {
                        setIsModalOpen(!isModalOpen);
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer "></div>

                      {img.url === 'null' || img.url === null ? (
                        <Image
                          src={NoImageFound}
                          alt="NoImageFound"
                          style={{
                            height: 'auto',
                            width: '300px',
                            background: '#F2F4F7'
                          }}
                        />
                      ) : (
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
                      )}
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
                    <>
                      {!(img.name === 'B2B' || img.name === 'B2B Sparkle') && (
                        <Tooltip
                          tooltipTrigger={
                            <Image
                              className="absolute top-3 left-3 p-1"
                              src={downloadImg}
                              height={40}
                              width={40}
                              alt={'Download'}
                              onClick={() => {
                                handleDownloadImage(img.url || '', img.name);
                              }}
                            />
                          }
                          tooltipContent={'Download'}
                          tooltipContentStyles={'z-[4]'}
                        />
                      )}
                    </>
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
      <p className="mt-1 text-center text-[16px] font-medium"> {imageName}</p>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        selectedImageIndex={currentImageIndex}
        images={images}
      />
    </div>
  );
};

export default ImageSlider;

'use client';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import emptyImage from '@public/v2/assets/icons/detail-page/empty-image.svg';
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
import forwardArrow from '@public/v2/assets/icons/arrow-forward.svg';
import backwardArrow from '@public/v2/assets/icons/arrow-backword.svg';

interface ImageSliderProps {
  images: ImagesType[];
  setIsLoading: any;
  setValidImages: React.Dispatch<React.SetStateAction<ImagesType[]>>;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  setIsLoading,
  setValidImages
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [imageName, setImageName] = useState('');
  // const [validImages, setValidImages] = useState<ImagesType[]>([]);

  function SampleNextArrow(props: any) {
    const { className, onClick, currentSlide, slideCount } = props;
    return (
      <button
        className={`${className} absolute !w-[40px] !h-[40px]   rounded-[4px] !p-[6px] hover:!bg-neutral-50  p-2 !border-solid !border-[1px] !border-neutral-200 shadow-sm ${
          currentSlide === slideCount - 1 ? '!bg-neutral50' : '!bg-neutral0'
        }`}
        disabled={currentSlide === slideCount - 1 ? true : false}
        onClick={onClick}
      >
        {' '}
        <Image src={forwardArrow} alt="forwardArrow" />
      </button>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, currentSlide, onClick } = props;
    return (
      <button
        className={`${className} absolute  !w-[40px] !h-[40px]   rounded-[4px] !p-[6px] hover:!bg-neutral-50  p-2 !border-solid !border-[1px] !border-neutral-200 shadow-sm ${
          currentSlide === 0 ? ' !bg-neutral50' : '!bg-neutral0'
        }`}
        disabled={currentSlide === 0 ? true : false}
        onClick={onClick}
      >
        <Image src={backwardArrow} alt="backwardArrow" />
      </button>
    );
  }

  const settings = {
    dots: true, // Show dot indicators
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: false, // Enable autoplay
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: true,
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
    setImageName(images[0]?.name);
  }, [images]);

  return (
    <div className="details-slider">
      <div className="w-[35%]">
        {images.length > 0 ? (
          images.length > 1 ? (
            <Slider {...settings}>
              {images.map((img, index) => {
                return (
                  <div
                    key={index}
                    className="flex cursor-pointer flex-col items-center justify-center gap-[12px]"
                  >
                    <div className="relative w-full min-h-[328px]">
                      <div className="absolute w-full flex justify-center inset-0 p-5">
                        {img.name === 'B2B' ||
                        img.name === 'B2B Sparkle' ||
                        img.name === 'GIA Certificate' ? (
                          <div
                            className="relative flex justify-center overflow-hidden w-full h-full"
                            onClick={() => {
                              setIsModalOpen(!isModalOpen);
                            }}
                          >
                            <div className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer "></div>

                            {img.url === 'null' ||
                            img.url === null ||
                            !img.url.length ? (
                              <Image
                                src={NoImageFound}
                                alt="NoImageFound"
                                className="flex justify-center"
                                style={{
                                  height: 'auto',
                                  width: '300px',
                                  background: '#F2F4F7',
                                  objectFit: 'cover'
                                }}
                              />
                            ) : (
                              <iframe
                                frameBorder="0"
                                src={img.url}
                                // className="object-contain"
                                style={{ width: '273px', height: '282px' }}
                                onError={e => {
                                  handleImageError(e);
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
                            onError={e => {
                              handleImageError(e);
                            }}
                            onClick={() => {
                              setIsModalOpen(!isModalOpen);
                            }}
                          />
                        )}

                        <>
                          {!(
                            img.name === 'B2B' ||
                            img.name === 'B2B Sparkle' ||
                            img.name === 'No Data Found' ||
                            img.name !== ''
                          ) && (
                            <Tooltip
                              tooltipTrigger={
                                <Image
                                  className="absolute  top-[1.2rem] left-[2.3rem] p-1 cursor-pointer"
                                  src={downloadImg}
                                  height={40}
                                  width={40}
                                  alt={'Download'}
                                  onClick={() => {
                                    handleDownloadImage(
                                      img?.url || '',
                                      img.name,
                                      setIsLoading
                                    );
                                  }}
                                />
                              }
                              tooltipContent={'Download'}
                              tooltipContentStyles={'z-[1000]'}
                            />
                          )}
                        </>
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
          ) : (
            <div className="flex cursor-pointer flex-col items-center justify-center gap-[12px]">
              <div className="relative w-full min-h-[328px]">
                <div className="absolute w-full flex justify-center inset-0 p-5">
                  {images[0]?.name === 'B2B' ||
                  images[0]?.name === 'B2B Sparkle' ||
                  images[0]?.name === 'GIA Certificate' ? (
                    <div
                      className="relative flex justify-center overflow-hidden w-full h-full"
                      onClick={() => {
                        setIsModalOpen(!isModalOpen);
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer "></div>

                      {images[0]?.url === 'null' ||
                      images[0]?.url === null ||
                      !images[0]?.url.length ? (
                        <Image
                          src={NoImageFound}
                          alt="NoImageFound"
                          className="flex justify-center"
                          style={{
                            height: 'auto',
                            width: '300px',
                            background: '#F2F4F7',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <iframe
                          frameBorder="0"
                          src={images[0]?.url}
                          // className="object-contain"
                          style={{ width: '273px', height: '282px' }}
                        />
                      )}
                    </div>
                  ) : (
                    <img
                      src={images[0]?.url}
                      className="rounded-lg"
                      width={'100'}
                      height={'100'}
                      style={{
                        height: 'auto',
                        width: '300px',
                        background: '#F2F4F7'
                      }}
                      onError={e => {
                        handleImageError(e);
                      }}
                      onClick={() => {
                        setIsModalOpen(!isModalOpen);
                      }}
                    />
                  )}
                </div>
              </div>{' '}
            </div>
          )
        ) : (
          <div className="flex cursor-pointer flex-col items-center justify-center gap-[12px]">
            <div className="relative w-full min-h-[328px]">
              <div className="absolute w-full flex justify-center inset-0 p-5">
                <Image
                  src={emptyImage}
                  alt="empty image"
                  className="rounded-lg"
                  width={'100'}
                  height={'100'}
                  style={{
                    height: 'auto',
                    width: '300px',
                    background: '#F9FAFB'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <p className="mt-1 text-center text-[16px] font-medium"> {imageName}</p>
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => {
            setValidImages([]);
            setIsModalOpen(!isModalOpen);
          }}
          selectedImageIndex={currentImageIndex}
          images={images}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};

export default ImageSlider;

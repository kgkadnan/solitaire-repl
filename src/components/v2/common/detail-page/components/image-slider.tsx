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
import forwardArrow from '@public/v2/assets/icons/arrow-forward.svg';
import backwardArrow from '@public/v2/assets/icons/arrow-backword.svg';
import { checkImage } from '../helpers/check-image';
import { loadImages } from '../helpers/load-images';

interface ImageSliderProps {
  images: ImagesType[];
  setIsLoading: any;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, setIsLoading }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showDownloadButton, setShowDownloadButton] = useState<string[]>([]);
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

  useEffect(() => {
    setShowDownloadButton([]);
  }, []);

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

  // useEffect(() => {
  //   loadImages(images, setValidImages, checkImage);
  // }, [images]);

  useEffect(() => {
    setImageName(images[0]?.name);
  }, [images]);

  // console.log('validImages', validImages);

  return (
    <div className="details-slider">
      <div className="w-[35%]">
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
                            onLoad={() => {
                              setShowDownloadButton(prevState => [
                                ...prevState,
                                img.name
                              ]);
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
                              setShowDownloadButton(prevState => [
                                ...prevState,
                                img.name
                              ]);
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
                          setShowDownloadButton(prevState => [
                            ...prevState,
                            img.name
                          ]);
                        }}
                        onClick={() => {
                          setIsModalOpen(!isModalOpen);
                        }}
                      />
                    )}

                    {!showDownloadButton.includes(img.name) && (
                      <>
                        {!(
                          img.name === 'B2B' || img.name === 'B2B Sparkle'
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
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
};

export default ImageSlider;

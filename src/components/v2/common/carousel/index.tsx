import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css'; // Import your custom CSS file for React Slick
import NoImageFound from '@public/v2/assets/images/carousel/fallback.svg';

import ActionButton from '../action-button';
import { Skeleton } from '@mui/material';
interface IImageData {
  link: string;
  image_app?: string;
  image_web?: string;
  tag_line: string;
  description_line: string;
  cta: string;
}
export interface IDashboardCarouselProps {
  images: IImageData[];
}
const DashboardCarousel: React.FC<IDashboardCarouselProps> = ({ images }) => {
  const settings = {
    dots: true, // Show dot indicators
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll
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

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSuitableImageUrl = (imageSet: any) => {
    // Validate the input
    if (!imageSet || typeof imageSet !== 'object' || Array.isArray(imageSet)) {
      return null;
    }

    const sortedKeys = Object.keys(imageSet).sort((a: any, b: any) => b - a);

    for (const key of sortedKeys) {
      if (parseInt(key, 10) <= viewportWidth) {
        const selectedImageUrl = imageSet[key];
        return selectedImageUrl;
      }
    }

    const fallbackUrl = imageSet[sortedKeys[sortedKeys.length - 1]];
    return fallbackUrl;
  };

  const handleImageError = (event: any) => {
    event.target.src = NoImageFound.src; // Set the fallback image when the original image fails to load
  };

  const imageUrl = images && getSuitableImageUrl(images[0].image_web);

  return (
    <div className="dashboard-carousel">
      {images !== undefined ? (
        images?.length > 0 ? (
          images.length > 1 ? (
            <Slider {...settings}>
              {images?.map((data: any, index: number) => {
                const imageUrl = getSuitableImageUrl(data.image_web);
                return (
                  <div
                    className="relative w-full h-[400px] rounded-[8px] overflow-hidden bg-neutral50"
                    key={index}
                  >
                    {' '}
                    {/* Container with relative positioning */}
                    <a
                      href={data.link}
                      target="_blank"
                      key={index}
                      className="h-[400px]"
                    >
                      <img
                        src={imageUrl ?? NoImageFound.src}
                        alt={`banner-${index}`}
                        className="w-full h-[400px] rounded-[8px]"
                        onError={handleImageError}
                      />
                      <div className="absolute bottom-0 left-0 w-full min-h-[100px] bg-black bg-opacity-50 flex justify-between items-center rounded-b-[8px] text-neutral0 p-4">
                        {/* <div className='flex justify-between'> */}
                        <div className="flex flex-col">
                          <p className="text-headingS medium">
                            {data.tag_line}
                          </p>
                          <p className="text-lMedium medium">
                            {data.description_line}
                          </p>
                        </div>
                        <ActionButton
                          actionButtonData={[
                            {
                              variant: 'secondary',
                              label: data.cta,
                              handler: () => {},
                              customStyle: 'flex-1 w-full h-10 '
                            }
                          ]}
                        />
                        {/* </div> */}
                      </div>
                    </a>
                  </div>
                );
              })}
            </Slider>
          ) : (
            <div className="relative w-full h-[400px] rounded-[8px] overflow-hidden bg-neutral50">
              {' '}
              {/* Container with relative positioning */}
              <a href={images[0].link} target="_blank" className="h-[400px]">
                <img
                  src={imageUrl ?? NoImageFound.src}
                  alt={`banner-${1}`}
                  className="w-full h-[400px] rounded-[8px]"
                  onError={handleImageError}
                />
                <div className="absolute bottom-0 left-0 w-full h-[100px] bg-black bg-opacity-50 flex justify-between items-center rounded-b-[8px] text-neutral0 p-4">
                  {/* <div className='flex justify-between'> */}
                  <div className="flex flex-col">
                    <p className="text-headingS medium">{images[0].tag_line}</p>
                    <p className="text-lMedium medium">
                      {images[0].description_line}
                    </p>
                  </div>
                  <ActionButton
                    actionButtonData={[
                      {
                        variant: 'secondary',
                        label: images[0].cta,
                        handler: () => {},
                        customStyle: 'flex-1 w-full h-10 '
                      }
                    ]}
                  />
                  {/* </div> */}
                </div>
              </a>
            </div>
          )
        ) : (
          <div className="relative w-full h-[400px] rounded-[8px] overflow-hidden bg-neutral50">
            <img
              src={NoImageFound.src}
              alt={`banner-not-found`}
              className="w-full h-[400px] rounded-[8px]"
              onError={handleImageError}
            />
          </div>
        )
      ) : (
        <Skeleton
          width={'100%'}
          height={400}
          className="rounded-[4px]"
          variant="rectangular"
        />
      )}
    </div>
  );
};

export default DashboardCarousel;

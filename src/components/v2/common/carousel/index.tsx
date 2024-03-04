import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.css'; // Import your custom CSS file for React Slick

const DashboardCarousel = ({ images }: any) => {
  const settings = {
    dots: true, // Show dot indicators
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Delay between each auto-scroll

    appendDots: (dots: any) => (
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <ul style={{ margin: '0' }}> {dots} </ul>
      </div>
    )
  };

  return (
    <Slider {...settings}>
      {images?.map((data: any, index: number) => {
        return (
          // <div className="w-full custom-dots" key={index}>
          <img
            src={data.image_web}
            alt={`banner-${index}`}
            className="w-full h-[400px] rounded-[8px]"
          />
          // </div>
        );
      })}
    </Slider>
  );
};

export default DashboardCarousel;

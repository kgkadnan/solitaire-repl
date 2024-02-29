import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const DashboardCarousel = () => {
  const settings = {
    dots: true, // Show dot indicators
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000 // Delay between each auto-scroll
  };

  return (
    <Slider {...settings}>
      <div>
        <img src="https://example.com/your-image-2.jpg" alt="1" />
      </div>
      <div>
        <img src="https://example.com/your-image-2.jpg" alt="2" />
      </div>
      <div>
        <img src="https://example.com/your-image-3.jpg" alt="3" />
      </div>
      {/* Add more slides as needed */}
    </Slider>
  );
};

export default DashboardCarousel;

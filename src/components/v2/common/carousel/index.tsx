import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Carousel = (images: any) => {
  return (
    <ImageGallery
      items={images}
      autoPlay={true}
      showPlayButton={false}
      showFullscreenButton={false}
    />
  );
};

export default Carousel;

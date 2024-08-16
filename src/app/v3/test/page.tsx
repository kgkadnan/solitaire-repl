// import HeroLightpassCanvas from '@/components/v3/globe-animation';
import AirpodsScrollAnimation from '@/components/v3/globe-animation';
import VideoScrollComponent from '@/components/v3/video-scroll';
import React from 'react';

const page = () => {
  return (
    <div className="flex justify-center top-50">
      <AirpodsScrollAnimation />
      {/* <div style={{ height: '200vh' }} /> To enable scrolling */}
      <VideoScrollComponent />
    </div>
  );
};

export default page;

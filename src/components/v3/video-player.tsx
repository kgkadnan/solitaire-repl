'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
// import Play from '@public/v3/icons/play.svg'
import Pause from '@public/v3/icons/pause.svg';

const CustomVideoPlayer = () => {
  const videoRef: any = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center relative rounded-[8px] h-[700px]">
      <video
        ref={videoRef}
        width="75%"
        height={'70%'}
        className="video-element "
      >
        <source src="/v3/videos/globe.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute right-[15%] bottom-10">
        <Image
          src={isPlaying ? Pause : Pause}
          onClick={handlePlayPause}
          alt="video control"
        />
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
